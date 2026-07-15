import MockAdapter from 'axios-mock-adapter';
import httpCommon from '../common/http-common';

export function setupMocks() {
  const mock = new MockAdapter(httpCommon.mainInstance, { delayResponse: 500 });

  // ----------------------------------------------------------------------
  // Auth / Me
  // ----------------------------------------------------------------------
  mock.onGet('auth/me').reply(200, {
    id: 1,
    name: 'Sílvia',
    email: 'silvia@fieb.edu.br',
    role: 'ADMIN'
  });

  // ----------------------------------------------------------------------
  // Dashboard
  // ----------------------------------------------------------------------
  mock.onGet(new RegExp('^/?dashboard/\\?timeRange=30d$')).reply(200, {
    metrics: {
      totalTrips: 15,
      activeTrips: 6,
      totalParticipants: 450,
      occupancyRate: 83.4,
      revenueProjection: 28000,
    },
    tripStatusDistribution: [
      { status: 'Planejado', count: 5, percentage: 33.3 },
      { status: 'Em Andamento', count: 2, percentage: 13.3 },
      { status: 'Concluído', count: 8, percentage: 53.4 },
    ],
    tripParticipantCounts: [
      { tripId: '1', tripName: 'Museu de Arte', participantCount: 45, maximumCapacity: 50, occupancyRate: 90 },
      { tripId: '2', tripName: 'Parque Ecológico', participantCount: 60, maximumCapacity: 80, occupancyRate: 75 },
    ],
    monthlyRegistrations: [
      { month: 'Jan', year: 2026, registrationCount: 20, revenue: 5000 },
      { month: 'Fev', year: 2026, registrationCount: 45, revenue: 8000 },
      { month: 'Mar', year: 2026, registrationCount: 30, revenue: 6500 },
      { month: 'Abr', year: 2026, registrationCount: 60, revenue: 9500 },
    ],
    upcomingTrips: [
      {
        id: '1',
        title: 'Museu de Arte',
        destination: 'Centro',
        departureDate: new Date().toISOString(),
        returnDate: new Date().toISOString(),
        currentParticipants: 45,
        maximumCapacity: 50,
        status: 'PLANNED',
        price: 150,
      },
    ],
    recentRegistrations: [
      {
        id: '1',
        participantName: 'João Silva',
        tripName: 'Museu de Arte',
        registrationDate: new Date().toISOString(),
        paymentStatus: 'PAID',
        attendanceStatus: 'PRESENT',
        amount: 150,
      },
    ],
  });

  mock.onGet(new RegExp('dashboard/metrics.*')).reply(200, {
    totalTrips: 15,
    totalParticipants: 450,
    totalRevenue: 25000,
    revenueGrowth: 12.5,
    upcomingTripsCount: 3,
    pendingPayments: 5000
  });

  mock.onGet(new RegExp('dashboard/trip-status-distribution.*')).reply(200, [
    { status: 'Planejado', count: 5 },
    { status: 'Em Andamento', count: 2 },
    { status: 'Concluído', count: 8 },
  ]);

  mock.onGet(new RegExp('dashboard/trip-participant-counts.*')).reply(200, [
    { tripName: 'Museu de Arte', count: 45 },
    { tripName: 'Parque Ecológico', count: 60 },
    { tripName: 'Zoológico', count: 35 },
  ]);

  mock.onGet(new RegExp('dashboard/monthly-registrations.*')).reply(200, [
    { month: 'Jan', count: 20 },
    { month: 'Fev', count: 45 },
    { month: 'Mar', count: 30 },
    { month: 'Abr', count: 60 },
  ]);

  mock.onGet(new RegExp('dashboard/upcoming-trips.*')).reply(200, [
    {
      id: '1',
      title: 'Museu de Arte',
      destination: 'Centro',
      departureDate: new Date().toISOString(),
      returnDate: new Date().toISOString(),
      currentParticipants: 45,
      maximumCapacity: 50,
      status: 'PLANNED',
      price: 150,
    },
  ]);

  mock.onGet(new RegExp('dashboard/recent-registrations.*')).reply(200, [
    { id: 1, participantName: 'João Silva', tripName: 'Museu de Arte', registrationDate: new Date().toISOString(), paymentStatus: 'Pago' },
  ]);

  // ----------------------------------------------------------------------
  // Trips
  // ----------------------------------------------------------------------
  mock.onGet(new RegExp('trips.*')).reply(200, {
    data: [
      { id: 1, name: 'Museu de Arte', destination: 'Centro', departureDate: new Date().toISOString(), returnDate: new Date().toISOString(), maxCapacity: 50, currentParticipants: 45, status: 'Planejado', cost: 150 },
    ],
    total: 1
  });

  // ----------------------------------------------------------------------
  // Payments
  // ----------------------------------------------------------------------
  mock.onGet(new RegExp('^/?payments/\\d+$')).reply((config) => {
    const id = config.url?.split('/').pop();
    return [
      200,
      {
        id: id || '1',
        participantId: 1,
        participantName: 'João Silva',
        tripId: 1,
        tripName: 'Museu de Arte',
        amount: 150,
        status: 'Pago',
        dueDate: new Date().toISOString(),
        paymentDate: new Date().toISOString(),
      },
    ];
  });

  // Payments list - matches '/payments/' with optional query parameters
  mock.onGet(new RegExp('^payments/(\\?.*)?$')).reply(200, {
    data: [
      { id: 1, participantId: 1, participantName: 'João Silva', tripId: 1, tripName: 'Museu de Arte', amount: 150, status: 'Pago', dueDate: new Date().toISOString(), paymentDate: new Date().toISOString() },
    ],
    total: 1,
  });

  mock.onGet(new RegExp('payments/summary.*')).reply(200, {
    byStatus: {
      PAID: 25000,
      PENDING: 3000,
      PARTIAL: 2000,
      OVERDUE: 500,
      REFUNDED: 0,
    },
    byMethod: {
      PIX: 12000,
      CASH: 8000,
      CREDIT_CARD: 7000,
      DEBIT_CARD: 1500,
      BANK_TRANSFER: 0,
      CHECK: 0,
    },
    byTrip: [
      {
        tripId: '1',
        tripName: 'Museu de Arte',
        revenue: 15000,
        participantCount: 45,
      },
    ],
    byMonth: [
      {
        month: 'Jan',
        year: 2026,
        revenue: 15000,
        paymentCount: 45,
      },
    ],
  });

  // Users (Usuario) - list all users
  mock.onGet(new RegExp('usuario/findAll')).reply(200, [
    { id: 1, nome: 'Ana Silva', email: 'ana@example.com', nivelAcesso: 'ADMIN', dataCadastro: '2024-01-15', statusUsuario: 'ATIVO' },
    { id: 2, nome: 'Pedro Souza', email: 'pedro@example.com', nivelAcesso: 'USER', dataCadastro: '2024-02-20', statusUsuario: 'ATIVO' },
  ]);

  mock.onGet(new RegExp('usuario/findById/\\d+')).reply((config) => {
    const id = config.url?.split('/').pop() || '1';
    return [
      200,
      {
        id,
        nome: id === '1' ? 'Ana Silva' : 'Pedro Souza',
        email: id === '1' ? 'ana@example.com' : 'pedro@example.com',
        nivelAcesso: id === '1' ? 'ADMIN' : 'USER',
        dataCadastro: id === '1' ? '2024-01-15' : '2024-02-20',
        statusUsuario: 'ATIVO',
      },
    ];
  });

  // Mensagens / avaliações
  mock.onGet(new RegExp('mensagem.*')).reply(200, [
    {
      id: '1',
      date: '14/07/2026',
      sender: 'Ana Silva',
      email: 'ana.silva@email.com',
      status: 'Nova',
      subject: 'Sugestão para o passeio do MASP',
      excerpt: 'Gostaria de sugerir uma melhor organização dos grupos de saída...',
      message: 'Gostaria de sugerir uma melhor organização dos grupos de saída. Acho que isso ajudaria bastante no embarque dos alunos e evitaria atrasos.',
    },
  ]);

  // Payments History for usePaymentHistory hook
  mock.onGet(new RegExp('payments/history.*')).reply(200, [
    { id: 1, participantName: 'João Silva', amount: 150, status: 'Pago', date: new Date().toISOString() },
    { id: 2, participantName: 'Maria Santos', amount: 200, status: 'Pendente', date: new Date().toISOString() },
  ]);

  // Payments Report Summary for usePaymentSummary hook
  mock.onGet(new RegExp('payments/report.*')).reply(200, {
    byStatus: {
      PAID: 25000,
      PENDING: 3000,
      PARTIAL: 2000,
      OVERDUE: 500,
      REFUNDED: 0,
    },
    byMethod: {
      PIX: 12000,
      CASH: 8000,
      CREDIT_CARD: 7000,
      DEBIT_CARD: 1500,
      BANK_TRANSFER: 0,
      CHECK: 0,
    },
    byTrip: [
      {
        tripId: '1',
        tripName: 'Museu de Arte',
        totalRevenue: 15000,
        collectedRevenue: 15000,
        pendingRevenue: 0,
        paymentCount: 45,
      },
    ],
    byMonth: [
      {
        month: 'Jan',
        year: 2026,
        revenue: 15000,
        paymentCount: 45,
      },
    ],
  });

  // ----------------------------------------------------------------------
  // Reports
  // ----------------------------------------------------------------------
  mock.onGet(new RegExp('reports/trips.*')).reply(200, [
    { id: '1', name: 'Museu de Arte' },
    { id: '2', name: 'Zoológico' }
  ]);

  mock.onGet(new RegExp('reports/participants.*')).reply(200, [
    { id: '1', name: 'João Silva' },
    { id: '2', name: 'Sílvia' }
  ]);

  mock.onGet(new RegExp('reports/trip-summary.*')).reply(200, {
    data: [
      { id: '1', tripName: 'Museu de Arte', destination: 'Centro', departureDate: new Date().toISOString(), returnDate: new Date().toISOString(), totalParticipants: 45, occupancyRate: 90, totalRevenue: 15000, collectedRevenue: 15000, attendanceRate: 100 }
    ],
    total: 1
  });

  // ----------------------------------------------------------------------
  // Fallback (for any unhandled get)
  // ----------------------------------------------------------------------
  mock.onAny().reply((config) => {
    console.warn(`[Mock] Unhandled request to: ${config.url}`);
    return [200, { data: [] }];
  });

  console.log('[Mock] API Interception enabled for development.');
}

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './ui/LoadingSpinner';

import PublicLayout from './Layout/PublicLayout';
import DashboardLayout from './Layout/DashboardLayout';

const App = lazy(() => import('../templates/App/App'));
const Home = lazy(() => import('../templates/Home/Home'));
const SobreNos = lazy(() => import('../templates/Z_Extra/SobreNos/SobreNos'));
const ForgotPass = lazy(() => import('../templates/Login/ForgotPass'));
const Login = lazy(() => import('../templates/Login/Login'));
const Mensagem = lazy(() => import('../templates/Mensagem/Mensagem'));
const MensagemLer = lazy(() => import('../templates/Mensagem/MensagemLer'));
const Usuario = lazy(() => import('../templates/Usuario/Usuario'));
const UsuarioEditar = lazy(() => import('../templates/Usuario/UsuarioEditar'));
const UsuarioNovo = lazy(() => import('../templates/Usuario/UsuarioNovo'));
const UsuariosLista = lazy(() => import('../templates/Usuario/UsuariosLista'));
const CriarPasseio = lazy(() => import('../templates/CriarPasseio/CriarPasseio'));
const TripListPage = lazy(() => import('../templates/Trips/TripListPage'));
const TripCreatePage = lazy(() => import('../templates/Trips/TripCreatePage'));
const TripEditPage = lazy(() => import('../templates/Trips/TripEditPage'));
const TripDetailPage = lazy(() => import('../templates/Trips/TripDetailPage'));
const ParticipantListPage = lazy(() => import('../templates/Participants/ParticipantListPage'));
const ParticipantCreatePage = lazy(() => import('../templates/Participants/ParticipantCreatePage'));
const ParticipantEditPage = lazy(() => import('../templates/Participants/ParticipantEditPage'));
const DashboardPage = lazy(() => import('../templates/Dashboard/DashboardPage'));
const PaymentManagementPage = lazy(() => import('../templates/Payments/PaymentManagementPage'));
const ReportsPage = lazy(() => import('../templates/Reports/ReportsPage'));
const NotFound = lazy(() => import('../templates/NotFound/NotFound'));

function RouteFallback(): JSX.Element {
  return (
    <div className="p-md">
      <LoadingSpinner message="Carregando..." />
    </div>
  );
}

export default function AppRoutes(): JSX.Element {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/aboutUs" element={<SobreNos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mensagem" element={<Mensagem />} />
          <Route path="/mensagemLer" element={<MensagemLer />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/usuarioslista" element={<UsuariosLista />} />
          <Route path="/usuarionovo" element={<UsuarioNovo />} />
          <Route path="/usuarioeditar/:id" element={<UsuarioEditar />} />
          <Route path="/criarPasseio" element={<CriarPasseio />} />
          <Route path="/trips" element={<TripListPage />} />
          <Route path="/trips/create" element={<TripCreatePage />} />
          <Route path="/trips/:id" element={<TripDetailPage />} />
          <Route path="/trips/:id/edit" element={<TripEditPage />} />
          <Route path="/trips/:tripId/participants" element={<ParticipantListPage />} />
          <Route path="/trips/:tripId/participants/create" element={<ParticipantCreatePage />} />
          <Route path="/trips/:tripId/participants/:participantId/edit" element={<ParticipantEditPage />} />
          <Route path="/payments" element={<PaymentManagementPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

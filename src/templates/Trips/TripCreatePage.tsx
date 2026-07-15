import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import TripForm from '../../components/trips/TripForm';
import { useCreateTrip } from '../../hooks/useTrips';
import { TripFormData } from '../../validations/trip.validation';
import { toast } from 'react-hot-toast';
// legacy css removed

export default function TripCreatePage(): JSX.Element {
  const navigate = useNavigate();
  const { createTrip, loading } = useCreateTrip();

  const handleSubmit = async (data: TripFormData) => {
    try {
      await createTrip(data);
      toast.success('Passeio criado com sucesso!');
      navigate('/trips');
    } catch (error) {
      toast.error('Erro ao criar passeio. Tente novamente.');
      console.error('Error creating trip:', error);
    }
  };

  const handleCancel = () => {
    navigate('/trips');
  };

  return (
    <div>
        <Header goto="/trips" title="Criar Novo Passeio" logo={logo} />
        <div className="trip-create-page">
          <TripForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={loading} />
        </div>
      </div>
  );
}

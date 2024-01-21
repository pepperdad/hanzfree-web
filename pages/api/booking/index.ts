import Instance from '../config';

export const getReservationList = () => {
  const res = Instance.get('/user/reservation');
  return res;
};

export const getReservation = (id: string) => {
  const res = Instance.get(`/user/reservation/${id}`);
  return res;
};

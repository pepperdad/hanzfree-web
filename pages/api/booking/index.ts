import Instance from '../config';

export const getReservationList = () => {
  const res = Instance.get('/user/reservation');
  return res;
};

export const getReservation = (id: string) => {
  const res = Instance.get(`/user/reservation/${id}`);
  return res;
};

export const getReservationCount = () => {
  const res = Instance.get('/reservation/count-by-method');
  return res;
};

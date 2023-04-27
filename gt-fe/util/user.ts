export type IUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type IReservation = {
  time: string;
  date: string;
  persons: number;
  status: string;
  user: string;
};

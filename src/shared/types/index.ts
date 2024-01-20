export interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
}

export interface PagePropsWithSetPage {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

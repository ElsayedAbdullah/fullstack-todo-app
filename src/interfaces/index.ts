export interface IResponseError {
  error: {
    message?: string;
  };
}

export interface IUserData {
  jwt: string;
  user: {
    email: string;
    username: string;
  };
}
export interface ITodo {
  id: number;
  title: string;
  body?: string;
}

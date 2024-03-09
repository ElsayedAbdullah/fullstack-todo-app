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
    id: number;
  };
}
export interface ITodo {
  id: number;
  title: string;
  body?: string;
}

export interface IFormInput {
  title: string;
  body: string;
}

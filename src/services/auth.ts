import { api } from "./api";

type Construction = {
  id: number;
  name: string;
  code: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: number;
  construction: Construction;
  avatar: string;
};

type Response = {
  message: string;
  user: User;
};

export async function signIn(
  email: string,
  password: string
): Promise<Response> {
  try {
    const response = await api.post("api/auth/login", {
      email,
      password,
    });

    if (response.status === 201) {
      return {
        message: "OK",
        user: response.data,
      };
    }

    return {
      message: String(response.status),
      user: {} as User,
    };
  } catch (error) {
    return {
      message: "Login ou senha inválidos",
      user: {} as User,
    };
  }
}

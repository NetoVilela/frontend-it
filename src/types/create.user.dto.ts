interface ICreateUser {
  name: string;
  status: boolean;
  email: string;
  password: string;
  cpf: string;
  profile: number;
  gender: string;
  file: File;
  dateBirth: string;
}

export default ICreateUser;

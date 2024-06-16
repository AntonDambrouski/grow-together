import { Login } from './Login';

export interface SignUp extends Login {
  repeatPassword: string;
}

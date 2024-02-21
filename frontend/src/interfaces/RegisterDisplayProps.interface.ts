export interface RegisterDisplayProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  incorrectEmailFormat: boolean;
  incorrectPasswordFormat: boolean;
  emailAlreadyRegistered: boolean;
  handleRegister: () => void;
}

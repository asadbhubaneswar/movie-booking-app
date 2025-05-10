import LoginForm from '../../../components/LoginForm';
import { Toaster } from 'react-hot-toast';

export default function Login() {
  return (
    <div>
      <LoginForm />
      <Toaster />
    </div>
  );
}
import RegisterForm from '../../../components/RegisterForm';
import { Toaster } from 'react-hot-toast';

export default function Register() {
  return (
    <div>
      <RegisterForm />
      <Toaster />
    </div>
  );
}
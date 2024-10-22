'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Link } from 'lucide-react';
import GoogleSignInButton from '../google-auth-button copy';
import AppleSignInButton from '../apple-auth-button';
import ForgotPasswordForm from './forgotpassword-form';
import LoginForm from './login-form';
import RegisterForm from './register-form';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, setLoading] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const defaultValues = {
    email: 'medilog@gmail.com'
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    signIn('credentials', {
      email: data.email,
      callbackUrl: callbackUrl ?? '/dashboard'
    });
  };

  const handleForgotPassword = () => {
    setIsForgot(true);
  };

  const handleRegister = () => {
    setIsRegister(true);
  }; 

  return (
    <>
      {isForgot ? <ForgotPasswordForm /> : isRegister ? <RegisterForm /> : <LoginForm onRegister={handleRegister} onForgotPassword={handleForgotPassword} /> }

    </>
  );
}

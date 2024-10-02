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

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, setLoading] = useState(false);
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

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-1"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Doctor ML Id</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Doctor ML Id"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel>Password</FormLabel>

                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />


          <div className='flex gap-2 justify-between pt-2 pb-2'>
            <div>
              <input type='checkbox' />
              <label> Remember me</label>
            </div>
            <div className="underline-offset-4 text-sm">
              Forgot Password
            </div>{' '}
          </div>
          <Button className="w-full bg-primary text-white" type='submit' >
            Sign In
          </Button>
          <p className='text-center text-black py-2'>Don't have an account? <span className='text-blue-900 font-semibold cursor-pointer'>Sign Up</span></p>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-base">
          <span className="bg-background px-2 text-muted-foreground">
            Or sign in with
          </span>
        </div>
      </div>
      <div className='flex justify-center align-middle gap-4'>
       <AppleSignInButton/> 
       <GoogleSignInButton/>
      </div> 
    </>
  );
}

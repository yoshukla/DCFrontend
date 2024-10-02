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
import GithubSignInButton from '../google-auth-button';
import { Link } from 'lucide-react';

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
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email..."
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


          <div className='flex gap-2 justify-between'>

            <div>
              <input type='checkbox' />
              <label> Remember Me</label>
            </div>

            <div className="underline underline-offset-4">
              Forgot Password
            </div>{' '}
          </div>
          <Button className="w-full bg-primary text-white" type='submit' >
            Login
          </Button>

        </form>
      </Form>

      <div className='flex gap-2 mt-2'>
        <Button className="ml-auto w-1/2 bg-primary text-white" >
          Apple
        </Button>

        <Button className="ml-auto w-1/2 bg-primary text-white">
          Gmail
        </Button>
      </div>

      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
      {/* <GithubSignInButton /> */}
    </>
  );
}

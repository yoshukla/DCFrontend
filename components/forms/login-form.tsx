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
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Link } from 'lucide-react';
import GoogleSignInButton from '../google-auth-button copy';
import AppleSignInButton from '../apple-auth-button';
import { getErrorMessage } from '@/lib/utils';
import toast, { Toaster } from 'react-hot-toast';

const formSchema = z.object({
    mlid: z.string()
        .min(1, { message: 'ML-ID is required' })
        .regex(/^[a-zA-Z0-9]*$/, { message: 'ML-ID must be alphanumeric' }), // Alphanumeric validation
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' }) // Minimum length validation
        .regex(/[^\s]+/, { message: 'Password cannot be empty' }) // Optional: Ensure password is not just whitespace
});

type UserFormValue = z.infer<typeof formSchema>;

interface LoginFormProps {
    onForgotPassword: () => void; 
    onRegister: () => void;   
  }

  export default function LoginForm({ onForgotPassword, onRegister }: LoginFormProps) {
 
    const searchParams = useSearchParams(); 
    const error = searchParams.get('error');
    const [loading, setLoading] = useState(false);


    const defaultValues = {
        mlid: '',
        password: ''
    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    const onSubmit = async (data: UserFormValue) => { 
        signIn('credentials', {
            mlid: data.mlid,
            password: data.password,
            callbackUrl:'/dashboard'
        });
    };
    const errorHandled = useRef(false); // Ref to track if error has been handled

    useEffect(() => {
        // Show toast notification if there's an error
        if (error && !errorHandled.current) {
            toast.error(getErrorMessage(error)); // Use utility function here
            errorHandled.current = true; // Mark error as handled
        } else if (!error) {
            errorHandled.current = false; // Reset when there's no error
        }
    }, [error]);

    return (

        <>
            <div className="flex flex-col space-y-1 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Sign In
                </h1>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-1"
                > 
                <FormField
                    control={form.control}
                    name='mlid' // Ensure this name matches the schema
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Doctor ML Id</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Doctor ML Id"
                                    disabled={loading}
                                    {...field} // Spread field props here
                                />
                            </FormControl>
                            <FormMessage /> {/* This will show error for mlid */}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password' // Ensure this name matches the schema
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    disabled={loading}
                                    {...field} // Spread field props here
                                />
                            </FormControl>
                            <FormMessage /> {/* This will show error for password */}
                        </FormItem>
                    )}
                />
 
                    <div className='flex gap-2 justify-between pt-2 pb-2'>
                        <div>
                            <input type='checkbox' />
                            <label> Remember me</label>
                        </div>
                        <div className="underline-offset-4 text-sm cursor-pointer" onClick={onForgotPassword}>
                            Forgot Password
                        </div>{' '}
                    </div>
                    <Button className="w-full bg-primary text-white" type='submit' >
                        Sign In
                    </Button>
                    <p className='text-center text-black py-2'>Don&apos;t have an account? <span className='text-blue-900 font-semibold cursor-pointer' onClick={onRegister}>Sign Up</span></p>
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
                <AppleSignInButton />
                <GoogleSignInButton />
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </>

    );
}

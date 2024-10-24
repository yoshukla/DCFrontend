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
import Required from '@/components/forms/required';


const formSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
    const searchParams = useSearchParams(); 
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
            callbackUrl:'/dashboard'
        });
    };



    return (
        <>
            <div className="flex flex-col space-y-1 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Forgot Password
                </h1>
            </div>
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
                                    <FormLabel>
                                        Please enter the code we just sent to <span className='text-primary'>Email</span>
                                    </FormLabel>
                                    <div className="flex justify-between px-4">
                                        {Array(6).fill(0).map((_, index) => (
                                            <FormControl key={index}>
                                                <Input
                                                    autoComplete='offset'
                                                    className='w-[43px] h-[43px] text-center'
                                                    type="text"
                                                    maxLength={1}
                                                    disabled={loading}
                                                />
                                            </FormControl>
                                        ))}
                                    </div>
                                </FormItem>


                                <p className='text-left text-black py-2'>Not received your code? <span className='text-red-500 font-semibold cursor-pointer'>Resend code</span></p>

                                <FormItem>
                                    <FormLabel>New Password<Required /></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="New Password"
                                            disabled={loading}
                                        // {...field}
                                        />
                                    </FormControl>
                                </FormItem>

                                <FormItem>
                                    <FormLabel>Confirm Password<Required /></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirm Password"
                                            disabled={loading}
                                        // {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <div className=''>
                        <Button className="w-full bg-primary mt-2 text-white" type='submit' >
                            Create Password
                        </Button>
                    </div>

                </form>
            </Form>

        </>
    );
}

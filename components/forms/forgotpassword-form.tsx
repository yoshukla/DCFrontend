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
import Required from '@/components/forms/required';

const emailSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' }),
});

const otpSchema = z.object({
    otp: z.string().length(6, { message: 'OTP must be 6 digits' }), // Assuming OTP is a 6-digit code
});

const passwordSchema = z.object({
    newPassword: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

type EmailFormValue = z.infer<typeof emailSchema>;
type OtpFormValue = z.infer<typeof otpSchema>;
type PasswordFormValue = z.infer<typeof passwordSchema>;

export default function ForgotPasswordForm() {
    const searchParams = useSearchParams(); 
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password

    const emailForm = useForm<EmailFormValue>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: '' }
    });

    const otpForm = useForm<OtpFormValue>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: '' }
    });

    const passwordForm = useForm<PasswordFormValue>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { newPassword: '', confirmPassword: '' }
    });

    const onSubmitEmail = async (data: EmailFormValue) => {
        // Trigger the OTP sending logic here (e.g., API call)
        console.log('Sending OTP to:', data.email);
        setStep(2); // Move to OTP verification step
    };

    const onSubmitOtp = async (data: OtpFormValue) => {
        // Verify the OTP here (e.g., API call)
        console.log('Verifying OTP:', data.otp);
        setStep(3); // Move to password reset step
    };

    const onSubmitPassword = async (data: PasswordFormValue) => {
        if (data.newPassword !== data.confirmPassword) {
            // Handle password mismatch error
            console.error('Passwords do not match');
            return;
        }
        
        // Call your password reset logic here (e.g., API call)
        console.log('Resetting password to:', data.newPassword);
        // Redirect or show success message after password reset
    };

    return (
        <>
            <div className="flex flex-col space-y-1 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Forgot Password
                    <p className='text-sm pt-3 text-slate-400'>No worries, we will send you the instructions</p>
                </h1>
            </div>
            {step === 1 && (
                <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="w-full space-y-8">
                        <FormField
                            control={emailForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full bg-primary mt-4 text-white" type='submit'>
                           Reset Password
                        </Button>
                    </form>
                </Form>
            )}
            {step === 2 && (
                <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(onSubmitOtp)} className="w-full space-y-8">
                        <FormField
                            control={otpForm.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter OTP</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter the OTP"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full bg-primary mt-2 text-white" type='submit'>
                            Verify OTP
                        </Button>
                    </form>
                </Form>
            )}
            {step === 3 && (
                <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="w-full space-y-8">
                        <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password<Required /></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="New Password"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={passwordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password<Required /></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirm Password"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full bg-primary mt-2 text-white" type='submit'>
                            Reset Password
                        </Button>
                    </form>
                </Form>
            )}
        </>
    );
}

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

import FileUpload from '../file-upload';


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

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

export default function RegisterForm() {
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
            <div className="flex flex-col space-y-1 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create Account
                </h1>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-1" >


                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    {/* <FormLabel>Images</FormLabel> */}
                                    <FormControl>
                                        <FileUpload
                                            onChange={field.onChange}
                                            value={""}
                                            onRemove={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>


                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Name"
                                            disabled={loading}

                                        />
                                    </FormControl>
                                </FormItem>

                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="mail"
                                            placeholder="Email"
                                            disabled={loading}

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                                <div className='sm:flex gap-4'>
                                    <FormItem>
                                        <FormLabel>Mobile Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Mobile Number"
                                                disabled={loading}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                    <FormItem>
                                        <FormLabel>Emergency Contact Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Contact Number"
                                                disabled={loading}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                </div>

                                <div className='sm:flex gap-4'>

                                    <div className='sm:w-1/2'>
                                        <FormItem>
                                            <FormLabel>City/Town</FormLabel>
                                            <Select
                                                disabled={loading}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            defaultValue={field.value}
                                                            placeholder="Select"
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='Select'>
                                                        Select
                                                    </SelectItem>

                                                    <SelectItem value='Hyderabad'>
                                                        Hyderabad
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    </div>

                                    <div className='sm:w-1/2'>
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <Select
                                                disabled={loading}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            defaultValue={field.value}
                                                            placeholder="Select"
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='Select'>
                                                        Select
                                                    </SelectItem>

                                                    <SelectItem value='Hyderabad'>
                                                        Telangana
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                </div>

                                <div className='sm:flex gap-4'>
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                disabled={loading}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                    <FormItem>
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Confirm password"
                                                disabled={loading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                </div>

                            </>
                        )}
                    />
                    <div>
                        <Button className="w-full bg-primary mt-2 text-white" type='submit' >
                            Create Account
                        </Button>
                    </div>

                </form>
            </Form>

        </>
    );
}

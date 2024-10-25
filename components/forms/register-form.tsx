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
import Image from 'next/image';
import plusIcon from '../../public/images/plusIcon.svg'
import * as z from 'zod';
import Required from '@/components/forms/required';


const formSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function RegisterForm() {
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
            callbackUrl: '/dashboard'
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
                    // onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <>
                                <div className='sm:flex gap-4 mb-4'>
                                    <div className='sm:w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name="firstname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name<Required /></FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="First Name"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='sm:w-1/2'>

                                        <FormField
                                            control={form.control}
                                            name="lastname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name<Required /></FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Last Name"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                </div>

                                <div className='sm:flex gap-4 mb-4'>
                                    <div className='sm:w-1/2'>

                                        {/* <FormField
                                    control={form.control}
                                    name="dateofbirth"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date of Birth<Required /></FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    placeholder="Date"
                                                    disabled={loading}

                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}

                                        <FormField
                                            control={form.control}
                                            name="mail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email<Required /></FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="mail"
                                                            placeholder="Email"
                                                            disabled={loading}

                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <div className='sm:w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name="mobilenumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Mobile Number<Required /></FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Mobile Number"
                                                            disabled={loading}
                                                            maxLength={10}
                                                            minLength={10}

                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                </div>


                                <div className='sm:flex gap-4 mb-4'>

                                    <div className='sm:w-1/2'>

                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City/Town<Required /></FormLabel>
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

                                                            <SelectItem value='hyderabad'>
                                                                Hyderabad
                                                            </SelectItem>

                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='sm:w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>State<Required /></FormLabel>
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

                                                            <SelectItem value='telangana'>
                                                                Telangana
                                                            </SelectItem>

                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='border rounded-md p-3 mt-3'>
                                    <FormField
                                        control={form.control}
                                        name="qualifications"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Qualifications<Required /></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Qualifications"
                                                        disabled={loading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className='sm:flex gap-4 my-4'>
                                        <div className='sm:w-1/2'>
                                            <FormField
                                                control={form.control}
                                                name="college"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Medical College Name</FormLabel>
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

                                                                <SelectItem value='AIIMS'>
                                                                    AIIMS
                                                                </SelectItem>

                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className='sm:w-1/2'>


                                            <FormField
                                                control={form.control}
                                                name="courseyear"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Course Year<Required /></FormLabel>
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

                                                                <SelectItem value='2024'>
                                                                    2024
                                                                </SelectItem>

                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="licenseregistrationID"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>License Registration ID<Required /></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="License Registration ID"
                                                        disabled={loading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* <div className='text-primary font-semibold cursor-pointer my-2 flex gap-1 justify-end'>
                                    Add
                                    <Image src={plusIcon} alt='plusIcon' width={15} height={15} />
                                </div> */}

                                <div className='text-sm font-medium my-2'>
                                    <input type='checkbox' />
                                    <label>  By signing up you agree to our{' '}
                                        <span className='text-[#db710e] underline cursor-pointer'>Terms & Conditions</span>{' '}and{' '}
                                        <span className='text-[#db710e] underline cursor-pointer'>Privacy Policy </span>
                                    </label>
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

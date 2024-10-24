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
            callbackUrl:'/dashboard'
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
                    className="w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <>
                                {/* <FormItem>
                                        <FormControl>
                                            <FileUpload
                                                onChange={field.onChange}
                                                value={""}
                                                onRemove={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem> */}

                                <div className='sm:flex gap-4 mb-4'>
                                    <div className='sm:w-1/2'>
                                        <FormItem>
                                            <FormLabel>Full Name<Required /></FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Name"
                                                    disabled={loading}

                                                />
                                            </FormControl>
                                        </FormItem>
                                    </div>
                                    <div className='sm:w-1/2'>
                                        <FormItem>
                                            <FormLabel>Date of Birth<Required /> </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    placeholder="Name"
                                                    disabled={loading}

                                                />
                                            </FormControl>
                                        </FormItem>
                                    </div>
                                </div>

                                <div className='sm:flex gap-4 mb-4'>
                                    <div className='sm:w-1/2'>

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
                                    </div>
                                    <div className='sm:w-1/2'>

                                        <FormItem>
                                            <FormLabel>Mobile Number<Required /></FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Mobile Number"
                                                    disabled={loading}

                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                </div>
                                {/* 
                                <div className='sm:flex gap-4 mb-4'>
                                    <div className='sm:w-1/2'>
                                      
                                    </div>

                                    <div className='sm:w-1/2'>
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
                                </div> */}

                                <div className='sm:flex gap-4 mb-4'>

                                    <div className='sm:w-1/2'>
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

                                {/* <div className='sm:flex gap-4 mb-4'>
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

                                </div> */}

                                <div className='border rounded-md p-3 mt-3'>
                                    <FormItem>
                                        <FormLabel>Qualifications<Required /></FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter Qualification"
                                                disabled={loading}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                    <div className='sm:flex gap-4 my-4'>

                                        <div className='sm:w-1/2'>
                                            <FormItem>
                                                <FormLabel>Medical College Name<Required /></FormLabel>
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

                                                        <SelectItem value='AIIMS'>
                                                            AIIMS
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        </div>

                                        <div className='sm:w-1/2'>
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
                                                        <SelectItem value='Select'>
                                                            Select
                                                        </SelectItem>

                                                        <SelectItem value='2024'>
                                                            2024
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        </div>
                                    </div>

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

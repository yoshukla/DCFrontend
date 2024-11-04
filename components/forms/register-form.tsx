'use client';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { AlertTriangleIcon, Trash, Trash2Icon } from 'lucide-react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { useFieldArray } from 'react-hook-form';
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
    mail: z.string().email({ message: 'Enter a valid email address' }),
    firstname: z.string().email({ message: ' ' }),
    lastname: z.string().email({ message: '' }),
    email: z.string().email({ message: 'Enter a valid email address' }),
    mobilenumber: z.string().email({ message: '' }),
    city: z.string().email({ message: '' }),
    state: z.string().email({ message: '' }),
    qualifications: z.string().email({ message: '' }),
    college: z.string().email({ message: '' }),
    courseyear: z.string().email({ message: ' ' }),
    licenseregistrationID: z.string().email({ message: '' }),


});

type UserFormValue = z.infer<typeof formSchema>;

export default function RegisterForm() {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const { control, register, handleSubmit } = useForm();
    const [formInstances, setFormInstances] = useState([{ id: Date.now() }]);

    const { append, remove, fields } = useFieldArray({
        control,
        name: "qualifications"
    });

    const hasAppended = useRef(false);

    useEffect(() => {
        if (!hasAppended.current) {
            hasAppended.current = true;
            append({ qualification: "", college: "", courseyear: "", licenseregistrationID: "" });
        }
    }, []);

    const handleAddForm = () => {
        setFormInstances([...formInstances, { id: Date.now() }]);
    };
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
                <form className="w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <>
                                <div className='sm:flex gap-4 mb-4'>
                                    <div className='sm:w-1/2'>
                                        {/* First Name Field */}
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
                                        {/* Last Name Field */}
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

                                {/* Other Fields */}
                                <div className='sm:flex gap-4 mb-4'>
                                    <div className='sm:w-1/2'>
                                        {/* Email Field */}
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
                                        {/* Mobile Number Field */}
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

                                {/* Qualifications Accordion */}
                                <Accordion type="single" collapsible defaultValue={`qualification-0`}>
                                    {fields.map((field, index) => (
                                        <AccordionItem value={`qualification-${index}`} key={field.id}>
                                            <AccordionTrigger
                                                className={cn(
                                                    'relative !no-underline [&[data-state=closed]>button]:hidden [&[data-state=open]>.alert]:hidden'
                                                )}
                                            >
                                                {`Qualification ${index + 1}`}
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="absolute right-8"
                                                    onClick={() => remove(index)}
                                                >
                                                    <Trash2Icon className="h-4 w-4" />
                                                </Button>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="relative mb-4 gap-8 rounded-md border p-4">
                                                    <FormField
                                                        control={control}
                                                        name={`qualifications[${index}].qualification`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Qualifications</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="text"
                                                                        placeholder="Qualifications"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    {/* College and Course Year Fields */}
                                                    <div className="sm:flex gap-4 my-4">
                                                        <div className="sm:w-1/2">
                                                            <FormField
                                                                control={form.control}
                                                                name={`qualifications[${index}].college`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Medical College Name</FormLabel>
                                                                        <Select
                                                                            onValueChange={field.onChange}
                                                                            value={field.value}
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
                                                                                <SelectItem value="AIIMS">AIIMS</SelectItem>
                                                                                {/* Add more colleges as needed */}
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="sm:w-1/2">
                                                            <FormField
                                                                control={form.control}
                                                                name={`qualifications[${index}].courseyear`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Course Year</FormLabel>
                                                                        <Select
                                                                            onValueChange={field.onChange}
                                                                            value={field.value}
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
                                                                                <SelectItem key={"2024"} value="2024">2024</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />



                                                        </div>
                                                    </div>
                                                    <FormField
                                                        control={control}
                                                        name={`qualifications[${index}].licenseregistrationID`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>License Registration ID</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="text"
                                                                        placeholder="License Registration ID"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}

                                    {/* {fields.length === 0 && append({ qualification: "", college: "", courseyear: "", licenseregistrationID: "" })} */}

                                </Accordion>

                                {/* Add Button for Qualifications */}
                                <div
                                    className='text-primary font-semibold cursor-pointer my-2 flex gap-1 justify-end'
                                    onClick={() => append({ qualification: "", college: "", courseyear: "", licenseregistrationID: "" })}
                                >
                                    Add
                                    <Image src={plusIcon} alt='plusIcon' width={15} height={15} />
                                </div>

                                {/* Terms and Conditions */}
                                <div className='text-sm font-medium my-2'>
                                    <input type='checkbox' />
                                    <label> By signing up you agree to our{' '}
                                        <span className='text-[#db710e] underline cursor-pointer'>Terms & Conditions</span>{' '}and{' '}
                                        <span className='text-[#db710e] underline cursor-pointer'>Privacy Policy </span>
                                    </label>
                                </div>
                            </>
                        )}
                    />
                    <div>
                        <Button className="w-full bg-primary mt-2 text-white" type='submit'>
                            Create Account
                        </Button>
                    </div>
                </form>
            </Form>

        </>
    );
}

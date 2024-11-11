'use client';
import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { UserClient } from '@/components/tables/user-tables/client';
import { users } from '@/constants/data';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import Heading from '@/components/Heading/page-heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm, FormProvider, useFormContext, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import BmiImage from '../../../public/images/bmiImage.svg';


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import * as z from 'zod';
import Required from '@/components/forms/required';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Consultation', link: '/dashboard/consultation' }
];

const schema = z.object({
  doctorMLId: z.string().nonempty({ message: "Doctor ML Id is required" })
  // Add any other fields and validations as necessary
});

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  city: z.string().email({ message: '' }),
});

type UserFormValue = z.infer<typeof formSchema>;


export default function Page() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);



  const defaultValues = {
    email: 'medilog@gmail.com'
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const methods = useForm({
    resolver: zodResolver(schema) // Include your resolver if you're using Zod
  });

  const onSubmit = async (data: any) => {
    console.log('Submitted Data:', data);
    // Add your submit logic here
  };

  const onClose = () => {
    setIsOpen(false)
  };

  const diagnosisData = [
    {
      id: 1,
      title: "Chief Complaint:",
      content: "Pain in left ankle",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
    {
      id: 2,
      title: "Chief Complaint:",
      content: "Flu Symptoms",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
    {
      id: 3,
      title: "Chief Complaint:",
      content: "Cold & Cough",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
    {
      id: 4,
      title: "Chief Complaint:",
      content: "Skin Allergy",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
  ];

  const vitalsData = [
    {
      doctor: "Dr John Doe",
      date: "30 Jan 2024",
      measurements: [
        { label: "Body Temp", value: "991.4°F" },
        { label: "Heart Rate", value: "72 BPM" },
        { label: "Resp Rate", value: "14 bpm" },
        { label: "Blood Pres", value: "100 / 70" },
        { label: "Sp02", value: "98 %" }
      ]
    },
    {
      doctor: "Dr Jane Smith",
      date: "31 Jan 2024",
      measurements: [
        { label: "Body Temp", value: "98.6°F" },
        { label: "Heart Rate", value: "75 BPM" },
        { label: "Resp Rate", value: "16 bpm" },
        { label: "Blood Pres", value: "110 / 80" },
        { label: "Sp02", value: "97 %" }
      ]
    }
  ];

  const proceduresData = [
    {
      id: 1,
      title: "Surgery :",
      content: "Broken leg - Surgery",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
    {
      id: 2,
      title: "Procedure :",
      content: "Endoscopy",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
    {
      id: 3,
      title: "Surgery :",
      content: "Appendectomy",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
    {
      id: 4,
      title: "Surgery :",
      content: "Tonsillectomy",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
  ];

  return (
    <>
      <PageContainer>
        <div className="space-y-2">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <Heading heading={"Consultation"} />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
            <CardTitle className="text-sm font-medium w-full">
              <div className='flex sm:flex-row flex-col sm:gap-0 gap-4 justify-between w-full md:flex-nowrap'>

                <div className='sm:w-1/5 w-full'>
                  Patient Name :<span className='font-semibold'>{' '}Sahana</span>
                </div>

                <div className='sm:w-1/5 w-full'>
                  Patient ID :<span className='font-semibold'>{' '}M1234567890</span>
                </div>

                <div className='sm:w-1/5 w-full'>
                  Date of Birth :<span className='font-semibold'>{' '}01-01-1956</span>
                </div>

                <div className='sm:w-1/5 w-full'>
                  Gender :<span className='font-semibold'>{' '}Female</span>
                </div>

                <div className='sm:w-1/5 w-full'>
                  Address :<span className='font-semibold'>{' '}Hyderabad, Telangana</span>
                </div>

              </div>

            </CardTitle>

          </CardHeader>
          <CardContent>
            <hr></hr>
            <div className="flex my-5 ml-auto justify-end sm:w-1/4">

              <Form {...form}>
                <form className="w-full space-y-8">
                  <div>
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>City</FormLabel> */}
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
                                  placeholder="Patient Summary"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>

                              <SelectItem value='patient-summary'>
                                Patient Summary
                              </SelectItem>

                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>

            </div>

            <Tabs defaultValue="diagnosis" className="space-y-4">
              <TabsList>
                <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
                <TabsTrigger value="vitals">Vitals</TabsTrigger>
                <TabsTrigger value="bmi">BMI</TabsTrigger>
                <TabsTrigger value="procedures">Procedures</TabsTrigger>
                <TabsTrigger value="pastdiagnosis">Past Diagnosis</TabsTrigger>
              </TabsList>
              <div className='flex gap-4 justify-end'>
                <Button className="bg-[#15B001] text-white" type='submit' >
                  +  Add
                </Button>
                <Button className="bg-[#F8AE02] text-white" type='submit' >
                  Show All
                </Button>

              </div>


              <TabsContent value="diagnosis" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {diagnosisData.map((data) => (
                    <Card key={data.id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                        <CardTitle className="text-sm font-medium">
                          {data.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-primary font-semibold text-sm">
                          {data.content}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <div className="flex justify-between text-[13px] w-full">
                          <p>{data.date}</p>
                          <p>{data.doctor}</p>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="vitals" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {vitalsData.map((record, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                        <CardTitle className="text-sm font-medium">{' '}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-2 font-semibold text-sm'>
                          {record.measurements.map((measurement, index) => (
                            <div className='flex' key={index}>
                              <p className='text-[#0EBB13] w-1/2'>{measurement.label}:</p>
                              <span className='text-primary w-1/2'> {measurement.value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex justify-between text-[13px] w-full">
                          <p>{record.doctor}</p>
                          <p>{record.date}</p>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}


                </div>
              </TabsContent>

              <TabsContent value="bmi" className="space-y-4">
                <div className='flex sm:flex-row flex-col sm:gap-0 gap-4'>
                  <div className='flex'>
                    <Image src={BmiImage} alt='bmiimage' className='w-20' />
                    <div className='relative'>

                      <div className='border-2 absolute border-[#000000] h-16 ml-4'></div>
                      <div className='border-2 absolute bottom-0 border-[#000000] h-16 ml-4'></div>

                      <div className='border-t-0 w-[31px] border-l-0 border-r-0 -bottom-[2px] -left-[13px] border-2 absolute  border-[#000000] h-16 ml-4'></div>

                      <div className="absolute w-[96px] left-[27px] top-1/2 right-0 transform -translate-y-1/2">
                        <Card className='rounded-md'>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0  py-1 px-6">
                            <CardTitle className="text-sm font-medium">
                              <p className='text-[#0070C0] text-sm'>Height</p>
                              <p>180 cm</p>
                            </CardTitle>
                          </CardHeader>
                          {/* <CardContent>
                        <p className="text-primary font-semibold text-sm">
                         snd c
                        </p>
                      </CardContent> */}
                          {/* <CardFooter>
                        <div className="flex justify-between text-[13px] w-full">
                          <p>{data.date}</p>
                          <p>{data.doctor}</p>
                        </div>
                      </CardFooter> */}
                        </Card>
                      </div>

                    </div>

                  </div>

                  <div className="sm:ml-40">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                        <CardTitle className="text-sm font-medium">
                        Weight
                        <p className='text-[#0EBB13]'>87 kg</p>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold text-sm">
                        Last Measurement:<span className='text-[#0EBB13]'> 82 kg</span>
                        </p>
                        <p className='font-semibold text-sm mt-3'>30 Jan 2024</p>
                      </CardContent>
                      
                    </Card>

                  </div>

                </div>

              </TabsContent>

              <TabsContent value="procedures" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {proceduresData.map((data) => (
                    <Card key={data.id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                        <CardTitle className="text-sm font-medium">
                          {data.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-primary font-semibold text-sm">
                          {data.content}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <div className="flex justify-between text-[13px] w-full">
                          <p>{data.date}</p>
                          <p>{data.doctor}</p>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pastdiagnosis" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {proceduresData.map((data) => (
                    <Card key={data.id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                        <CardTitle className="text-sm font-medium">
                          {data.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-primary font-semibold text-sm">
                          {data.content}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <div className="flex justify-between text-[13px] w-full">
                          <p>{data.date}</p>
                          <p>{data.doctor}</p>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

          </CardContent>
        </Card>
      </PageContainer >

      <Modal
        title="Consultation"
        description=""
        isOpen={isOpen}
        onClose={onClose}>
        <hr />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormField
              name="doctorMLId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor ML Id</FormLabel>
                  <FormControl>
                    <Controller
                      name="doctorMLId" // Ensure this matches the schema
                      control={methods.control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder="Doctor ML Id"
                          disabled={false} // Set loading condition if necessary
                          {...field} // Spread field props here
                        />
                      )}
                    />
                  </FormControl>
                  {/* <FormMessage>{methods.formState.errors.doctorMLId?.message}</FormMessage> */}
                </FormItem>
              )}
            />
            <Button className="w-full bg-primary mt-4 text-white" type='submit'>
              Submit
            </Button>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}

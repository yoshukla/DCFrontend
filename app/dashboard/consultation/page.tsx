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
import PdfIcon from '../../../public/images/pdfIcon.svg';
import Diagnosis from '../../../public/images/diagnosis.svg';
import BpImage from '../../../public/images/bpImage.svg';
import BloodSugarReport from '../../../public/images/BloodSugarReport.svg';
import ReliverFunctionTestReport from '../../../public/images/ReliverFunctionTestReport.svg';
import LumbarPunctureReport from '../../../public/images/LumbarPunctureReport.svg';
import DocumentIcon from '../../../public/images/documentIcon.svg';
import FormBg from '../../../public/images/formBg.svg';
import PdfRedIcon from '../../../public/images/pdfRedIcon.svg';
import EyeIcon from '../../../public/images/eyeIcon.svg';


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
import { Textarea } from '@/components/ui/textarea';
import { columns } from '@/components/tables/medication-table/columns';
import { MedicationTable } from '@/components/tables/medication-table/medication-table';
import { Checkbox } from '@radix-ui/react-checkbox';
import FileUpload from '@/components/file-upload';

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
  const [isOpenNewDiagnosis, setIsOpenNewDiagnosis] = useState(false);
  const [isOpenDiagnosis, setIsOpenDiagnosis] = useState(false);
  const [isOpenNewProcedures, setIsOpenNewProcedures] = useState(false);
  const [selectedValue, setSelectedValue] = useState('patient-summary');




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

  const newDiagnosis = () => {
    setIsOpenNewDiagnosis(true);
  }

  const openDiagnosis = () => {
    setIsOpenDiagnosis(true);
  }


  const handleOpenNewProcedures = () => {
    setIsOpenNewProcedures(true);
  }

  const onClose = () => {
    setIsOpen(false);
    setIsOpenNewDiagnosis(false);
    setIsOpenNewProcedures(false);
    setIsOpenDiagnosis(false);
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

  const pastDiagnosisData = [
    {
      id: 1,
      title: "Chief Complaint :",
      content: "Broken leg - Surgery",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
    {
      id: 2,
      title: "Chief Complaint :",
      content: "Endoscopy",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
    {
      id: 3,
      title: "Chief Complaint :",
      content: "Appendectomy",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
    {
      id: 4,
      title: "Chief Complaint :",
      content: "Tonsillectomy",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
    {
      id: 5,
      title: "Chief Complaint :",
      content: "Tonsillectomy",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
    {
      id: 6,
      title: "Chief Complaint :",
      content: "Tonsillectomy",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
    {
      id: 7,
      title: "Chief Complaint :",
      content: "Tonsillectomy",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
    {
      id: 8,
      title: "Chief Complaint :",
      content: "Tonsillectomy",
      date: "30 Jan 2024",
      doctor: "Dr John Doe"
    },
  ];

  const reports = [
    {
      id: 1,
      imageSrc: BpImage,
      imageAlt: 'Blood Pressure Report Image',
      title: 'Blood Pressure Report',
      date: 'May 23, 2024',
      iconSrc: PdfIcon,
      iconAlt: 'PDF Icon'
    },
    {
      id: 2,
      imageSrc: BloodSugarReport,
      imageAlt: 'Blood Sugar Report Image',
      title: 'Blood Sugar Report',
      date: 'May 23, 2024',
      iconSrc: PdfIcon,
      iconAlt: 'PDF Icon'
    },
    {
      id: 3,
      imageSrc: BpImage,
      imageAlt: 'Blood Pressure Report Image',
      title: 'Blood Pressure Report',
      date: 'May 23, 2024',
      iconSrc: PdfIcon,
      iconAlt: 'PDF Icon'
    },
    {
      id: 4,
      imageSrc: ReliverFunctionTestReport,
      imageAlt: 'Reliver Function Test Report',
      title: 'Reliver Function Test Report',
      date: 'May 23, 2024',
      iconSrc: PdfIcon,
      iconAlt: 'PDF Icon'
    },
    {
      id: 5,
      imageSrc: LumbarPunctureReport,
      imageAlt: 'Lumbar Puncture Report',
      title: 'Lumbar Puncture Report',
      date: 'May 23, 2024',
      iconSrc: PdfIcon,
      iconAlt: 'PDF Icon'
    },
    {
      id: 6,
      imageSrc: ReliverFunctionTestReport,
      imageAlt: 'Reliver Function Test Report',
      title: 'Reliver Function Test Report',
      date: 'May 23, 2024',
      iconSrc: PdfIcon,
      iconAlt: 'PDF Icon'
    }
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
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedValue(value);
                            }}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={field.value}
                                  placeholder=" Patient Summary"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>

                              <SelectItem value='patient-summary'>
                                Patient Summary
                              </SelectItem>

                              <SelectItem value='diagnosis'>
                                Diagnosis
                              </SelectItem>

                              <SelectItem value='reports'>
                                Reports
                              </SelectItem>

                              <SelectItem value='procedures'>
                                Procedures
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

            {selectedValue === 'patient-summary' && (
              <Tabs defaultValue="diagnosis" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
                  <TabsTrigger value="vitals">Vitals</TabsTrigger>
                  <TabsTrigger value="bmi">BMI</TabsTrigger>
                  <TabsTrigger value="procedures">Procedures</TabsTrigger>
                </TabsList>

                <TabsContent value="diagnosis" className="space-y-4">
                  <div className='flex gap-4 justify-end'>
                    <Button className="bg-[#15B001] text-white" type='submit' >
                      +  Add
                    </Button>
                    <Button className="bg-[#F8AE02] text-white" type='submit' >
                      Show All
                    </Button>
                  </div>

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

                  <div className='flex gap-4 justify-end'>
                    <Button className="bg-[#15B001] text-white" type='submit' >
                      +  Add
                    </Button>
                    <Button className="bg-[#F8AE02] text-white" type='submit' >
                      Show All
                    </Button>

                  </div>

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
                  <div className='flex gap-4 justify-end'>
                    <Button className="bg-[#15B001] text-white" type='submit' >
                      +  Add
                    </Button>
                    <Button className="bg-[#F8AE02] text-white" type='submit' >
                      Show All
                    </Button>

                  </div>
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
                      <div className='mt-2 flex justify-center'>
                        <Card className='px-2 py-3 text-center w-24 rounded-md'>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
                            <CardTitle className="text-sm font-medium">

                            </CardTitle>
                          </CardHeader>
                          <CardContent className='text-sm p-0'>
                            BMI- <span className='text-[#0EBB13]'>87 kg</span>
                          </CardContent>

                        </Card>
                      </div>
                    </div>
                  </div>

                </TabsContent>

                <TabsContent value="procedures" className="space-y-4">
                  <div className='flex gap-4 justify-end'>
                    <Button className="bg-[#15B001] text-white">
                      +  Add
                    </Button>
                    <Button className="bg-[#F8AE02] text-white">
                      Show All
                    </Button>

                  </div>
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
            )}

            {selectedValue === 'diagnosis' && (
              <Tabs defaultValue="pastdiagnosis" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="pastdiagnosis">Past Diagnosis</TabsTrigger>
                </TabsList>

                <div className='flex gap-4 justify-end'>
                  <Button className="bg-[#15B001] text-white" onClick={() => newDiagnosis()}>
                    +  New Diagnosis
                  </Button>
                  <Button className="bg-[#F8AE02] text-white">
                    Show All
                  </Button>
                </div>

                <TabsContent value="pastdiagnosis" className="space-y-4">
                  <div className='flex gap-4 items-center w-full'>
                    <div>
                      <Image src={Diagnosis} alt='diagnosis' width={200} height={200} />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
                      {pastDiagnosisData.map((data) => (
                        <Card key={data.id} onClick={() => openDiagnosis()} className='cursor-pointer'>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-3 pb-1">
                            <CardTitle className="text-sm font-medium">
                              {data.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className=' px-3'>
                            <p className="text-primary font-semibold text-sm">
                              {data.content}
                            </p>
                          </CardContent>
                          <CardFooter className=' px-3'>
                            <div className="flex justify-between text-[13px] w-full">
                              <p>{data.date}</p>
                              <p>{data.doctor}</p>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {selectedValue === 'reports' && (
              <Tabs defaultValue="reports" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

                <div className='flex gap-4 justify-end'>

                  <Button className="bg-[#F8AE02] text-white" type='submit' >
                    Show All
                  </Button>
                </div>

                <TabsContent value="reports" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {reports.map(report => (
                      <Card key={report.id} className="bg-white border rounded-md w-full">
                        <CardHeader className="flex p-0 flex-row items-center justify-between space-y-0 pb-1">
                          <CardContent className="p-4 w-full">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <div>
                                  <Image src={report.imageSrc} alt={report.imageAlt} />
                                </div>
                                <div>
                                  <p className="text-[13px] font-semibold text-primary">{report.title}</p>
                                  <p className="text-[10px]">{report.date}</p>
                                </div>
                              </div>
                              <div>
                                <Image src={report.iconSrc} alt={report.iconAlt} />
                              </div>
                            </div>
                          </CardContent>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}


            {selectedValue === 'procedures' && (
              <Tabs defaultValue="procedures" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="procedures">Procedures</TabsTrigger>
                </TabsList>
                <div className='flex gap-4 justify-end'>
                  <Button className="bg-[#15B001] text-white" onClick={() => handleOpenNewProcedures()}>
                    +  New
                  </Button>
                  <Button className="bg-[#F8AE02] text-white" type='submit' >
                    Show All
                  </Button>
                </div>

                <TabsContent value="procedures" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
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
                        <CardFooter className='w-full'>
                          <div className='flex flex-col gap-3 w-full'>
                            <div className='grid grid-cols-4 gap-2'>
                              <div>
                                <Image src={DocumentIcon} alt='documentIcon' />
                              </div>
                              <div>
                                <Image src={DocumentIcon} alt='documentIcon' />
                              </div>
                            </div>

                            <div className="flex justify-between text-[13px] w-full">
                              <p>{data.date}</p>
                              <p>{data.doctor}</p>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}


          </CardContent>
        </Card>
      </PageContainer >

      <Modal
        fullWidth={false}
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


      <Modal
        fullWidth={true}
        title="New Diagnosis"
        description=""
        isOpen={isOpenNewDiagnosis}
        onClose={onClose} >
        <hr />

        <div style={{ backgroundImage: `url('images/formBg.svg')`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='mt-4'>
              <div className='flex w-full gap-4'>
                <div className='md:w-[70%]'>
                  <FormField
                    name="doctorMLId"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>New Diagnosis</FormLabel> */}
                        <FormControl>
                          <Controller
                            name="doctorMLId" // Ensure this matches the schema
                            control={methods.control}
                            render={({ field }) => (
                              <Input className='mb-4'
                                type="text"
                                placeholder=""
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
                  <div className='mb-4'>
                    <FormField
                      name="doctorMLId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Clinical Notes</FormLabel>
                          <FormControl>
                            <Controller
                              name="doctorMLId" // Ensure this matches the schema
                              control={methods.control}
                              render={({ field }) => (
                                <Input
                                  type="text"
                                  placeholder="Clinical Notes"
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
                  </div>

                  <FormField
                    control={form.control}
                    name='doctorMLId'
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>State </FormLabel> */}
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className='mb-4'>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Select"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="telangana">Telangana</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='mb-4'>
                    <FormField
                      control={form.control}
                      name='doctorMLId'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Diagnostic Tests </FormLabel>
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
                              <SelectItem value="telangana">Telangana</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="doctorMLId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor Notes </FormLabel>
                        <FormControl>
                          <Textarea
                            id="description"
                            name="description"
                            placeholder="Doctor notes..."
                            className="col-span-4"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex justify-end gap-4'>

                    <Button className="bg-primary mt-4 text-white" type='submit'>
                      Save
                    </Button>

                    <Button className="bg-[#C00000] mt-4 text-white" type='submit'>
                      Cancel
                    </Button>
                  </div>
                </div>

                <div className='md:w-[30%]'>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                      <CardTitle className="text-sm font-medium">
                        {' '}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>

                      <div className='flex-col flex gap-2'>

                        <div className='flex items-center gap-4'>
                          <p className="text-[#3C9600] w-[130px] font-semibold text-sm">
                            Body Temp</p>  :
                          <FormField
                            name="doctorMLId"
                            render={({ field }) => (
                              <FormItem>
                                {/* <FormLabel>Clinical Notes</FormLabel> */}
                                <FormControl>
                                  <Controller
                                    name="doctorMLId" // Ensure this matches the schema
                                    control={methods.control}
                                    render={({ field }) => (
                                      <Input
                                        type="text"
                                        placeholder=""
                                        disabled={false} // Set loading condition if necessary
                                        {...field} // Spread field props here
                                      />
                                    )}
                                  />
                                </FormControl>
                              </FormItem>

                            )}
                          />
                        </div>

                        <div className='flex items-center gap-4'>
                          <p className="text-[#3C9600]  w-[130px]  font-semibold text-sm">
                            Heart Rate </p>  :
                          <FormField
                            name="doctorMLId"
                            render={({ field }) => (
                              <FormItem>
                                {/* <FormLabel>Clinical Notes</FormLabel> */}
                                <FormControl>
                                  <Controller
                                    name="doctorMLId" // Ensure this matches the schema
                                    control={methods.control}
                                    render={({ field }) => (
                                      <Input
                                        type="text"
                                        placeholder=""
                                        disabled={false} // Set loading condition if necessary
                                        {...field} // Spread field props here
                                      />
                                    )}
                                  />
                                </FormControl>
                              </FormItem>

                            )}
                          />
                        </div>

                        <div className='flex items-center gap-4'>
                          <p className="text-[#3C9600]  w-[130px]  font-semibold text-sm">
                            Resp Rate  </p> :
                          <FormField
                            name="doctorMLId"
                            render={({ field }) => (
                              <FormItem>
                                {/* <FormLabel>Clinical Notes</FormLabel> */}
                                <FormControl>
                                  <Controller
                                    name="doctorMLId" // Ensure this matches the schema
                                    control={methods.control}
                                    render={({ field }) => (
                                      <Input
                                        type="text"
                                        placeholder=""
                                        disabled={false} // Set loading condition if necessary
                                        {...field} // Spread field props here
                                      />
                                    )}
                                  />
                                </FormControl>
                              </FormItem>

                            )}
                          />
                        </div>

                        <div className='flex items-center gap-4'>
                          <p className="text-[#3C9600] w-[130px]  font-semibold text-sm">
                            Blood Pressure </p>   :
                          <FormField
                            name="doctorMLId"
                            render={({ field }) => (
                              <FormItem>
                                {/* <FormLabel>Clinical Notes</FormLabel> */}
                                <FormControl>
                                  <Controller
                                    name="doctorMLId" // Ensure this matches the schema
                                    control={methods.control}
                                    render={({ field }) => (
                                      <Input
                                        type="text"
                                        placeholder=""
                                        disabled={false} // Set loading condition if necessary
                                        {...field} // Spread field props here
                                      />
                                    )}
                                  />
                                </FormControl>
                              </FormItem>

                            )}
                          />
                        </div>

                        <div className='flex items-center gap-4'>
                          <p className="text-[#3C9600]  w-[130px]  font-semibold text-sm">
                            SpO2  </p> :
                          <FormField
                            name="doctorMLId"
                            render={({ field }) => (
                              <FormItem>
                                {/* <FormLabel>Clinical Notes</FormLabel> */}
                                <FormControl>
                                  <Controller
                                    name="doctorMLId" // Ensure this matches the schema
                                    control={methods.control}
                                    render={({ field }) => (
                                      <Input
                                        type="text"
                                        placeholder=""
                                        disabled={false} // Set loading condition if necessary
                                        {...field} // Spread field props here
                                      />
                                    )}
                                  />
                                </FormControl>
                              </FormItem>

                            )}
                          />
                        </div>

                        <div className='flex items-center gap-4'>
                          <p className="text-[#3C9600] w-[130px] font-semibold text-sm">
                            Weight </p>  :
                          <FormField
                            name="doctorMLId"
                            render={({ field }) => (
                              <FormItem>
                                {/* <FormLabel>Clinical Notes</FormLabel> */}
                                <FormControl>
                                  <Controller
                                    name="doctorMLId" // Ensure this matches the schema
                                    control={methods.control}
                                    render={({ field }) => (
                                      <Input
                                        type="text"
                                        placeholder=""
                                        disabled={false} // Set loading condition if necessary
                                        {...field} // Spread field props here
                                      />
                                    )}
                                  />
                                </FormControl>
                              </FormItem>

                            )}
                          />
                        </div>

                      </div>

                    </CardContent>

                  </Card>
                </div>
              </div>
            </form>

          </FormProvider>
        </div>
      </Modal>

      <Modal
        fullWidth={true}
        title="Dr John Doe - 30 May 2024"
        description=""
        isOpen={isOpenDiagnosis}
        onClose={onClose} >
        <hr />

        <div style={{ backgroundImage: `url('images/formBg.svg')`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='mt-4'>
              <div className='flex w-full gap-4'>
                <div className='md:w-[70%]'>
                  <div className='mb-4'>
                    <FormField
                      name="doctorMLId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chief Complaint</FormLabel>
                          <FormControl>
                            <Controller
                              name="doctorMLId" // Ensure this matches the schema
                              control={methods.control}
                              defaultValue={"Pain in Left Ankle"}
                              render={({ field }) => (
                                <Input className='mb-4'
                                  type="text"
                                  placeholder=""
                                  disabled={false} // Set loading condition if necessary
                                  {...field} // Spread field props here
                                />
                              )}
                            />
                          </FormControl>
                        </FormItem>

                      )}
                    />
                  </div>
                  <div className='mb-4'>

                    <FormField
                      control={form.control}
                      name="doctorMLId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Doctor Notes </FormLabel>
                          <FormControl>
                            <Textarea
                              id="description"
                              name="description"
                              placeholder="Doctor notes..."
                              className="col-span-4"
                              defaultValue={"Patient reported fall in the bathroom few hours ago. Complained of extreme pain in left ankle, visible swelling and restricted movement, no wound or bleeding. Prescribed meds and suggested an X-ray"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='mb-4'>
                    <MedicationTable
                      searchKey="patients"
                      columns={columns}
                      data={""}
                    />
                  </div>

                  <div className='mb-4'>
                    <FormField
                      name="doctorMLId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Diagnostic Tests</FormLabel>
                          <FormControl>
                            <Controller
                              name="doctorMLId" // Ensure this matches the schema
                              control={methods.control}
                              defaultValue={"X-ray - Ankle"}
                              render={({ field }) => (
                                <Input className='mb-4'
                                  type="text"
                                  placeholder=""
                                  disabled={false} // Set loading condition if necessary
                                  {...field} // Spread field props here
                                />
                              )}
                            />
                          </FormControl>
                        </FormItem>

                      )}
                    />
                  </div>


                  <div className='flex justify-end gap-4'>
                    <Button className="bg-primary mt-4 text-white">
                      Save
                    </Button>

                    <Button className="bg-[#C00000] mt-4 text-white">
                      Cancel
                    </Button>
                  </div>
                </div>

                <div className='md:w-[30%] flex flex-col gap-3'>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                      <CardTitle className="text-sm font-medium">
                        {' '}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>

                      <div className='flex-col flex gap-2'>

                        <div className='flex items-center gap-4'>
                          <p className="text-[#3C9600] w-[130px] font-semibold text-sm">
                            Body Temp</p>  :<span> 99.4 F </span>

                        </div>

                        <div className='flex items-center gap-4'>
                          <p className="text-[#3C9600]  w-[130px]  font-semibold text-sm">
                            Heart Rate </p>  :<span>72 BPM</span>

                        </div>

                        <div className='flex items-center gap-4'>
                          <p className="text-[#3C9600]  w-[130px]  font-semibold text-sm">
                            Resp Rate  </p> :  <span> 14 BPM</span>

                        </div>

                        <div className='flex items-center gap-4'>
                          <p className="text-[#3C9600] w-[130px]  font-semibold text-sm">
                            Blood Pressure </p>   : <span> 100/70</span>

                        </div>

                        <div className='flex items-center gap-4'>
                          <p className="text-[#3C9600]  w-[130px]  font-semibold text-sm">
                            SpO2  </p> : <span>  98%</span>

                        </div>

                        <div className='flex items-center gap-4'>
                          <p className="text-[#3C9600] w-[130px] font-semibold text-sm">
                            Weight </p>  : <span>87 kg</span>
                        </div>

                      </div>

                    </CardContent>

                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                      <CardTitle className="text-sm font-medium">
                        {' '}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>

                      <div className='flex-col flex gap-2'>
                        <div className='flex items-center justify-between gap-4'>
                          <div><Image src={PdfRedIcon} alt='PdfRedIcon' width={20} height={20} /></div>
                          <div><Image src={EyeIcon} alt='eyeIcon' width={20} height={20} className='cursor-pointer' /></div>
                        </div>
                      </div>
                    </CardContent>

                  </Card>
                </div>
              </div>
            </form>

          </FormProvider>
        </div>
      </Modal >

      <Modal
        fullWidth={true}
        title="New"
        description=""
        isOpen={isOpenNewProcedures}
        onClose={onClose} >
        <hr />

        <div style={{ backgroundImage: `url('images/formBg.svg')`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='mt-4'>
              <div className='flex w-full gap-4'>
                <div className='w-full'>

                  <Checkbox checked={true} aria-label="Select all" />
 
                  <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUpload
                    onChange={field.onChange}
                    value={field.value}
                    onRemove={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

                  <div className='mb-4'>

                    <FormField
                      control={form.control}
                      name="doctorMLId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes </FormLabel>
                          <FormControl>
                            <Textarea
                              id="description"
                              name="description"
                              placeholder="Doctor notes..."
                              className="col-span-4"
                              defaultValue={"Patient reported fall in the bathroom few hours ago. Complained of extreme pain in left ankle, visible swelling and restricted movement, no wound or bleeding. Prescribed meds and suggested an X-ray"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>



                  <div className='flex justify-end gap-4'>
                    <Button className="bg-primary mt-4 text-white">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>

          </FormProvider>
        </div>
      </Modal >
    </>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from '@/components/forms/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import logo from '../../../public/images/logo2.svg';
import formBg from '../../../public/images/formBg.svg';
import { url } from 'inspector';


export const metadata: Metadata = {
  title: 'ML-DC-Login',
  description: 'DOctor Login for Ml Portal'
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid 
    lg:max-w-none lg:grid-cols-2 lg:px-0">

      <div className="relative sm:h-full flex-col bg-muted p-10 text-primary lg:flex dark:border-r"
        style={{ backgroundImage: `url('images/formBg.svg')`,backgroundSize:'contain',backgroundPosition:'center',backgroundRepeat:'no-repeat' }} 
        >
        <div className="absolute inset-0 bg-[#EFF6FF]" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          {/* <Image src={logo} alt='logo' width={80} height={80} /> */}
          {/* <p>niha</p> */}
        </div>

        <div className="relative z-20 my-auto" 
        >
          <blockquote className="space-y-2">
          {/* <p className="sm:text-[40px] text-[22px] sm:py-0 py-4 text-left font-extrabold">
              Welcome to <br />
              {process.env.NEXT_APPLICATION_NAME} Doctor&apos;s Portal
          </p> */}
          </blockquote>
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="sm:text-[17px] text-sm">
              &ldquo;Revolutionising Healthcare with centralised Digital Health Records.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>

      <div className="flex sm:h-full bg-[#EFF6FF] justify-center items-center p-4 lg:p-6">
        <div className="mx-auto flex w-full bg-white rounded-sm flex-col justify-center p-4 lg:p-6 space-y-2 sm:w-[550px]">
          <UserAuthForm />
        </div>

      </div>

    </div>
  );
}

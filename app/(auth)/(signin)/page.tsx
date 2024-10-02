import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from '@/components/forms/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import logo from '../../../public/images/logo.svg';


export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid 
    lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      <div className="relative sm:h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
         <Image src={logo} alt='logo' width={80} height={80} />
        </div>

        <div className="relative z-20 my-auto">
          <blockquote className="space-y-2">
            <p className="sm:text-[40px] text-[22px] sm:py-0 py-4 text-left  font-extrabold">
              Welcome to <br></br>
              MediLog Doctor's Portal
            </p> 
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
        <div className="mx-auto flex w-full bg-white rounded-sm flex-col justify-center p-4 lg:p-6 space-y-2 sm:w-[450px]">
          <div className="flex flex-col space-y-1 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign In
            </h1> 
          </div>
          <UserAuthForm /> 
        </div>
        
      </div>

      
    </div>
  );
}

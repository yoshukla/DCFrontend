import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from '@/components/forms/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import logo from '../../../public/images/logo.svg';
import LanguageIcon from '../../../public/images/languageIcon.svg';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Authentication forms built using the components.'
};

export default function AuthenticationPage() {
  // const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="relative h-screen">

      <nav className="bg-primary border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={logo} alt='logo' width={80} height={80} />
          </a>
          <button data-collapse-toggle="navbar-multi-level" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border
             border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse 
             md:flex-row md:mt-0 md:border-0 text-[15px] dark:bg-gray-800
             md:dark:bg-gray-900 dark:border-gray-700 justify-center items-center">
              <li>
                <a href="#" className="block py-2 px-3 text-white
                 md:p-0 md:dark:bg-transparent
                 " aria-current="page">Home</a>
              </li>
            
              <li>
                <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Partners</a>
              </li>

              <li>
                <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Resources</a>
              </li>

              <li>
                <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About us</a>
              </li>


              <li>
                <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
              </li>

              <li>
                <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  <Image src={LanguageIcon} alt="LanguageIcon" width={25} height={25} />
                </a>
              </li>

              <li>
                <a href="#" className="block py-2 px-3 text-white rounded
                 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0
                  dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white
                   md:dark:hover:bg-transparent">
                  <Button className="bg-blue-600 text-white" type="submit">
                    Login
                  </Button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div className='flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className="h-full bg-white flex-col bg-muted p-10 text-white lg:flex">
          <div className="" />

          <p>Niharika</p>
        </div>

        <div className="bh-white flex h-full items-center p-4 lg:p-8">
          <div className="flex w-full flex-col justify-center">
            <div className="flex flex-col space-y-2 text-left">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login
              </h1>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Don't have an account {' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary">
                Register
              </Link>{' '}

              .
            </p>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className='bg-primary text-[15px] text-white px-10 py-2 sm:flex'>
        <div className='sm:w-1/4'>
          <p>Book a demo and our representative will
            give you a comprehensive demo of our
            product and clear any remaining doubts</p>
        </div>
        <div className='sm:w-1/4'>
          <ul>
            <li className='font-semibold'>For Patients</li>
            <li>Search for Doctors</li>
            <li>Labs</li>
            <li>Pharmacies</li>
          </ul>
        </div>
        <div className='sm:w-1/4'>
          <ul>
            <li className='font-semibold'>Contact Us</li>
            <li>MediLog
              4th Floor, Bizness Square
              Hitech City Rd, HITEC City
              Hyderabad, Telangana 500081
              contact@medilog.in</li>

          </ul>
        </div>
        <div className='sm:w-1/4'>
          <ul> 
            <li className='font-semibold'>Join Our Newsletter</li>
          </ul>
        </div>
      </div>
      <div className='bg-[#DECFFF] text-white p-10 sm:flex justify-between'>
        <div className=''>Copyright © 2024 Medilog  </div>
        <div className=''>niha</div>
      </div>
    </div>
  );
}

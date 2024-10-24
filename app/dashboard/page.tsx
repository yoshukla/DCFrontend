import { ArrowDown } from 'lucide-react';
import Tablets from '../../public/images/tablets.svg';
import Image from 'next/image';
import Heading from '@/components/Heading/page-heading';
import PageContainer from '@/components/layout/page-container';


export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
            {/*   😊  */}
          </h2>

        </div>

        <Heading heading={"Notifications"} />  

        <div className='bg-white px-4 py-10 sm:text-lg text-base rounded-lg'>
          <div className='flex items-center'>
            <div>
              Government promoting use of digital health records
            </div>
            <div className='mx-auto'>
              <Image src={Tablets} alt="tablets" width={120} height={120} />
            </div>
          </div>
        </div>

        <div className='bg-[#E8E8E8] text-white p-4 w-full  rounded-lg flex items-center'>
          <div className='bg-primary p-4 text-center rounded-tl-lg  w-full  rounded-bl-lg'>
            Your Last Activity
          </div>
          <div className='border border-primary  rounded-tr-lg  rounded-br-lg bg-white p-4 cursor-pointer'>
            <ArrowDown className='text-primary' />
          </div>
        </div>

      </div>
    </PageContainer>
  );
}

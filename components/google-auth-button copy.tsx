'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import Image from 'next/image';
import GoogleSignInBtn from '../public/images/google.png';


export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl'); 

  return (
    <Button
      className="border rounded-full p-3 h-auto"
      variant="link"
      type="button"
      onClick={() =>
        signIn('google', { callbackUrl: callbackUrl ?? '/dashboard' })
      }
    > 
    <Image  alt='Google SignIn' src={GoogleSignInBtn} width={23} height={23}/>
    </Button>
  );
}

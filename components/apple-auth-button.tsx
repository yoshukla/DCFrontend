'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import Image from 'next/image';
import AppleSignInBtn from '../public/images/apple-logo.png';


export default function AppleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <Button
      className="border rounded-full p-3 h-auto"
      variant="link"
      type="button"
      onClick={() =>
        signIn('apple', { callbackUrl: callbackUrl ?? '/dashboard' })
      }
    > 
    <Image  alt='Apple SignIn' src={AppleSignInBtn} width={23} height={23}/>
    </Button>
  );
}

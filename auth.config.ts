import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const authConfig = {
  providers: [ 
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialProvider({
      credentials: {
        mlid: {
          type: 'text'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        debugger;
        const user = {
          id: '1',
          name: 'Medilog',
          mlid: credentials?.mlid as string
        };
        if (credentials.mlid === 'ML123456789' && credentials.password === 'medilog123') {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET, 
  pages: {
    signIn: '/' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;

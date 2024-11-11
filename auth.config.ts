import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { loginRequestObj } from './constants/RequestObj';
import { postDataWithAuth } from './lib/utils';
import { BASE_URL } from './constants/data';

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
      authorize: async (credentials) => {
          console.log('Credentials:', credentials);  // Log credentials
          const loginRequest = loginRequestObj(credentials.mlid, credentials.password);
          const response = await postDataWithAuth(BASE_URL, loginRequest, '');

          console.log('Response:', response);  // Log response from API

          if (response?.data?.login?.token) {
          return response.data.login.user;
          } else {
          console.error('Login failed: Invalid credentials');
          return null;  // Return null if login fails
          }
      }
    }) 
  ],
  
  //secret: process.env.NEXTAUTH_SECRET,
  
  secret: '', 
  pages: {
    signIn: '/' //sigin page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    } 
  }
} satisfies NextAuthConfig;

export default authConfig;

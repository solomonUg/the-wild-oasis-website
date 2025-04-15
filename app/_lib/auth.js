import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: { authorized({auth, request}){
        // This is a trick to convert a result to boolean. Also same as {auth?.user: true : false} 
        return !!auth?.user;
  }
 },

pages: {
    signIn: "/login",
 }

};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

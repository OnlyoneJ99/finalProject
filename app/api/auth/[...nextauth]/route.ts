import {compare} from "bcrypt";
import NextAuth, { User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import FaceBookProvider from "next-auth/providers/facebook";
import { prisma } from '@/app/lib/prisma';

const clientId = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

const handler = NextAuth({
    secret:process.env.AUTH_SECRET,
    providers:[
        FaceBookProvider({
            clientId:process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret:process.env.FACEBOOK_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId,
            clientSecret,            
        }),
        CredentialsProvider({
            name:"sign in",
            credentials:{
                username:{
                    label:"username",
                    type:"username",
                    placeholder:""
                },
                password:{
                    label:"password",
                    type:"password"
                },
            },
            async authorize(credentials) {
                if(!credentials?.username || !credentials.password){
                    return null;
                }
                const user = await prisma.user.findUnique({
                   where:{username:credentials.username}
                });
                if(!user || !(await compare(credentials.password,user.password))){
                    return  null;
                }
                const usersessiondata =  {
                    id:user.id,
                    username:user.username,
                    phonenumber:user.phonenumber,
                    firstname:user.firstname,
                    lastname:user.lastname,
                }
                return usersessiondata as User;
            },
        })
    ],
   
    session:{
        maxAge: 2*24*60*60
    },
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.user = user;
            }
            return token;
        },
        async session({session,token}) {
            session.user = token.user!;
            return session;
        },
    }
})
export {handler as GET, handler as POST};
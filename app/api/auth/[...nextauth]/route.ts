import {compare} from "bcrypt";
import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/app/lib/prisma';

const handler = NextAuth({
    secret:process.env.AUTH_SECRET,
    providers:[
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
import { User } from '@/lib/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs"


export const authOptions = {
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username:{lable: 'username' , type:'text',palceholder:'username'},
                password:{lable: 'password' , type:'password',palceholder:'password'}
            },
            async authorize(credentials :any){
                // console.log(credentials)

                const user = await User.findOne({
                    username:credentials.username
                })

                if(user && user.password && (await bcrypt.compare(credentials.password, user.password))){

                    return{
                        id:user._id.toString(),
                        name:user.username
                    };
                }
                return null;
                    
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
          })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        session: ({session , token , user}:any) => {
            if(session && session.user){
                session.user.id = token.sub
            }
            return session;
        }
    }
}
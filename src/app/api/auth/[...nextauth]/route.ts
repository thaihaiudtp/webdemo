import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
declare module "next-auth" {
    interface User {
      _id: string;
      fullname: string;
      email: string;
    }
  
    interface Session {
      user: User;
    }
  
    interface JWT {
      user: User;
    }
  }
const handler = NextAuth({

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "********" }
            },
            async authorize(credentials, req) {
                await connectDB();
                console.log(credentials);
                if (!credentials) throw new Error("Missing credentials");
                const userFound = await User.findOne({ email: credentials.email }).select("+password");
                if (!userFound) throw new Error("Invalid credentials");

                const passwordMatch = await bcrypt.compare(credentials.password, userFound.password);
                if (!passwordMatch) throw new Error("Invalid credentials");

                console.log(userFound);

                return userFound;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    _id: user._id,
                    email: user.email,
                    fullname: user.fullname || user.email.split("@")[0], 
                };
            }
            return token;
        },
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user as any; 
            }
            return session;
        },
        async signIn({ account, profile }) {
            if (account?.provider === "google") {
                return true;
            }
            return true;
        }
        
    },
    
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST }
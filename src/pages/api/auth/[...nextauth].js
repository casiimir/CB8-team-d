import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import User from "@/models/user";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,

    options: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,

    secure: process.env.NODE_ENV === "production",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      secret: process.env.NEXTAUTH_SECRET,
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();

        if (credentials == null) return null;

        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return {
                _id: user._id,
                email: user.email,
                username: user.username,
                resources: user.resources,
              };
            } else {
              throw new Error("Email or password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          username: user.username,
          resources: user.resources,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.user) {
        session.user = { ...token.user };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

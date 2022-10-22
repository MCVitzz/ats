import ApplicationProvider from '@/lib/providers/ApplicationProvider'
import NextAuth, { type NextAuthOptions } from 'next-auth'

export const nextAuthOptions: NextAuthOptions = {
  providers: [ApplicationProvider()],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
  },
  debug: true,
  callbacks: {
    async signIn() {
      return true
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async session({ session, token }) {
      if (token !== null) {
        session.user.id = token.id
      } else if (typeof token !== typeof undefined) {
        session.token = token
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
}

export default NextAuth(nextAuthOptions)

import { DefaultJWT } from 'next-auth/jwt'

type SessionUser = {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user: SessionUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
  }
}

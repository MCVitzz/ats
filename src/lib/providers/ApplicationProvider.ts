import login from '@/lib/auth/login'
import CredentialsProvider from 'next-auth/providers/credentials'

export default function ApplicationProvider() {
  return CredentialsProvider({
    // name: 'app',
    id: 'app',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'Email' },
      password: {
        label: 'Password',
        type: 'password',
        placeholder: 'Password',
      },
    },
    async authorize(credentials) {
      try {
        if (!credentials) return null

        const data = await login(credentials.email, credentials.password)

        if (data) return data
        else return null
      } catch (err) {
        console.log(err)
        throw err
      }
    },
  })
}

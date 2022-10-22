/* eslint-disable no-unused-vars */
import { SessionUser } from '@/types/next-auth'
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/react'

type Handler<T = void> = (
  ctx: GetServerSidePropsContext,
  user: SessionUser
) => GetServerSidePropsResult<T> | Promise<GetServerSidePropsResult<T>>

export default function getPrivateProps<T>(handler: Handler<T>) {
  return async function getServerSidePropsPrivate(
    ctx: GetServerSidePropsContext
  ) {
    const session = await getSession(ctx)

    if (!session || !session.user)
      return {
        redirect: {
          destination: '/login',
          permanent: true,
        },
      }
    else
      return await handler(ctx, {
        id: session?.user?.id ?? '',
        name: session.user.name ?? '',
        email: session.user.email ?? '',
        createdAt: session.user.createdAt ?? new Date(0),
        updatedAt: session.user.updatedAt ?? new Date(0),
        // image: session.user.image ?? '',
      })
  }
}

/* eslint-disable no-unused-vars */
import { NextPage } from 'next/types'

type CustomPage = NextPage & {
  title: string
  fullPage: boolean
}

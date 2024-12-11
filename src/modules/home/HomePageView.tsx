"use client"
import { DEFINE_ROUTE } from '@/constants/router';
import cookiesStore from '@/plugins/cookiesStore'
import { redirect } from 'next/navigation';

export default function HomePageView() {
  const token = cookiesStore.get('token');

  if(!token) {
    return redirect(DEFINE_ROUTE.login)
  }

  return (
    redirect(DEFINE_ROUTE.dashboard)
  )
}
"use client";

import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(
  () => import('@/components/Bogus'), {
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  return <DynamicHeader />
}

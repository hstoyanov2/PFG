import Link from 'next/link';
import Table from './components/Table'
import { getAllCars } from './services/carService'
import TestCors from '@/app/TestCors';
import React from 'react'

export default async function Home() {
  return (
    <div className="flex flex-col max-w-5xl min-w-5xl">
      <TestCors />
      <Link className="inline bg-blue-500 w-20 pointer" href="/edit">Create Car</Link>
      <Table />
    </div>
  )
}
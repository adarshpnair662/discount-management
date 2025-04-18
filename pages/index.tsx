import React from 'react';
import Head from 'next/head';
import DiscountManager from '../components/DiscountManager';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Discount Manager</title>
        <meta name="description" content="A Discount management tool" />
      </Head>

      <main className="container mx-auto py-8 px-4">
        <DiscountManager />
      </main>
    </div>
  );
}
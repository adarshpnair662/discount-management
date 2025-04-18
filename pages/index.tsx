import React from 'react';
import Head from 'next/head';
import DiscountManager from '../components/DiscountManager';
import { DiscountProvider } from '../context/DiscountContext'
import { Lato } from 'next/font/google';
const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'], // Optional: choose what you need
  variable: '--font-lato',
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Discount Manager</title>
        <meta name="description" content="A Discount management tool" />
      </Head>

      <main className="container mx-auto py-8 px-4 lato.className">
        <DiscountProvider>
          <DiscountManager />
        </DiscountProvider>
      </main>
    </div>
  );
}
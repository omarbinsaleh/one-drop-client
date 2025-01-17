import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <section className='w-full min-h-screen flex flex-col'>
      <header>
         this is the header section
      </header>
      <main className='flex-1 border border-red-500'>
         <Outlet></Outlet>
      </main>
      <footer>
         <Footer></Footer>
      </footer>
    </section>
  )
}

export default MainLayout;

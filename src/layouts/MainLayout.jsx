import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { AuthContext } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';

const MainLayout = () => {
   const {darkMood} = useContext(AuthContext);

   console.log('dark mood -->', darkMood);

  return (
    <section className={`min-h-screen w-full flex flex-col ${darkMood ? 'dark' : ''}`}>
      <header className='fixed z-20 top-0 w-full text-center'>
        <Navbar></Navbar>
      </header>
      <main className='flex-1 border border-red-500 mt-16'>
         <Outlet></Outlet>
      </main>
      <footer>
         <Footer></Footer>
      </footer>
    </section>
  )
}

export default MainLayout;

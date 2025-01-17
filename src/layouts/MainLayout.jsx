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
      <header>
        <Navbar></Navbar>
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

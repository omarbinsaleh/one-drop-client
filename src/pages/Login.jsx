import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useState } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const Login = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [errorMessage, setErrorMessage] = useState({
      email: '',
      password: ''
   })
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const location = useLocation();
   const navigate = useNavigate();
   const { signIn, setUser, setLoading, } = useAuth();

   // REGURLAR EXPRESSION FOR PASSWORD VALIDATION
   const PassRegEX = /^(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d@$!%*?&#]{6,}$/

   // CHANGE THE PAGE TITLE:
   document.title = "Sign-In | One Drop";

   // HANDLE SIGN-IN FORM SUBMITION
   function handleSubmit(e) {
      // 01. block the native form submit behaviour
      e.preventDefault();

      // 02. validate the password
      if (!PassRegEX.test(password)) {
         setErrorMessage({ ...errorMessage, password: "Invalid Password: Password must be at least 6 character log and must include at least one lowercase and one uppercase latter" })
         return;
      }

      // 03. TODO: check if the user exists in the database:

      // 04. sign-in user with firebase
      signIn(email, password)
         .then((result) => {
            setUser(result.user);
            toast.success("User logged in successfully")
            { location.state ? navigate(location.state) : navigate('/'); }
         })
         .catch((err) => {
            toast.error(err.message);
         });
         
      // 05. reset the form
      e.target.reset();
   }



   return (
      <div className='flex items-center justify-center min-h-screen w-full p-3'>
         <section className='w-full place-items-center space-y-1 card shadow-2xl max-w-xl py-3 border rounded-sm'>
            <div className=''>
               <img className='mx-auto w-[130px] ' src={logo} alt="" />
            </div>
            <h1 className="text-3xl font-semibold text-secondary">Login your account</h1>
            <div className="card bg-base-100 w-full max-w-md  shrink-0 ">
               <form onSubmit={handleSubmit} className="card-body">
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="email" className="input input-bordered rounded-sm" required />
                  </div>
                  <div className="form-control relative">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <input onChange={(e) => setPassword(e.target.value)} name="password" type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered rounded-sm" required />
                     <div onClick={() => setShowPassword(!showPassword)} className=' absolute right-3 top-[52px] cursor-pointer'>{showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>
                     {
                        errorMessage.password ? (
                           <label className="label">
                              <p className='text-xs text-red-500'>{errorMessage.password}</p>
                           </label>
                        ) : ''
                     }
                     <label className="label">
                        <Link to={'/forget-password'} state={{ email }} className="label-text-alt link link-hover">Forgot password?</Link>
                     </label>
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn bg-secondary hover:bg-secondary/90 text-white rounded-sm">Login</button>
                  </div>
                  <div className='w-full text-center'>
                     <p className=''>Don't have account? <span className="text-primary font-semibold"><Link to={'/auth/sign-up'} state={location.state} >Register</Link></span></p>
                  </div>
               </form>
            </div>
         </section>
      </div>
   )
}

export default Login

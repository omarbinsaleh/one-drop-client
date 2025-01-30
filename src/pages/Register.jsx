import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import Spinner from '../components/Spinner';


const Register = () => {
   const location = useLocation();
   const { signUp, user, setUser, updateUserInfo, setLoading } = useContext(AuthContext)
   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
   const [upazilas, setUpazilas] = useState([]); // for the upazilas input field
   const [errorMessage, setErrorMessage] = useState({
      name: '',
      photoURL: '',
      email: '',
      password: '',
      confirmPassword: ''
   })

   // FETCH DATA FROM THE DATABASE
   const { isPending, data, error } = useQuery({
      queryKey: ['districts', 'upazilas'],
      queryFn: async () => {
         // FETCH THE DISTRICTS DATA
         const { data: districtsData } = await axios.get(`${import.meta.env.VITE_API_URL}/districts`)
         const districts = districtsData.find(item => item.name === 'districts').data;

         // FETCH UPAZILAS DATA
         const { data: upazilasData } = await axios.get(`${import.meta.env.VITE_API_URL}/upazilas`);
         const upazilas = upazilasData.find(item => item.name === 'upazilas').data;

         return { districts, upazilas }
      }
   })

   console.log('districts from register page --> ', data);

   // CHANGE THE PAGE TITLE:
   document.title = "Sign-Up | One Drop";

   // RENDER THE SPINNER, WHILE THE DATA IS BEING LOADED
   if (isPending) return <Spinner></Spinner>

   // HANDLE 'onChange' EVENT IN THE DISTRICTS INPUT FIELD
   const handleDistrictsChange = (e) => {
      const districtName = e.target.value;
      const district = data.districts.find(district => district.name === districtName);
      const districtId = district.id;
      const upazilasData = data.upazilas.filter(upazila => upazila.district_id === districtId);
      setUpazilas(upazilasData);
   };

   // HANDLE SIGN-UP FORM SUBMITION
   function handleSubmit(e) {
      // 01. block native form behaviour
      e.preventDefault();

      const PassRegEX = /^(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d@$!%*?&#]{6,}$/

      // 02. take data from user
      const form = new FormData(e.target);
      const name = form.get('name');
      const photoURL = form.get('photoURL');
      const email = form.get("email");
      const blood = form.get("blood-group");
      const district = form.get("district");
      const upazila = form.get("upazila");
      const password = form.get("password");
      const confirmPassword = form.get("confirm-password");

      // 03. validate password:
      if (!PassRegEX.test(password)) {
         setErrorMessage({ ...errorMessage, password: "Invalid Password: Password must be at least 6 character log and must include at least one lowercase and one uppercase latter" })
         return;
      };

      // 04. confirm password validation
      if (password !== confirmPassword) {
         setErrorMessage({ ...errorMessage, confirmPassword: "Please confirm your password" });
         return;
      };

      const newUser = { name, photoURL, email, blood, district, upazila };
      console.log("Creating New User -->", newUser);

      // 05 save user information to the database:
      axios.post(`${import.meta.env.VITE_API_URL}/users`, newUser)
         .then(response => {
            console.log(response.data)

            // when the user information is successfully saved in the database
            if (response.data.insertedId) {
               // 06. create new user in the firebase:
               signUp(email, password)
                  .then((result) => {
                     setUser(result.user)

                     // 07. update user profile in the firebase:
                     updateUserInfo({
                        displayName: name,
                        photoURL: photoURL,
                     }).then(() => {
                        console.log("User Creation by firebase is done.");

                        // 08 show a success message
                        toast.success("User Created Successfully!")

                        // 09. reset the sign-up form and clear all error messages
                        e.target.reset();
                        setErrorMessage({
                           name: "",
                           photoURL: "",
                           email: "",
                           password: "",
                           confirmPassword: ""
                        })

                        // 10. redirect the user to a particular page, where he wated to go
                        // by default, user will be redirected to the home page
                        { location.state ? navigate(location.state) : navigate('/') }
                        setLoading(false);

                     }).catch((err) => {
                        toast.error(err)
                     })

                  }).catch((err) => {
                     toast.error(err);
                  })
            }

            // when the email provided is already in use in the data base and the database fails to save the user information
            if (response.data.isExistingUser) {
               toast.error("User already exists with the same email")
               setErrorMessage({ ...errorMessage, email: "Try with a different email" });
            }

         }).catch((error) => {
            toast.error(error.message);
         })
   }

   console.log(location);

   return (
      <div className='min-h-screen w-full flex flex-col items-center justify-center p-3'>
         <section className='w-full place-items-center space-y-1 card shadow-2xl max-w-xl py-3 border rounded-sm'>
            <div>
               <img className='w-[130px] mx-auto' src={logo} alt="" />
            </div>
            <h1 className="text-3xl text-secondary font-semibold">Create your account</h1>
            <div className="card bg-base-100 w-full max-w-md  shrink-0 ">
               <form onSubmit={handleSubmit} className="card-body">
                  {/* name input field */}
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Name</span>
                     </label>
                     <input name='name' type="text" placeholder="Full Name" className="input input-bordered rounded-sm" />
                  </div>
                  {/* user photoURL input field */}
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Photo URL</span>
                     </label>
                     <input name='photoURL' type="text" placeholder="Photo URL" className="input input-bordered rounded-sm" />
                  </div>
                  {/* email input field */}
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input name='email' type="email" placeholder="email" className="input input-bordered rounded-sm" required />
                     {
                        errorMessage.email ? (
                           <label className="label">
                              <p className='text-xs text-red-500'>{errorMessage.email}</p>
                           </label>
                        ) : ''
                     }
                  </div>
                  {/* blood group input field   */}
                  <label className="form-control w-full rounded-sm">
                     <div className="label">
                        <span className="label-text">Blood Group</span>
                     </div>
                     <select className="select select-bordered rounded-sm" defaultValue='' name='blood-group'>
                        <option value=''>Choose your blood group</option>
                        <option value='A+'>A+</option>
                        <option value='A-'>A-</option>
                        <option value='B+'>B+</option>
                        <option value='B-'>B-</option>
                        <option value='AB+'>AB+</option>
                        <option value='AB-'>AB-</option>
                        <option value='O+'>O+</option>
                        <option value='O-'>O-</option>
                     </select>
                  </label>
                  {/* districts input field   */}
                  <label className="form-control w-full rounded-sm">
                     <div className="label">
                        <span className="label-text">District</span>
                     </div>
                     <select className="select select-bordered rounded-sm" onChange={handleDistrictsChange} defaultValue='' name='district'>
                        <option value=''>Choose your district</option>
                        {data?.districts?.map(district => <option key={district.id} value={district.name}>{district.name}</option>)}
                     </select>
                  </label>
                  {/* upazilas input field   */}
                  <label className="form-control w-full rounded-sm">
                     <div className="label">
                        <span className="label-text">Upazila</span>
                     </div>
                     <select className="select select-bordered rounded-sm" defaultValue='' name='upazila'>
                        <option value=''>Choose your upazila</option>
                        {upazilas.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)}
                     </select>
                  </label>
                  {/* password input field */}
                  <div className="form-control relative">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <input name='password' type={showPassword ? "text" : "password"} placeholder="Password" className="input input-bordered rounded-sm" required />
                     <div onClick={() => setShowPassword(!showPassword)} className=' absolute right-3 top-[52px] cursor-pointer'>{showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>
                     {
                        errorMessage.password ? (
                           <label className="label">
                              <p className='text-xs text-red-500'>{errorMessage.password}</p>
                           </label>
                        ) : ''
                     }
                  </div>
                  {/* confirm password input field */}
                  <div className="form-control relative">
                     <label className="label">
                        <span className="label-text">Confirm Password</span>
                     </label>
                     <input name='confirm-password' type={showConfirmedPassword ? "text" : "password"} placeholder="Confirm Password" className="input input-bordered rounded-sm" required />
                     <div onClick={() => setShowConfirmedPassword(!showConfirmedPassword)} className=' absolute right-3 top-[52px] cursor-pointer'>{showConfirmedPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>
                     {
                        errorMessage.confirmPassword ? (
                           <label className="label">
                              <p className='text-xs text-red-500'>{errorMessage.confirmPassword}</p>
                           </label>
                        ) : ''
                     }
                     <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                     </label>
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn bg-secondary hover:bg-secondary/90 text-white rounded-sm">Create Account</button>
                  </div>
                  <div className='w-full text-center'>
                     <p className=''>Already have account? <span className="text-primary font-semibold"><Link to={'/auth/sign-in'}>Sign In</Link></span></p>
                  </div>
               </form>

            </div>
         </section>
      </div>
   )
}

export default Register

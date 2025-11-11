import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const toggleModal = () => setIsModalOpen(v => !v)
  const switchToSignUp = () => setIsSignUp(true)
  const switchToSignIn = () => setIsSignUp(false)
  const toggleMobileMenu = () => setIsMobileMenuOpen(v => !v)

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    setIsLoggedIn(!!token)
  }, [])

  let [formData,setFormData]=useState({
    username:"",
    email:"",
    password:""
  });

  // Form validation
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      alert('Email and password are required');
      return false;
    }
    if (isSignUp && !formData.username) {
      alert('Username is required for sign up');
      return false;
    }
    return true;
  }

  let signUp = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Account created successfully!');
        setFormData({ username: "", email: "", password: "" });
        setIsModalOpen(false);
      } else {
        alert(data.message || 'Sign up failed');
      }
      
    } catch (error) {
      alert('Network error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  let signIn = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/users/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("auth-token", data.token);
        setIsLoggedIn(true);
        alert('Signed in successfully!');
        setFormData({ username: "", email: "", password: "" });
        setIsModalOpen(false);
      } else {
        alert(data.message || 'Sign in failed');
      }
      window.location.reload();
    } catch (error) {
      alert('Network error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  let formhandler = (e) => {
    setFormData((data) => {
      let setData = {...data};
      setData[e.target.name] = e.target.value;
      return setData;
    });
  }

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (isSignUp) {
      signUp();
    } else {
      signIn();
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setIsLoggedIn(false);
    setIsModalOpen(false);
    window.location.reload();
  }

  return (
    <>
      <div className='w-full flex h-20 justify-center items-center'>
        <div className='flex flex-row w-screen items-center justify-around lg:justify-around'>
          <Link to="/">
            <h1 className='text-3xl text-orange-500 font-bold'>Pineapple</h1>
          </Link>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <div className='hidden lg:flex w-96 justify-around'>
            <Link to='/' className='text-lg font-sans text-gray-500 cursor-pointer hover:text-gray-700'>home</Link>
            <p className='text-lg font-sans text-gray-500 cursor-pointer hover:text-gray-700'>menu</p>
            <p className='text-lg font-sans text-gray-500 cursor-pointer hover:text-gray-700'>mobile app</p>
            <p className='text-lg font-sans text-gray-500 cursor-pointer hover:text-gray-700'>contact us</p>
          </div>
          
          {/* Desktop Actions - Hidden on mobile */}
          <div className='hidden lg:flex w-80 justify-around p-10 items-center'>
            <img className='h-6 cursor-pointer' src={assets.search_icon} alt="search"/>
            <Link to="/cart">
              <img className='h-6 cursor-pointer' src={assets.basket_icon} alt="cart"/>
            </Link>
            {
              isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="border-2 border-neutral-400 p-2 pl-5 pr-5 rounded-full hover:bg-gray-50"
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={toggleModal}
                  className="border-2 border-neutral-400 p-2 pl-5 pr-5 rounded-full hover:bg-gray-50"
                >
                  Sign in
                </button>
              )
            }
          </div>

          {/* Mobile Actions - Visible on mobile */}
          <div className='flex lg:hidden items-center gap-4'>
            <img className='h-6 cursor-pointer' src={assets.search_icon} alt="search"/>
            <Link to="/cart">
              <img className='h-6 cursor-pointer' src={assets.basket_icon} alt="cart"/>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[34px] min-h-[34px] rounded-md bg-transparent border-transparent text-slate-800 hover:bg-slate-200/10 hover:border-slate-600/10 shadow-none hover:shadow-none"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobileMenu"
            >
              <svg width="1.5em" height="1.5em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" className="h-4 w-4">
                <path d="M3 5H21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M3 12H21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M3 19H21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Collapse - Only visible on mobile */}
      <div 
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`} 
        id="mobileMenu"
      >
        <div className="px-4 pb-4 bg-white border-t border-gray-100">
          <ul className="flex flex-col gap-y-2">
            <li>
              <Link to='/' className='font-sans text-sm text-gray-500 p-3 hover:text-gray-700 hover:bg-gray-50 block rounded-md transition-colors'>
                Home
              </Link>
            </li>
            <li>
              <p className='font-sans text-sm text-gray-500 p-3 hover:text-gray-700 hover:bg-gray-50 block rounded-md transition-colors cursor-pointer'>
                Menu
              </p>
            </li>
            <li>
              <p className='font-sans text-sm text-gray-500 p-3 hover:text-gray-700 hover:bg-gray-50 block rounded-md transition-colors cursor-pointer'>
                Mobile App
              </p>
            </li>
            <li>
              <p className='font-sans text-sm text-gray-500 p-3 hover:text-gray-700 hover:bg-gray-50 block rounded-md transition-colors cursor-pointer'>
                Contact Us
              </p>
            </li>
            <li className="pt-2 border-t border-gray-100">
              {
                isLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left border-2 border-neutral-400 p-2 pl-5 pr-5 rounded-full hover:bg-gray-50 text-sm"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="w-full text-left border-2 border-neutral-400 p-2 pl-5 pr-5 rounded-full hover:bg-gray-50 text-sm"
                  >
                    Sign in
                  </button>
                )
              }
            </li>
          </ul>
        </div>
      </div>

      {/* Modal - Updated */}
      <div
        className={`fixed inset-0 bg-slate-950/50 flex justify-center items-center transition-opacity duration-300 ease-out z-[9999] ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isModalOpen}
        onClick={() => setIsModalOpen(false)}
      >
        <div
          className="bg-white rounded-xl shadow-2xl shadow-slate-950/5 border border-slate-200 max-w-md w-full mx-4 scale-95 relative"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <div className="p-4 pb-2 flex justify-between items-center">
            <h1 className="text-2xl text-slate-800 font-semibold">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
            <button
              type="button"
              onClick={toggleModal}
              aria-label="Close"
              className="inline-grid place-items-center text-slate-400 hover:text-slate-600 transition-colors absolute right-2 top-2"
            >
              <svg width="1.5em" height="1.5em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" className="h-5 w-5">
                <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>

          <div className="p-6">
            <p className="text-slate-600 mb-4">
              {isSignUp ? 'Create your account by entering your details.' : 'Enter your email and password to Sign In.'}
            </p>

            <form className="space-y-4" onSubmit={handleFormSubmit}>
              {isSignUp && (
                <div className="w-full">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    onChange={formhandler}
                    value={formData.username}
                    className="block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
                    required={isSignUp}
                  />
                </div>
              )}

              <div className="w-full">
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="name@mail.com"
                  name="email"
                  onChange={formhandler}
                  value={formData.email}
                  className="block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
                  required
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  name='password'
                  onChange={formhandler}
                  value={formData.password}
                  className="block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input id="remember" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-slate-600" />
                <label htmlFor="remember" className="text-sm text-slate-700">Remember Me</label>
              </div>

              <div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center rounded-md py-2 px-3 bg-orange-500 border border-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    isSignUp ? 'Sign Up' : 'Sign In'
                  )}
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-slate-600">
              {isSignUp ? (
                <>Already have an account? <button type="button" onClick={switchToSignIn} className="text-slate-800 font-medium hover:text-slate-900">Sign in</button></>
              ) : (
                <>Don't have an account? <button type="button" onClick={switchToSignUp} className="text-slate-800 font-medium hover:text-slate-900">Sign up</button></>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
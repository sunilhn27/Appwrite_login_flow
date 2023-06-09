"use client"

import { useEffect, useState } from 'react';
import { account } from '@/services/appwrite.config';
import { useRouter } from 'next/navigation';
import { checkUserLoggedIn } from './Login'

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  async function checkUserLoggedIn() {
    if ((account.get()).status) {
         return true;
    } else {
      console.log("not Logged in ")
    }
  }

  useEffect(() => {
    const fetchSession = async () => {
      console.log("inside fetch")
      try {
        const userSession = await account.getSession('current')
        console.log("************************")
        setUsername(userSession.userId)
        setEmail(userSession.providerUid)
        console.log("************************")
        console.log("userName" + username)
        console.log("Emial " + email)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    // if ((account.get()).status) {
    //   setIsLoggedIn(true)
    //   fetchSession();
    // } else {
    //   console.log("not Logged in ")
    // }

    checkUserLoggedIn().then(res => {
      console.log("inside success" + res)
      setIsLoggedIn(true)
      fetchSession();
    }).catch(err => {
      console.log("inside catch " + err)
    })


  }, []);

  const handleLogout = async () => {
    console.log("Inside Logout");
    try {
      console.log(account.get())
      const delSession = await account.deleteSession('current');
      console.log("Del" + delSession)
      router.push("/login")
    } catch (error) {
      console.log(error)
      router.push("/login")

    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md px-4 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="mb-4 text-3xl font-bold text-center">{isLoggedIn ? `Welcome: ${username}` : "Not logged in "}</h1>
        <h1 className="mb-4 text-3xl font-bold text-center">Email :{isLoggedIn ? `${email}` : " "}</h1>
        <p className="mb-4 text-center">{isLoggedIn ? (<button
          onClick={handleLogout}
          className="px-4 py-2 mx-auto mt-4 text-white bg-red-500 rounded hover:bg-red-600 focus:bg-red-600 focus:outline-none"
        > Logout</button>) : ""}</p>
      </div>
    </div>
  );

}

export default HomePage;

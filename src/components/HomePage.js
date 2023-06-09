"use client"
import { useEffect, useState } from 'react';
import { account } from '@/services/appwrite.config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const HomePage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [session, setUserSession] = useState({
        name: "",
        email: ""
    })


    const fetchSession = async () => {
        try {
            const userSession = await account.getSession('current');

            setUserSession({ ...userSession, name: userSession.userId, email: userSession.providerUid })
            setUsername(userSession.userId);
            setEmail(userSession.providerUid);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };



    useEffect(() => {
        const checkLoggedInStatus = async () => {
            const loggedIn = await account.get()
            if (loggedIn) {
                setIsLoggedIn(true);
                fetchSession();
            } else {
                console.log('User is not logged in');
            }
        };

        checkLoggedInStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            router.push('/login');
        } catch (error) {
            console.log(error);
            router.push('/login');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md px-4 py-8 bg-white shadow-lg rounded-lg">
                {isLoggedIn ? (
                    <>
                        <h1 className="mb-4 text-3xl font-bold text-center">Welcome: {session.name}</h1>
                        <h1 className="mb-4 text-3xl font-bold text-center">Email: {session.email}</h1>
                        <p className="mb-4 text-center">
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 mx-auto mt-4 text-white bg-red-500 rounded hover:bg-red-600 focus:bg-red-600 focus:outline-none" >
                                Logout</button>

                        </p>
                    </>
                ) : (
                    <div><h1 className="mb-4 text-3xl font-bold text-center">Please login</h1>
                        <Link className='text-center bg-blue-500 text-white py-2 px-4 rounded-lg' href={'login'}>Go To Login Page</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;

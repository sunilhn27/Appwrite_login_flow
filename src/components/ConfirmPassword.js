"use client"
import { account } from '@/services/appwrite.config';
import React, { useState ,useEffect} from 'react';
import { useRouter } from 'next/navigation';

const ConfirmPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter()
    const urlparams = new URLSearchParams(window.location.search)
    const userId = urlparams.get('userId')
    const secret = urlparams.get('secret')
    const [msg, setMsg] = useState('');


    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => {
                setMsg('');
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [msg]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        await account.updateRecovery(userId, secret, password, confirmPassword).then(function (res) {
            console.log(res)
            router.push('/login')
        }, function (err) {
            setMsg("Msg"+err)
            console.log(err)
        })

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow p-6 rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
                    >
                        Submit
                    </button>
                    {msg ? <p className='mt-5 text-red-500'>{msg}</p> : ""}

                </form>
            </div>
        </div>
    );
};

export default ConfirmPassword;

"use client"
import React, { useState, useEffect } from 'react';
import { account } from '@/services/appwrite.config';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
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
        setMsg("Reset Password mail is Sent to " + email)
        await account.createRecovery(email, "http://localhost:3000/resetpassword").then(function (res) {
            console.log("success")
        }, function (err) {
            console.log("Failed")
        })
        setEmail("")
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow p-6 rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
                    >
                        Reset Password
                    </button>
                    {msg ? <p className='mt-5 text-green-500 text-xs'>{msg}</p> : ""}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

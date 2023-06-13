import { useState } from 'react';
import { account } from '@/services/appwrite.config';
import { useRouter } from 'next/navigation';
import { ID } from "appwrite";


export default function Register() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const router = useRouter()

    const handleRegister = async (e) => {
        //console.log(user)
        e.preventDefault()
        try {
            const promise = await account.create(
                user.name,
                user.email,
                user.password,
                user.name,
            )
            router.push("/login")
        } catch (error) {
            console.log("inside catch " + error)
        }
        setUser("")

    }


    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  bg-black opacity-90 text-white">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold  text-white">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-8" onSubmit={handleRegister}>
                    <div className="rounded-md shadow-sm space-y-3">
                        <div>
                            <label htmlFor="name" className="">Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Your Name"
                                value={user.name || ""}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="">E-mail </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                value={user.email || ""}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={user.password || ""}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

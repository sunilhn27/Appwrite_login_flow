import { useState } from 'react';
import Link from 'next/link';
import { account } from '@/services/appwrite.config';
import { useRouter } from 'next/navigation';
export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("")

    const router = useRouter()



    const onSubmit = async (e) => {
        console.log("inside Onsubmit")
        e.preventDefault();
        try {
            const response = await account.createEmailSession(user.email, user.password);
            console.log("response", response);
            setUser("");
            router.push("/homepage");
        } catch (error) {
            console.log("Invalid Credentials");
            setError("Invalid Credentials")
            setUser("");
        }
    }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black opacity-90 text-white">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form className="w-full max-w-sm" onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block  text-sm font-bold mb-2 text-white">Email:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={user.email || ""}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block  text-sm font-bold mb-2 text-white">Password:</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={user.password || ""}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                {error !== null ? <div className='text-red-500 text-sm text-center'>{error}</div> : ""}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Login
                </button>
            </form>
            <Link href={'/reset'}>
                <p className="text-gray-500 text-sm mt-4 hover:text-white cursor-pointer" >Forgot password</p>
            </Link>
            <p className="text-gray-500 text-sm mt-4">
                Don't have an account?{' '}
                <Link href="/register">
                    <span className="text-blue-500 hover:text-blue-700">Register</span>
                </Link>
            </p>
        </div>
    );


}


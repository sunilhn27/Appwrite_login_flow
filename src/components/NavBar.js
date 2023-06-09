import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../../public/Images/logo.png'

function NavBar() {



    return (
        <div>
            <nav className='flex justify-between mx-28 py-7'>
                {/* Logo */}
                <div className='flex items-center'>
                    <Link href={"/"}>
                        <Image className='h-16 w-16' src={logo} alt='logo' />
                    </Link>
                </div>
                {/* Links */}
                <div className='hidden md:flex flex-row gap-8 text-xl  items-center'>
                    <div>
                        <Link className="hover:text-orange-600" href={'/'} >Home</Link>
                    </div>
                    <div>
                        <Link className="hover:text-orange-600" href={'/dashboard'} >Dashboard</Link>
                    </div>
                    <div>
                        <Link className="hover:text-orange-600" href={'/about'} >About</Link>
                    </div>
                    <div>
                        <Link className='peer relative' href={'/career'} >Career</Link>
                        <div className='hidden peer-hover:flex hover:flex absolute bg-slate-50 rounded-xl px-3 py-4 flex-col space-y-2'>
                            <Link className="hover:text-orange-600" href={'/'} >Privacy Policy</Link>
                            <Link className="hover:text-orange-600" href={'/'} >Terms</Link>
                            <Link className="hover:text-orange-600" href={'/'} >About</Link>
                        </div>
                    </div>
                </div>

            </nav>

        </div>
    )
}

export default NavBar
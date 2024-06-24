import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="px-4 lg:px-6 h-14 flex items-center bg-primary text-primary-foreground bg-blue-900">
                <a className="flex items-center justify-center" href="/">
                    <img src="https://res.cloudinary.com/dxc3qadsk/image/upload/v1719073675/curoc-removebg-preview_f5xnoe.png" alt="logo unah" className="w-11 h-11" />
                    <span className="text-lg font-bold text-white ml-2">UNAH CUROC</span>
                </a>
                <nav className="ml-auto hidden md:flex gap-4 text-white">
                    <a href="/" className="text-sm hover:underline">Inicio</a>
                    <a href="/About" className="text-sm hover:underline">Acerca de</a>
                    <a href="/login" className="text-sm hover:underline">Acceso</a>
                </nav>
                <button 
                    className="ml-auto md:hidden text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </header>
            {isMenuOpen && (
                <nav className="bg-blue-900 md:hidden">
                    <a href="/" className="block px-4 py-2 text-sm text-white hover:underline">Inicio</a>
                    <a href="/About" className="block px-4 py-2 text-sm text-white hover:underline">Acerca de</a>
                    <a href="/login" className="block px-4 py-2 text-sm text-white hover:underline">Login</a>
                </nav>
            )}
        </>
    )
}

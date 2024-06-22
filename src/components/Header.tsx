export default function Header() {
    return (
        <>
            <header className="px-4 lg:px-6 h-14 flex items-center bg-primary text-primary-foreground bg-blue-600">
                <a className="flex items-center justify-center" href="#">
                    <img src="https://res.cloudinary.com/dxc3qadsk/image/upload/v1719073675/curoc-removebg-preview_f5xnoe.png" alt="logo unah" className="w-11 h-11" />
                    <span className="text-lg font-bold text-white">UNAH CUROC</span>
                </a>
                <nav className="ml-auto flex gap-4 text-white">
                    <a href="/" className="text-sm hover:underline">Inicio</a>
                    <a href="/About" className="text-sm hover:underline">Acerca de</a>
                    <a href="/login" className="text-sm hover:underline">Login</a>
                 
                </nav>
            </header>
        </>
    )
}
export default function Footer() {
    return (
        <>
            <footer className="flex flex-col text-black gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-black">
                <p className="text-base text-center sm:text-left">© 2024 TOPICOS ESPECIALES Y AVANZADOS. Todos los derechos reservados.</p>
                <nav className="sm:ml-auto flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 mb-4">
                    <a className="text-base hover:underline underline-offset-4" href="#">Términos de Servicio</a>
                    <a className="text-base hover:underline underline-offset-4" href="#">Privacidad</a>
                </nav>
            </footer>
            <div className="block md:flex justify-center gap-4 items-center">
                <img src="https://dircom.unah.edu.hn/dmsdocument/7519-unah-curoc-horz-azul-png" alt="" className="h-40 mx-auto md:mx-0" />
                <img src="https://curoc.unah.edu.hn/assets/CUROC/paginas/nuevo-pagina/_resampled/ResizedImageWzYwMCw2MDBd/logos-UNAH-11.png" alt="" className="h-40 mx-auto md:mx-0" />
            </div>
        </>
    )
}

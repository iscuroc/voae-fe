
import logoCOPAN from '@/assets/logo.avif';
import logoIS from '@/assets/logoIS.avif';
import logoVOAE from '@/assets/logo2.avif';

export default function Footer() {
    return (
        <>
            <footer className="flex flex-col text-black gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-black">
                <p className="text-sm md:text-base text-center sm:text-left">© 2024 Ingeniería en Sistemas UNAH-COPAN. Todos los derechos reservados.</p>

            </footer>
            <div className="block md:flex justify-center gap-4 items-center">
                <div className='flex md:flex'>
                    <img src={logoCOPAN} alt="logo UNAH Campus Copan" className="h-20 md:h-40 mx-auto md:mx-0" />
                    <img src={logoIS} alt="logo Ingeneria en sistemas" className="h-20 md:h-40 mx-auto md:mx-0" />

                </div>
                <div className='flex justify-center gap-4 items-center'>
                    <img src={logoVOAE} alt="logo VOAE" className="h-20 md:h-40 mx-auto md:mx-0" />

                </div>
            </div>
        </>
    )
}

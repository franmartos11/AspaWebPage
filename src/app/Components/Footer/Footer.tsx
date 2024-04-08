export default function () {
    return (
        <div className="relative mt-20  px-4 pt-20">
            <hr className="h-px mb-[5rem] mt-[-5.5rem] bg-gray-200  dark:bg-gray-700"></hr>
            <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-black p-1">
                <img
                    className="h-full object-contain"
                    src="/aspaLogo.webp"
                    alt="aspa logo"
                />
            </div>
            <nav
                aria-label="Footer Navigation"
                className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center justify-center sm:flex-row sm:text-left"
            >
                <a href="/" className="font-medium text-white">
                    Inicio
                </a>
                <a href="/servicios" className="font-medium text-white">
                    Servicios
                </a>
                <a href="/about-me" className="font-medium text-white">
                    Nosotros
                </a>
                <a href="/contact" className="font-medium text-white">
                    Contacto
                </a>
            </nav>
            <p className="py-10 text-center text-gray-300">
                © 2024 Aspa Software | All Rights Reserved
            </p>
        </div>
    );
}

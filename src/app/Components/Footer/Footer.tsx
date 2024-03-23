export default function () {
    return (
        <footer className="relative mt-20 bg-black px-4 pt-20">
            <hr className="h-px mb-[5rem] mt-[-5.5rem] bg-gray-200  dark:bg-gray-700"></hr>
            <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-black p-1">
                <img
                    className="h-full object-contain"
                    src="https://lh3.googleusercontent.com/p/AF1QipOArs2fh8wX0a6dnEvIAMZv3DJrx006D9qzB4E=s680-w680-h510"
                    alt=""
                />
            </div>
            <nav
                aria-label="Footer Navigation"
                className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left"
            >
                <a href="#" className="font-medium text-white">
                    Demo
                </a>
                <a href="#" className="font-medium text-white">
                    Support
                </a>
                <a href="#" className="font-medium text-white">
                    Privacy Policy
                </a>
                <a href="#" className="font-medium text-white">
                    Terms & Conditions
                </a>
            </nav>
            <p className="py-10 text-center text-gray-300">
                © 2024 Aspa Software | All Rights Reserved
            </p>
        </footer>
    );
}

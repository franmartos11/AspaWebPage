"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav({ page }: { page: string }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    return (
        <nav className="pb-[6rem]" id="top-page">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link
                    href="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        className="h-[5rem]"
                        src="/aspafulllogo.webp"
                        alt="Logo"
                    />
                </Link>
                <button
                    onClick={toggleMenu}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                    aria-expanded={isMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className={`${
                        isMenuOpen ? "block" : "hidden"
                    } w-full md:block md:w-auto mt-4 md:mt-0`}
                >
                    <ul className="flex flex-col text-white font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <Link
                                onClick={toggleMenu}
                                href="/"
                                className={`block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700  md:dark:hover:text-blue-500 dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${
                                    page === "home"
                                        ? " text-blue-700"
                                        : "text-white"
                                }`}
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={toggleDropdown}
                                id="dropdownNavbarLink"
                                data-dropdown-toggle="dropdownNavbar"
                                className={`flex items-center justify-between w-full py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto  md:dark:hover:text-blue-500  dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent ${
                                    page === "servicios"
                                        ? " text-blue-700"
                                        : "text-white"
                                }`}
                            >
                                Servicios{" "}
                                <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>

                            {dropdown && (
                                <div className="absolute flex align-middle justify-center flex-col border  border-blue-700 p-2 rounded-md mt-2">
                                    <Link
                                        href="/servicios"
                                        className="hover:text-blue-700 pt-[0.5rem]"
                                    >
                                        Todos los servicios
                                    </Link>
                                    <Link
                                        href="/desarrollo-web"
                                        className="hover:text-blue-700 pt-[0.5rem]"
                                    >
                                        Desarrollo Web
                                    </Link>
                                    <Link
                                        href="/apps-a-medida"
                                        className="hover:text-blue-700 pt-[0.5rem]"
                                    >
                                        Apps a medida
                                    </Link>
                                    <Link
                                        href="/carcheck"
                                        className="hover:text-blue-700 pt-[0.5rem]"
                                    >
                                        Carcheck
                                    </Link>
                                </div>
                            )}
                        </li>
                        <li>
                            <Link
                                onClick={toggleMenu}
                                href="/nosotros"
                                className={`block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700  md:dark:hover:text-blue-500 dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${
                                    page === "nosotros"
                                        ? " text-blue-700"
                                        : "text-white"
                                }`}
                            >
                                Nosotros
                            </Link>
                        </li>

                        <li>
                            <Link
                                onClick={toggleMenu}
                                href="/contact"
                                className={`block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700  md:dark:hover:text-blue-500 dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${
                                    page === "contacto"
                                        ? " text-blue-700"
                                        : "text-white"
                                }`}
                            >
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

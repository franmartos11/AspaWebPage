"use client";
import React from "react";
import { useLanguage } from "../AALenguageContext/LenguageContext";

type FormProps = {
    service: string;
};

const content = {
    es: {
        title: "Contáctanos",
        description:
            "¡Haznos saber cómo podemos ayudarte! Completa el formulario de contacto y estaremos encantados de responder a tus preguntas, discutir colaboraciones o simplemente charlar sobre tus ideas.",
        labels: {
            email: "Email",
            phone: "Teléfono",
            message: "Mensaje",
            placeholderEmail: "nombre@gmail.com",
            placeholderPhone: "Número de teléfono...",
            placeholderMessage: "Deja tu mensaje...",
        },
        button: "Enviar Mensaje",
    },
    en: {
        title: "Contact Us",
        description:
            "Let us know how we can help you! Fill out the contact form, and we'll be happy to answer your questions, discuss collaborations, or simply chat about your ideas.",
        labels: {
            email: "Email",
            phone: "Phone",
            message: "Message",
            placeholderEmail: "name@gmail.com",
            placeholderPhone: "Phone number...",
            placeholderMessage: "Leave your message...",
        },
        button: "Send Message",
    },
};

export default function Form({ service }: FormProps) {
    const { language } = useLanguage("es");
    const langContent = content[language];

    return (
        <section id="form" className="py-[3rem]">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">
                    {langContent.title}
                </h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-400 sm:text-xl">
                    {langContent.description}
                </p>
                <form
                    action="https://formsubmit.co/74c5c743d951c678ce020a82cc431fa4"
                    method="POST"
                    className="space-y-8"
                >
                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">
                            {langContent.labels.email}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="shadow-sm border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
                            placeholder={langContent.labels.placeholderEmail}
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">
                            {langContent.labels.phone}
                        </label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            className="block p-3 w-full text-sm rounded-lg border shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
                            placeholder={langContent.labels.placeholderPhone}
                            required
                        />
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-300">
                            {langContent.labels.message}
                        </label>
                        <textarea
                            id="message"
                            name="mensaje"
                            className="block p-6 w-full text-sm rounded-lg shadow-sm border focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                            placeholder={langContent.labels.placeholderMessage}
                            required
                        ></textarea>
                    </div>

                    {/* Hidden Field for Service */}
                    <input type="hidden" name="service" value={service} />

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="py-3 px-9 text-sm font-medium text-center text-white rounded-lg bg-blue-500 sm:w-fit hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-primary-300"
                        >
                            {langContent.button}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

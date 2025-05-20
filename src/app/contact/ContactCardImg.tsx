"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../Components/AALenguageContext/LenguageContext";

type Status = "idle" | "success";

type ContactTexts = {
  title: string;
  paragraph: string;
  form: {
    a: string;
    b: string;
    c: string;
    d: string;
    button: string;
    e: string;
  };
};

const textsMap: Record<string, ContactTexts> = {
  es: {
    title: "Contáctanos",
    paragraph:
      "¡Haznos saber cómo podemos ayudarte! Completa el formulario de contacto y estaremos encantados de responder a tus preguntas, discutir colaboraciones o simplemente charlar sobre tus ideas.",
    form: {
      a: "Nombre Completo",
      b: "Dirección Email",
      c: "Número Teléfono",
      d: "Mensaje",
      button: "Enviar",
      e: "Síguenos",
    },
  },
  en: {
    title: "Contact Us",
    paragraph:
      "Let us know how we can help you! Fill out the contact form and we will be happy to answer your questions, discuss collaborations, or just chat about your ideas.",
    form: {
      a: "Full Name",
      b: "Email Address",
      c: "Phone Number",
      d: "Message",
      button: "Send",
      e: "Follow Us",
    },
  },
};

export default function ContactCardImg() {
  const { language } = useLanguage("es");
  const texts = textsMap[language];

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const pn = formData.get("pn")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";
    const subject = texts.title;

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, pn, subject, message }),
      });
      const data = await res.json();
      console.log("API response:", res.status, data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setStatus("success");
      form.reset();
    }
  };

  return (
    <section className="min-h-screen pt-[5rem] bg-black">
      <div className="container px-6 mx-auto">
        <div className="lg:flex lg:items-center lg:-mx-10">
          {/* Left Column */}
          <div className="lg:w-1/2 lg:mx-10">
            <h1 className="text-3xl font-semibold capitalize text-white lg:text-5xl">
              {texts.title}
            </h1>
            <p className="mt-4 text-gray-400">{texts.paragraph}</p>

            <form onSubmit={handleSubmit} className="mt-12 space-y-4">
              <div className="md:flex md:items-center md:-mx-2">
                <div className="flex-1 px-2">
                  <label className="block mb-2 text-sm text-gray-200">
                    {texts.form.a}
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-black text-gray-300 border-white focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                  />
                </div>
                <div className="flex-1 px-2 mt-4 md:mt-0">
                  <label className="block mb-2 text-sm text-gray-200">
                    {texts.form.b}
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-black text-gray-300 border-white focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                  />
                </div>
                <div className="flex-1 px-2 mt-4 md:mt-0">
                  <label className="block mb-2 text-sm text-gray-200">
                    {texts.form.c}
                  </label>
                  <input
                    name="pn"
                    type="tel"
                    className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-black text-gray-300 border-white focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm text-gray-200">
                  {texts.form.d}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-black text-gray-300 border-white focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-md bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50"
                >
                  {loading ? "Enviando..." : texts.form.button}
                </button>
              </div>

              {/* Always show success message */}
              {status === "success" && (
                <p className="text-center text-green-400">¡Mensaje enviado!</p>
              )}
            </form>
          </div>

          {/* Right Column */}
          <div className="mt-12 pt-[3rem] lg:mt-0 lg:flex lg:flex-col lg:items-center lg:w-1/2 lg:mx-10">
            <Image
              src="/aspaLogo.webp"
              alt="aspa logo"
              title="aspa logo"
              width={612}
              height={612}
              className="hidden object-cover mx-auto rounded-full lg:block w-96 h-96"
            />
            {/* Contact Info & Social Links omitted for brevity */}
          </div>
        </div>
      </div>
    </section>
  );
}

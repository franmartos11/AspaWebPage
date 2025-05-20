// src/components/Form.tsx
"use client";
import React, { useState } from "react";
import { useLanguage } from "../AALenguageContext/LenguageContext";

type FormProps = {
  service: string;
};

type Errors = {
  name?: string;
  email?: string;
  pn?: string;
  message?: string;
};

const content = {
  es: {
    title: "Contáctanos",
    description:
      "¡Haznos saber cómo podemos ayudarte! Completa el formulario de contacto y estaremos encantados de responder a tus preguntas, discutir colaboraciones o simplemente charlar sobre tus ideas.",
    labels: {
      name: "Nombre",
      placeholderName: "Tu nombre",
      email: "Email",
      placeholderEmail: "nombre@gmail.com",
      phone: "Teléfono",
      placeholderPhone: "Número de teléfono...",
      message: "Mensaje",
      placeholderMessage: "Deja tu mensaje...",
      button: "Enviar Mensaje",
    },
  },
  en: {
    title: "Contact Us",
    description:
      "Let us know how we can help you! Fill out the contact form, and we'll be happy to answer your questions, discuss collaborations, or simply chat about your ideas.",
    labels: {
      name: "Name",
      placeholderName: "Your name",
      email: "Email",
      placeholderEmail: "name@gmail.com",
      phone: "Phone",
      placeholderPhone: "Phone number...",
      message: "Message",
      placeholderMessage: "Leave your message...",
      button: "Send Message",
    },
  },
};

export default function Form({ service }: FormProps) {
  const { language } = useLanguage("es");
  const lang = content[language];
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const pn = formData.get("pn")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";
    const subject = formData.get("subject")?.toString() || service;

    // Validaciones
    const newErrors: Errors = {};
    if (name.length < 2) newErrors.name = "El nombre debe tener al menos 2 caracteres";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) newErrors.email = "Email inválido";
    const phoneRegex = /^[0-9]{7,}$/;
    if (!phoneRegex.test(pn)) newErrors.pn = "Teléfono inválido (mínimo 7 dígitos)";
    if (message.length < 10) newErrors.message = "El mensaje debe tener al menos 10 caracteres";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, pn, subject, message }),
      });
      const data = await res.json();
      console.log("API response:", res.status, data);

      if (data.success) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="form" className="py-[3rem] bg-black">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md text-white">
        <h2 className="mb-4 text-4xl font-extrabold text-center">{lang.title}</h2>
        <p className="mb-8 font-light text-center text-gray-400 sm:text-xl">
          {lang.description}
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              {lang.labels.name}
            </label>
            <input
              type="text"
              name="name"
              onChange={() => errors.name && setErrors((p) => ({ ...p, name: undefined }))}
              className="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              placeholder={lang.labels.placeholderName}
              required
            />
            {errors.name && <p className="mt-1 text-red-400 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              {lang.labels.email}
            </label>
            <input
              type="email"
              name="email"
              onChange={() => errors.email && setErrors((p) => ({ ...p, email: undefined }))}
              className="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              placeholder={lang.labels.placeholderEmail}
              required
            />
            {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              {lang.labels.phone}
            </label>
            <input
              type="tel"
              name="pn"
              onChange={() => errors.pn && setErrors((p) => ({ ...p, pn: undefined }))}
              className="block p-3 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              placeholder={lang.labels.placeholderPhone}
              required
            />
            {errors.pn && <p className="mt-1 text-red-400 text-sm">{errors.pn}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              {lang.labels.message}
            </label>
            <textarea
              name="message"
              onChange={() => errors.message && setErrors((p) => ({ ...p, message: undefined }))}
              className="block p-6 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              placeholder={lang.labels.placeholderMessage}
              required
            />
            {errors.message && (
              <p className="mt-1 text-red-400 text-sm">{errors.message}</p>
            )}
          </div>

          {/* Hidden Subject */}
          <input type="hidden" name="subject" value={service} />

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="py-3 px-9 text-sm font-medium text-white rounded-lg bg-blue-500 sm:w-fit hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-primary-300 disabled:opacity-50"
            >
              {loading ? "Enviando..." : lang.labels.button}
            </button>
          </div>

          {/* Feedback */}
          {status === "success" && (
            <p className="text-center text-green-400">¡Mensaje enviado!</p>
          )}
          {status === "error" && (
            <p className="text-center text-red-400">Ocurrió un error. Intenta nuevamente.</p>
          )}
        </form>
      </div>
    </section>
  );
}

"use client";
import Image, { ImageProps } from "next/image";
import React, { useEffect } from "react";
import { useRef, useState, createContext, useContext } from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../AALenguageContext/LenguageContext";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

const texts = {
  es: {
    clientes: {
      title: "Clientes",
      category: "Clientes",
      content1: "Gestión completa de clientes al alcance de tu mano.",
      content2:
        "Puedes visualizar la lista de todos tus clientes, realizar búsquedas y acceder a su información detallada con un solo clic. Además, podrás llamarlos directamente o iniciar una conversación desde aquí.",
      content3:
        "Consulta toda la información de tus clientes en un solo lugar.",
      content4:
        "Accede fácilmente a sus datos personales, vehículos registrados y turnos asignados. Además, puedes gestionar su historial, agregar nuevos registros o comunicarte directamente desde esta sección.",
      content5: "Consulta el historial completo de cada vehículo en el taller.",
      content6:
        "Desde esta sección, puedes acceder a los presupuestos generados y las veces que el vehículo ingresó al taller para alistajes. Mantén un registro organizado con fechas, detalles asociados, y acciones rápidas para agregar nuevos registros o visualizar la información completa.",
    },
    vehiculos: {
      title: "Vehículos",
      category: "Productividad",
      content1:
        "Administra todos los vehículos registrados en tu taller de forma sencilla.",
      content2:
        "Puedes buscar rápidamente por matrícula, modelo o marca, y acceder a la información completa de cada vehículo. Agrega nuevos registros o actualiza los existentes con solo un clic, manteniendo todo organizado y al día.",
      content3:
        "Consulta toda la información detallada de cada vehículo registrado en el taller.",
      content4:
        "Podrás visualizar datos clave como la patente, marca, modelo, color y cliente asociado. Además, accede al historial completo de alistajes realizados, con fechas y detalles específicos. Gestiona de forma eficiente la información del vehículo y mantén un registro organizado de su historial en el taller.",
    },
    alistajes: {
      title: "Alistajes",
      category: "Operaciones",
      content1: "Administra el estado de tu taller de forma sencilla.",
      content2:
        "Optimiza la gestión de tu taller con nuestro módulo de Alistaje y Estado del Taller, diseñado para ofrecer una visión en tiempo real de cada vehículo en proceso. Desde el momento en que ingresa hasta su entrega final, podrás conocer el estado exacto de cada auto de manera rápida y sencilla.",
      content3: "Funcionalidades:",
      features: [
        {
          title: "Seguimiento en tiempo real",
          description:
            "Consulta el estado del vehículo en cada fase del proceso.",
        },
        {
          title: "Actualización rápida de estados",
          description:
            "Cambia el estado con un solo clic y notifica al equipo.",
        },
        {
          title: "Historial completo de alistajes",
          description:
            "Revisa cada intervención con fechas y detalles específicos.",
        },
        {
          title: "Gestión de órdenes de trabajo",
          description:
            "Accede a registros previos y añade nuevas solicitudes en cualquier momento.",
        },
        {
          title: "Registro de imprevistos",
          description:
            "Agrega notas y detalles sobre nuevos arreglos o situaciones imprevistas.",
        },
        {
          title: "Gestión de repuestos y materiales",
          description:
            "Registra fácilmente repuestos adicionales requeridos para cada servicio.",
        },
      ],
    },
    presupuestos: {
      title: "Presupuestos",
      category: "Finanzas",
      content1: "Presupuestos Inteligentes y Automatización de Servicios.",
      content2:
        "Optimiza la gestión de presupuestos en tu taller con un sistema ágil y automatizado. Este módulo te permite generar y administrar presupuestos de manera eficiente, asegurando un proceso fluido desde la cotización hasta la aprobación del servicio.",
      content3: "Plantillas Personalizadas",
      content4:
        "Guarda plantillas predefinidas para servicios recurrentes, como mantenimientos y cambios de piezas, permitiendo aplicar presupuestos en segundos con todos los repuestos y tareas preconfiguradas.",
      content5: "Gestiona tus presupuestos",
      content6:
        "Crea y edita presupuestos antes de su aprobación, ajustando cada detalle según las necesidades del cliente. Manteniendo un registro completo de todas las cotizaciones realizadas, con detalles y modificaciones accesibles en cualquier momento. Una vez aprobado el presupuesto, los servicios y repuestos se asignan directamente al auto, evitando cargas manuales y reduciendo errores.",
    },
    turnos: {
      title: "Appointments",
      category: "Planning",
      content1: "Appointment Management.",
      content2:
        "Facilita la asignación y administración de turnos con un sistema eficiente que optimiza la planificación del taller. Este módulo te permite visualizar, gestionar y organizar turnos de manera clara y estructurada, asegurando una mejor distribución del trabajo y evitando demoras innecesarias.",
      content3: "Lista de Turnos",
      content4:
        "Visualiza los turnos en una lista organizada según su estado (pendiente, en proceso, finalizado), facilitando el seguimiento y gestión de cada cita. Y accede a los datos clave de cada cita, incluyendo el vehículo, cliente, fecha y tipo de servicio solicitado. ",
      content5: "Calendario de Turnos",
      content6:
        "Consulta y organiza los turnos de manera visual, permitiendo una distribución eficiente de los tiempos y recursos del taller.Mantén una planificación eficiente, mejora la atención al cliente y optimiza el rendimiento de tu taller.",
    },
    servicios: {
      title: "Servicios",
      category: "Operaciones",
      content1: "Gestión de Servicios",
      content2:
        "Optimiza la administración de servicios en tu taller con un módulo diseñado para facilitar la gestión, registro y actualización de cada trabajo realizado. Agiliza el proceso al permitir la asignación de repuestos, ajustes de precios y control detallado de cada servicio.",
      content3: "Funcionalidades:",
      features: [
        {
          title: "Registro de servicios",
          description:
            "Administra y documenta cada servicio realizado en el taller.",
        },
        {
          title: "Asignación de repuestos",
          description:
            "Vincula repuestos y materiales a cada servicio de manera sencilla.",
        },
        {
          title: "Control de costos",
          description:
            "Ajusta y actualiza los precios de cada servicio en tiempo real.",
        },
        {
          title: "Historial de servicios",
          description:
            "Consulta el historial completo de servicios realizados por vehículo o cliente.",
        },
        {
          title: "Notificaciones automáticas",
          description:
            "Informa a los clientes sobre el estado de sus servicios en curso.",
        },
        {
          title: "Gestión de tiempos",
          description:
            "Optimiza la asignación de recursos para reducir tiempos de espera.",
        },
      ],
    },

    stock: {
      title: "Stock",
      category: "Inventario",
      content1: "Control total sobre el stock y proveedores.",
      content2:
        "Mantén un control total sobre tu inventario con un sistema de gestión de stock eficiente y organizado. Este módulo te permite administrar los productos, actualizar precios y gestionar pedidos de reposición a proveedores de manera sencilla y rápida.",
      content3: "Gestión de Stock",
      features: [
        {
          title: "Registro de servicios",
          description:
            "Añade y gestiona los servicios realizados en cada vehículo.",
        },
        {
          title: "Asignación de repuestos",
          description:
            "Vincula repuestos y materiales a cada servicio de manera eficiente.",
        },
        {
          title: "Historial de servicios",
          description:
            "Consulta los servicios previos realizados en cada vehículo.",
        },
        {
          title: "Ajustes de precios",
          description:
            "Modifica y actualiza los precios de los servicios de forma sencilla.",
        },
        {
          title: "Notificaciones y alertas",
          description:
            "Recibe notificaciones cuando un servicio esté listo o requiera atención especial.",
        },
      ],
      content4: "Proveedores",
      features2: [
        {
          title: "Registro y administración de proveedores",
          description:
            "Guarda información clave de cada proveedor para facilitar la comunicación y gestión de pedidos.",
        },
        {
          title: "Seguimiento de pedidos",
          description:
            "Consulta qué productos han sido solicitados, a qué proveedor y en qué estado se encuentran.",
        },
        {
          title: "Historial de abastecimiento",
          description:
            "Mantén un registro detallado de cada pedido realizado, asegurando un control eficiente del suministro.",
        },
        {
          title: "Facilidad de contacto con proveedores",
          description:
            "Accede rápidamente a los datos del proveedor para coordinar entregas y realizar nuevas solicitudes.",
        },
      ],
    },
  },
  en: {
    clientes: {
      title: "Clients",
      category: "Clients",
      content1: "Complete customer management at your fingertips.",
      content2:
        "You can view the list of all your clients, perform searches, and access their detailed information with a single click. Additionally, you can call them directly or start a conversation from here.",
      content3: "View all your clients' information in one place.",
      content4:
        "Easily access their personal data, registered vehicles, and assigned appointments. Additionally, you can manage their history, add new records, or communicate directly from this section.",
      content5: "Check the complete history of each vehicle in the workshop.",
      content6:
        "From this section, you can access the generated estimates and the times the vehicle entered the workshop for check-ins. Keep an organized record with dates, associated details, and quick actions to add new records or view the complete information.",
    },
    vehiculos: {
      title: "Vehicles",
      category: "Productivity",
      content1: "Manage all vehicles registered in your workshop easily.",
      content2:
        "You can quickly search by license plate, model, or brand and access the complete information of each vehicle. Add new records or update existing ones with a single click, keeping everything organized and up to date.",
      content3:
        "Check all the detailed information of each registered vehicle in the workshop.",
      content4:
        "You will be able to view key data such as license plate, brand, model, color, and associated client. Additionally, access the complete history of performed check-ins, including dates and specific details. Efficiently manage vehicle information and maintain an organized record of its history in the workshop.",
    },
    alistajes: {
      title: "Check-ins",
      category: "Operations",
      content1: "Easily manage the status of your workshop.",
      content2:
        "Optimize your workshop management with our Check-in and Workshop Status module, designed to provide real-time visibility of each vehicle in process. From the moment it enters until its final delivery, you can quickly and easily know the exact status of each car.",
      content3: "Features:",
      features: [
        {
          title: "Real-time tracking",
          description:
            "Check the vehicle’s status at each stage of the process.",
        },
        {
          title: "Quick status updates",
          description:
            "Change the status with a single click and notify the team.",
        },
        {
          title: "Complete check-in history",
          description:
            "Review each intervention with dates and specific details.",
        },
        {
          title: "Work order management",
          description:
            "Access previous records and add new requests at any time.",
        },
        {
          title: "Incident logging",
          description:
            "Add notes and details about new repairs or unforeseen situations.",
        },
        {
          title: "Spare parts and materials management",
          description:
            "Easily register additional spare parts required for each service.",
        },
      ],
    },
    presupuestos: {
      title: "Estimates",
      category: "Finance",
      content1: "Smart Estimates and Service Automation.",
      content2:
        "Optimize estimate management in your workshop with an agile and automated system. This module allows you to efficiently generate and manage estimates, ensuring a smooth process from quotation to service approval.",
      content3: "Customized Templates",
      content4:
        "Save predefined templates for recurring services, such as maintenance and part replacements, allowing you to apply estimates in seconds with all preconfigured parts and tasks.",
      content5: "Manage Your Estimates",
      content6:
        "Create and edit estimates before approval, adjusting every detail according to the client's needs. Maintain a complete record of all quotations made, with accessible details and modifications at any time. Once the estimate is approved, the services and parts are directly assigned to the vehicle, avoiding manual entries and reducing errors.",
    },

    turnos: {
      title: "Appointments",
      category: "Planning",
      content1: "Appointment Management.",
      content2:
        "Facilitates the assignment and management of appointments with an efficient system that optimizes workshop planning. This module allows you to visualize, manage, and organize appointments clearly and structurally, ensuring a better distribution of work and avoiding unnecessary delays.",
      content3: "Appointment List",
      content4:
        "View appointments in an organized list according to their status (pending, in progress, completed), making it easier to track and manage each appointment. Access key details of each appointment, including the vehicle, client, date, and type of requested service.",
      content5: "Appointment Calendar",
      content6:
        "Check and organize appointments visually, allowing for an efficient distribution of time and workshop resources. Maintain efficient planning, improve customer service, and optimize your workshop’s performance.",
    },
    servicios: {
      title: "Services",
      category: "Operations",
      content1: "Service Management",
      content2:
        "Optimize the management of services in your workshop with a module designed to facilitate the administration, registration, and updating of each completed job. Streamline the process by enabling the assignment of spare parts, price adjustments, and detailed control of each service.",
      content3: "Features:",
      features: [
        {
          title: "Service Registration",
          description:
            "Manage and document every service performed in the workshop.",
        },
        {
          title: "Spare Parts Assignment",
          description: "Easily link spare parts and materials to each service.",
        },
        {
          title: "Cost Control",
          description: "Adjust and update service prices in real time.",
        },
        {
          title: "Service History",
          description:
            "Access the complete history of services performed by vehicle or customer.",
        },
        {
          title: "Automatic Notifications",
          description:
            "Notify customers about the status of their ongoing services.",
        },
        {
          title: "Time Management",
          description: "Optimize resource allocation to reduce wait times.",
        },
      ],
    },

    stock: {
      title: "Stock",
      category: "Inventory",
      content1: "Full control over stock and suppliers.",
      content2:
        "Maintain complete control over your inventory with an efficient and organized stock management system. This module allows you to manage products, update prices, and handle restocking orders from suppliers quickly and easily.",
      content3: "Stock Management",
      features: [
        {
          title: "Service Registration",
          description: "Add and manage services performed on each vehicle.",
        },
        {
          title: "Spare Parts Assignment",
          description:
            "Efficiently link spare parts and materials to each service.",
        },
        {
          title: "Service History",
          description: "Check previous services performed on each vehicle.",
        },
        {
          title: "Price Adjustments",
          description: "Modify and update service prices easily.",
        },
        {
          title: "Notifications and Alerts",
          description:
            "Receive notifications when a service is ready or requires special attention.",
        },
      ],
      content4: "Suppliers",
      features2: [
        {
          title: "Supplier Registration and Management",
          description:
            "Store key information about each supplier to facilitate communication and order management.",
        },
        {
          title: "Order Tracking",
          description:
            "Check which products have been ordered, from which supplier, and their current status.",
        },
        {
          title: "Supply History",
          description:
            "Keep a detailed record of every order placed, ensuring efficient supply control.",
        },
        {
          title: "Easy Supplier Contact",
          description:
            "Quickly access supplier details to coordinate deliveries and place new requests.",
        },
      ],
    },
  },
};

const ContentCliente = () => {
  const { language, setLanguage } = useLanguage("es");
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200 ">
            {texts[language].clientes.content1}
          </span>{" "}
          <br />
          {texts[language].clientes.content2}
        </p>
        <Image
          src="/carcheckClientes.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            {texts[language].clientes.content3}
          </span>{" "}
          <br />
          {texts[language].clientes.content4}
        </p>

        <Image
          src="/carcheckCliente2.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            {texts[language].clientes.content5}
          </span>{" "}
          <br />
          {texts[language].clientes.content6}
        </p>
        <Image
          src="/carcheckClientes3.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
    </>
  );
};

const ContentVehiculos = () => {
  const { language, setLanguage } = useLanguage("es");
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200 ">
            {texts[language].vehiculos.content1}
          </span>{" "}
          <br />
          {texts[language].vehiculos.content2}
        </p>
        <Image
          src="/carcheckCars2.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
        <Image
          src="/carcheckCars.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            {texts[language].vehiculos.content3}
          </span>{" "}
          <br />
          {texts[language].vehiculos.content4}
        </p>
        <Image
          src="/carcheckCar3.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
        <Image
          src="/carcheckCar4.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
    </>
  );
};
const ContentAlistajes = () => {
  const { language, setLanguage } = useLanguage("es");
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200 pb-[2rem] ">
            {texts[language].alistajes.content1}
          </span>{" "}
          <br />
          {texts[language].alistajes.content2}
        </p>
        <Image
          src="/tallerEstado.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Funcionalidades:
          </span>{" "}
          <br />
        </p>

        <ul className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl font-sans max-w-3xl mx-auto mt-4 space-y-2">
          {texts[language].alistajes.features.map((feature, index) => (
            <li key={index}>
              ✅{" "}
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                {feature.title}:
              </span>{" "}
              {feature.description}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
const ContentPresupuestos = () => {
  const { language, setLanguage } = useLanguage("es");
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200 ">
            {texts[language].presupuestos.content1}
          </span>{" "}
          <br />
          {texts[language].presupuestos.content2}
        </p>
        <Image
          src="/presupuestos1.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            {texts[language].presupuestos.content3}
          </span>{" "}
          <br />
          {texts[language].presupuestos.content4}
        </p>
        <Image
          src="/presupuestosPlantillaService.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            {texts[language].presupuestos.content5}
          </span>{" "}
          <br />
          {texts[language].presupuestos.content6}
        </p>
        <Image
          src="/Presupuestos.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
        <Image
          src="/Presupuestos2.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
        <Image
          src="/Presupuesto3.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
    </>
  );
};
const ContentTurnos = () => {
  const { language, setLanguage } = useLanguage("es");
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200 ">
            {texts[language].turnos.content1}
          </span>{" "}
          <br />
          {texts[language].turnos.content2}
        </p>
        <Image
          src="/turnosMenu.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            {texts[language].turnos.content3}
          </span>{" "}
          <br />
          {texts[language].turnos.content4}
        </p>
        <Image
          src="/carcheckAlistaje2.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            {texts[language].turnos.content5}
          </span>{" "}
          <br />
          {texts[language].turnos.content6}
        </p>
        <Image
          src="/CalendarioTurnos.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
    </>
  );
};
const ContentServicios = () => {
  const { language, setLanguage } = useLanguage("es");
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200 pb-[2rem]">
            {texts[language].servicios.content1}
          </span>{" "}
          <br />
          {texts[language].servicios.content2}
        </p>
        <Image
          src="/servicios.png"
          alt="Service management visualization"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Funcionalidades:
          </span>{" "}
          <br />
        </p>

        <ul className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl font-sans max-w-3xl mx-auto mt-4 space-y-2">
          {texts[language].servicios.features.map((feature, index) => (
            <li key={index}>
              ✅{" "}
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                {feature.title}:
              </span>{" "}
              {feature.description}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
const ContentStock = () => {
  const { language, setLanguage } = useLanguage("es");
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200 ">
            {texts[language].stock.content1}
          </span>{" "}
          <br />
          {texts[language].stock.content2}
        </p>
        <Image
          src="/stock.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            {texts[language].stock.content3}
          </span>{" "}
          <br />
        </p>
        <Image
          src="/ajusteStock.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
        <ul className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl font-sans max-w-3xl mx-auto mt-4 space-y-2">
          {texts[language].stock.features.map((feature, index) => (
            <li key={index}>
              ✅{" "}
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                {feature.title}:
              </span>{" "}
              {feature.description}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            {texts[language].stock.content4}
          </span>{" "}
          <br />
        </p>
        <Image
          src="/proveedores.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
        <ul className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl font-sans max-w-3xl mx-auto mt-4 space-y-2">
          {texts[language].stock.features2.map((feature, index) => (
            <li key={index}>
              ✅{" "}
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                {feature.title}:
              </span>{" "}
              {feature.description}
            </li>
          ))}
        </ul>
        <ul className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl font-sans max-w-3xl mx-auto mt-4 space-y-2">
          <li>
            ✅{" "}
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Registro y administración de proveedores:
            </span>{" "}
            Guarda información clave de cada proveedor para facilitar la
            comunicación y gestión de pedidos.
          </li>
          <li>
            ✅{" "}
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Seguimiento de pedidos:
            </span>{" "}
            Consulta qué productos han sido solicitados, a qué proveedor y en
            qué estado se encuentran.
          </li>
          <li>
            ✅{" "}
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Historial de abastecimiento:
            </span>{" "}
            Mantén un registro detallado de cada pedido realizado, asegurando un
            control eficiente del suministro.
          </li>
          <li>
            ✅{" "}
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Facilidad de contacto con proveedores:
            </span>{" "}
            Accede rápidamente a los datos del proveedor para coordinar entregas
            y realizar nuevas solicitudes.
          </li>
        </ul>
      </div>
    </>
  );
};
const data = [
  {
    category: "Clientes",
    title: "Clientes",
    src: "/clienteImg.jpg",
    content: <ContentCliente />,
  },
  {
    category: "Productivity",
    title: "Vehiculos",
    src: "/vehiculoImg.jpg",
    content: <ContentVehiculos />,
  },

  {
    category: "Product",
    title: "Alistajes",
    src: "/alistajeImg.jpg",
    content: <ContentAlistajes />,
  },

  {
    category: "Presupuestos",
    title: "Presupuestos",
    src: "/presupuestoImg.jpg",
    content: <ContentPresupuestos />,
  },
  {
    category: "Turnos",
    title: "Turnos",
    src: "/turnosImg.jpg",
    content: <ContentTurnos />,
  },
  {
    category: "Servicios",
    title: "Servicios",
    src: "/serviciosImg.jpg",
    content: <ContentServicios />,
  },
  {
    category: "Stock",
    title: "Stock",
    src: "/stockImg.jpg",
    content: <ContentStock />,
  },
];
export function AppleCardsCarouselDemo() {
  const { language } = useLanguage("es");
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
  return (
    <div className="w-full h-full py-20 ">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-200  font-sans">
        {language === "es" ? "Conoce nuestros Modulos" : "Discover Our Modules"}
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10  scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "max-w-7xl mx-auto"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit  z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-white text-sm md:text-base font-medium font-sans text-left"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      </motion.button>
    </>
  );
};

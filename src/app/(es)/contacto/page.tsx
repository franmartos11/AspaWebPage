import { ContactoView, contactoMeta } from "@/views/contacto/ContactoView";

export const metadata = contactoMeta("es");

export default function Page() {
  return <ContactoView lang="es" />;
}

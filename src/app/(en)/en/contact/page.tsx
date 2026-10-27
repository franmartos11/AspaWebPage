import { ContactoView, contactoMeta } from "@/views/contacto/ContactoView";

export const metadata = contactoMeta("en");

export default function Page() {
  return <ContactoView lang="en" />;
}

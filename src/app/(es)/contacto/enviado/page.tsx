import { NoticeView, noticeMeta } from "@/views/contacto/NoticeView";

export const metadata = noticeMeta(true, "es");

export default function Page() {
  return <NoticeView ok={true} lang="es" />;
}

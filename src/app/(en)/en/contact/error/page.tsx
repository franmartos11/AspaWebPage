import { NoticeView, noticeMeta } from "@/views/contacto/NoticeView";

export const metadata = noticeMeta(false, "en");

export default function Page() {
  return <NoticeView ok={false} lang="en" />;
}

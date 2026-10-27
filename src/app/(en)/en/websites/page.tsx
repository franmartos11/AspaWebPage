import { WebsView, websMeta } from "@/views/webs/WebsView";

export const metadata = websMeta("en");

export default function Page() {
  return <WebsView lang="en" />;
}

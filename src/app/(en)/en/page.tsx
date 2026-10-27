import { HomeView, homeMeta } from "@/views/home/HomeView";

export const metadata = homeMeta("en");
export default function Page() {
  return <HomeView lang="en" />;
}

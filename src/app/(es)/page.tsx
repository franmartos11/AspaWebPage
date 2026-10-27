import { HomeView, homeMeta } from "@/views/home/HomeView";

export const metadata = homeMeta("es");
export default function Page() {
  return <HomeView lang="es" />;
}

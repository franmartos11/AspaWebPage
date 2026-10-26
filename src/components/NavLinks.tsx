"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/site";

const NAV = [
  { href: ROUTES.sistemas, label: "Sistemas", match: ["/sistemas", "/casos"] },
  { href: ROUTES.webs, label: "Webs", match: ["/webs"] },
  { href: ROUTES.nosotros, label: "Nosotros", match: ["/nosotros"] },
  { href: ROUTES.contacto, label: "Contacto", match: ["/contacto"] },
];

export function NavLinks() {
  const path = usePathname();
  return (
    <nav className="nav" id="nav" aria-label="Principal">
      {NAV.map((n) => (
        // "page" en la página misma; "true" (sección actual) en sus subpáginas: casos, planes, rubros
        <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : n.match.some((m) => path.startsWith(m)) ? "true" : undefined}>
          {n.label}
        </Link>
      ))}
    </nav>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

export default function HeaderWrapper({ userId }: { userId: string | null }) {
  const pathname = usePathname();

  if (!userId || pathname === "/") {
    return null;
  }

  return <Header />;
}

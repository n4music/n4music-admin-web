import TheLayout from "@/components/layout/TheLayout";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TheLayout>{children}</TheLayout>;
}

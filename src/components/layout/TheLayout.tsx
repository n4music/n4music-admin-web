import React from "react";
import SideBar from "./SideBar";

export default function TheLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex flex-row"
      style={{
        overflowY: "hidden",
        height: "100vh",
      }}
    >
      <SideBar />
      <div
        className="w-full py-4 px-5 h-full"
        style={{ overflowY: "auto" }}
      >
        {children}
      </div>
    </div>
  );
}

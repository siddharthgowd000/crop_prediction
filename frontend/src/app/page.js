"use client"

import Image from "next/image";

import Login from "./login/page";

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <main className="">
        <Login />
      </main>
    </div>
  );
}

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [command, setCommand] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/command", {
      method: "POST",
      body: JSON.stringify({ command: command }),
    });
    console.log(command, await res.json());
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className=" text-black"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <button type="submit">Submit here</button>
      </form>
    </main>
  );
}

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [command, setCommand] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/command", {
      method: "POST",
      body: JSON.stringify({ command: command }),
    });
    console.log(command, await res.json());
  };

  const handleCodeSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/code", {
      method: "POST",
      body: JSON.stringify({ code: code }),
    });
    console.log(code, await res.json());
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

      <form className=" mt-4" onSubmit={(e) => handleCodeSubmit(e)}>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} />
        <button type="submit">Submit code</button>
      </form>
    </main>
  );
}

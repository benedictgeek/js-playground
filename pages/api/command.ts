// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { fork } from "child_process";
import path from "path";

interface ResponseType {
  [key: string]: any;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const parsedBody = JSON.parse(req.body);

    const runCommand = fork(path.join(process.cwd(), "/pages/script.js"));

    runCommand.send(parsedBody.command);
    runCommand.on("message", (data) => {
      if (!data) {
        console.log("NO data retured");
      }
      const rdata = JSON.stringify({ message: data });
      res.json(rdata as any);
    });
  } else {
    // Handle any other HTTP method
  }
}

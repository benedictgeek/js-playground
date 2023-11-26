// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { fork } from "child_process";

interface ResponseType {
  [key: string]: any;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const parsedBody = JSON.parse(req.body);

    const runCommand = fork(
      "/Users/mac/Desktop/Personal/Projects/js-playground/pages/script.js"
    );

    runCommand.send(parsedBody.command);
    runCommand.on("message", (data) => {
      console.log(`Received message from child process: ${data}`);
      const rdata = JSON.stringify({ message: data });
      res.json(rdata as any);
    });
  } else {
    // Handle any other HTTP method
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { spawn, fork } from "child_process";

interface ResponseType {
  [key: string]: any;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const command = req.body.command;

    const runCommand = fork(
      "/Users/mac/Desktop/Personal/Projects/js-playground/pages/script.js"
    );

    runCommand.send("start");
    runCommand.on("message", (data) => {
      console.log(`Received message from child process: ${data}`);
      const rdata = JSON.stringify({ message: data });
      res.json(rdata as any);
    });
  } else {
    // Handle any other HTTP method
  }
}

// export async function POST(request: Request) {
//   const command = (await request.json()).command;

//   const runCommand = fork(
//     "/Users/mac/Desktop/Personal/Projects/js-playground/app/script.js"
//   );

//   runCommand.send("start");
//   runCommand.on("message", (data) => {
//     console.log(`Received message from child process: ${data}`);
//     new Response("dd", {});
//   });

//   // const data = JSON.stringify({ message: "Done" });

//   // console.log(command);

//   // new Response(data, {
//   //   status: 200,
//   // });
// }

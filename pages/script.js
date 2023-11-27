// import { spawn } from "child_process";
const { spawn } = require("child_process");

process.on("message", (npmPackage) => {
  let stdoutData = Buffer.from([]);

  const npm = spawn("npm", ["i", `${npmPackage}`]);

  npm.stdout.on("data", (chunk) => {
    stdoutData = Buffer.concat([stdoutData, chunk]);
  });

  npm.on("error", (error) => {
    console.log("AN ERROR OCCURED \n\n", error);
  });

  npm.on("close", (code) => {
    console.log("CHILD CLOSED \n\n", code);
  });

  npm.stdout.on("end", () => {
    console.log("DATA \n\n", stdoutData, stdoutData.toString());
    //@ts-ignore
    process.send(stdoutData.toString());
  });
});

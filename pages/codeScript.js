// import { spawn } from "child_process";
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");
// import { v4 } from "uuid";

process.on("message", (code) => {
  let stdoutData = Buffer.from([]);

  //create the file
  const fileName = v4();
  const filePath = path.join(process.cwd(), `/pages/${fileName}.js`);
  const fileStream = fs.createWriteStream(filePath);

  fileStream.write(code);

  const npm = spawn("node", [filePath]);

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
    fs.unlink(filePath, (err) => {
      if (err) console.log(err);
      console.log(`${filePath} was deleted`);
    });
    //@ts-ignore
    process.send(stdoutData.toString());
  });
});

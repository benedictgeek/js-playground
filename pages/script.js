const { spawn } = require("child_process");

process.on("message", (npmPackage) => {
  console.log("NPM package", npmPackage);
  const npm = spawn("npm", ["i", `${npmPackage}`]);

  npm.stdout.on("data", (data) => {
    console.log("DATA \n\n", data);
    //@ts-ignore
    process.send("test");
  });
});

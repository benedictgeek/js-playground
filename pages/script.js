// import { spawn } from "child_process";

const longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
      sum += i;
    };
    return sum;
  };
  
  process.on('message', (msg) => {
    const sum = longComputation();
    // @ts-ignore
    process.send(sum);
  });
  
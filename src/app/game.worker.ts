/// <reference lib="webworker" />
let loop: ReturnType<typeof setInterval>;

addEventListener("message", ({ data }) => {
  switch (data.message) {
    case "start":
      loop = setInterval(() => {
        calculate(data);
      }, 1000);
      break;

    case "update":
      clearInterval(loop);
      calculate(data);
      loop = setInterval(() => {
        calculate(data);
      }, 1000);
      break;

    case "stop":
      clearInterval(loop);
      break;
  }
});

function calculate(data) {
  const clicks = Math.ceil(data.value * data.auto * data.multiplier);
  const result = {
    message: "add",
    clicks: clicks
  };
  postMessage({ ...result });
}

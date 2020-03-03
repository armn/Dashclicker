/// <reference lib="webworker" />
let analyticsInterval: ReturnType<typeof setInterval>;

addEventListener("message", ({ data }) => {
  switch (data.message) {
    case "analytics-update":
      clearInterval(analyticsInterval);
      analytics(data);
      analyticsInterval = setInterval(() => {
        analytics(data);
      }, 1000);
      break;

    case "stop":
      clearInterval(analyticsInterval);
      break;
  }
});

function analytics(message) {
  const visits =
    message.data.views.produces.visits * message.data.views.generators +
    message.data.reads.produces.visits * message.data.reads.generators +
    message.data.shares.produces.visits * message.data.shares.generators +
    message.data.downloads.produces.visits * message.data.downloads.generators;
  const views =
    message.data.views.produces.views * message.data.views.generators +
    message.data.reads.produces.views * message.data.reads.generators +
    message.data.shares.produces.views * message.data.shares.generators +
    message.data.downloads.produces.views * message.data.downloads.generators;
  const reads =
    message.data.reads.produces.reads * message.data.reads.generators +
    message.data.shares.produces.reads * message.data.shares.generators +
    message.data.downloads.produces.reads * message.data.downloads.generators;
  const shares =
    message.data.shares.produces.shares * message.data.shares.generators +
    message.data.downloads.produces.shares * message.data.downloads.generators;
  const downloads =
    message.data.downloads.produces.downloads *
    message.data.downloads.generators;

  const analytics = {
    visits: Math.ceil(visits),
    views: Math.ceil(views),
    reads: Math.ceil(reads),
    shares: Math.ceil(shares),
    downloads: Math.ceil(downloads)
  };

  const result = {
    message: "analytics",
    data: analytics
  };
  postMessage({ ...result });
}

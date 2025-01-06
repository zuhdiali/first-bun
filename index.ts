import figlet from "figlet";
const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/") {
      const body = figlet.textSync("Hello !");
      return new Response(body);
    }

    if (url.pathname === "/about") {
      return new Response("About me!");
    }

    if (url.pathname === "/contact") {
      return new Response("Contact me!");
    }

    //handle error
    if (url.pathname === "/feed") {
      throw new Error("Could not fetch feed");
    }

    return new Response("Not Found", { status: 404 });
  },
  error(error) {
    return new Response(`<pre> ${error} \n ${error.stack} </pre>`, {
      headers: { "content-type": "text/html" },
    });
  },
});

console.log(`Server running at http://localhost:${server.port}`);

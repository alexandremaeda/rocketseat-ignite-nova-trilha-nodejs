import http from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const foundUsers = JSON.stringify(database.select("users"));

    return res.end(foundUsers);
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;
    const newUser = {
      id: randomUUID(),
      name: name,
      email: email,
    };

    database.insert("users", newUser);

    const returnData = JSON.stringify({ id: newUser.id });

    return res.writeHead(201).end(returnData);
  }

  return res.writeHead(404).end();
});

server.listen(3333);

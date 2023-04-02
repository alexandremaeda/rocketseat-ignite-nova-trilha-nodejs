import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const foundUsers = database.select("users");

      return res.end(JSON.stringify(foundUsers));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;

      const newUser = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", newUser);

      const returnData = JSON.stringify({ id: newUser.id });

      return res.writeHead(201).end(returnData);
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      return res.end();
    },
  },
];

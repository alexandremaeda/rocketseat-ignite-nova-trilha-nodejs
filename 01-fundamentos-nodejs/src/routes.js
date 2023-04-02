import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: (req, res) => {
      const foundUsers = database.select("users");

      return res.end(JSON.stringify(foundUsers));
    },
  },
  {
    method: "POST",
    path: "/users",
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
];

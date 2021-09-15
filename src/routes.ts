import { Router } from "express";
const routes = Router();

routes.get("/web", (req, res): void => {
  res.sendFile(__dirname + "/index.html");
});

export default routes;

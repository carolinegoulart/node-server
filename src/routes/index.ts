import { Router } from "express";
import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";

const routes = Router();

// all routes starting with /appointments will be sent to the
// appointments.routes file
routes.use("/appointments", appointmentsRouter);
routes.use("/users", usersRouter);

export default routes;

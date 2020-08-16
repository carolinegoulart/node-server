import { Router } from 'express';
import appointmentsRoutes from './appointments.routes';

const routes = Router();

// all routes starting with /appointments will be sent to the 
// appointments.routes file
routes.use('/appointments', appointmentsRoutes);

export default routes;
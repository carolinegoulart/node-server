import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
    // gets the instance of the AppointmentsRepository (controlled by TypeORM)
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment has already been booked');
    }

    // the create method only creates a new instance
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    // the save method persists the object
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;

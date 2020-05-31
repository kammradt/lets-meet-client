import {User} from "@/modules/users/interfaces/user.interface";

export enum EventStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
}

export interface Event {
  id?: string;
  title: string;
  description?: string;
  status?: EventStatus;
  startDate: Date;
  endDate: Date;
  maxAttendees?: number;
  manager?: User;
}

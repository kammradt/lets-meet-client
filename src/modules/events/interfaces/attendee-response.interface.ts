import { UserRole } from '@/modules/users/interfaces/user.interface';

export interface AttendeeResponse {
  id: string;
  email: string;
  role: UserRole;
  confirmation?: Date;
  cancellation?: Date;
}

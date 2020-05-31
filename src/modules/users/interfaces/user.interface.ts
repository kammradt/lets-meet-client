export enum UserRole {
  REGULAR = 'REGULAR',
  PREMIUM = 'PREMIUM',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  managedEvents: Event[];
}

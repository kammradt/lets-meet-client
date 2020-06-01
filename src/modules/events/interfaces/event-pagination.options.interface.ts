import { EventStatus } from '@/modules/events/interfaces/event.interface';
import { PaginationOptions } from '@/modules/events/interfaces/pagination-options.interface';

export interface EventPaginationOptions extends PaginationOptions {
  status?: EventStatus[];
  startDate?: string;
  endDate?: string;
}

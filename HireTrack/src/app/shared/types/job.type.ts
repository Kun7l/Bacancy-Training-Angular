import { Role } from './roles';

export interface Job {
  id: number;
  company: string;
  role: string;
  status: Role;
  date_applied: Date;
  job_url?: string;
  notes?: string;
  resume?: string;
}

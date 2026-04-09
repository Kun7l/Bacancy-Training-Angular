import { Role } from './roles';

export interface JobDTO {
  company: string;
  role: string;
  status: Role;
  job_url?: string;
  notes?: string;
  resume?: string;
}

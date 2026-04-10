import { Status } from './status';

export interface CreateJobDto {
  company: string;
  role: string;
  status: Status;
  job_url?: string;
  note?: string;
  resume_url?: string;
  resume_id?: number;
}

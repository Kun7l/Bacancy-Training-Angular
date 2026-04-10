import { Status } from './status';

export interface CreateJobDto {
  company: string;
  role: string;
  status: Status;
  note?: string;
  job_url?: string;
  resume_id?: number;
}

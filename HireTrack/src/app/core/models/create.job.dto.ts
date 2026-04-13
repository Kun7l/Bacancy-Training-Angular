import { Status } from './status';

export interface CreateJobDto {
  company: string;
  role: string;
  status: Status;
  last_edited:Date;
  date_applied?: Date;
  note?: string;
  job_url?: string;
  resume_id?: number;
}

import { Status } from './status';

export interface Job {
  id: number;
  company: string;
  role: string;
  status: Status;
  created_at: Date;
  last_edited: Date;
  date_applied?: Date;
  resume_url?: string;
  job_url?: string;
  note?: string;
  resume_id?: number;
  resume?: {
    name: string;
    url: string;
  };
}

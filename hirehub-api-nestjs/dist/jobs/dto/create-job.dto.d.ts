import { JobType, JobStatus } from '../job.entity';
export declare class CreateJobDto {
    title: string;
    description: string;
    company: string;
    location?: string;
    salary_min?: number;
    salary_max?: number;
    job_type: JobType;
    status?: JobStatus;
}

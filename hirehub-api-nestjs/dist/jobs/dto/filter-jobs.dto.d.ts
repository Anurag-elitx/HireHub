import { JobType } from '../job.entity';
export declare class FilterJobsDto {
    location?: string;
    job_type?: JobType;
    search?: string;
    page?: string;
    limit?: string;
}

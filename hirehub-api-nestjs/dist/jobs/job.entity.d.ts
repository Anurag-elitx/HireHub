import { User } from '../users/user.entity';
import { Application } from '../applications/application.entity';
export declare enum JobType {
    FULL_TIME = "FULL_TIME",
    PART_TIME = "PART_TIME",
    INTERNSHIP = "INTERNSHIP",
    CONTRACT = "CONTRACT"
}
export declare enum JobStatus {
    ACTIVE = "ACTIVE",
    CLOSED = "CLOSED",
    DRAFT = "DRAFT"
}
export declare class Job {
    id: string;
    title: string;
    description: string;
    company: string;
    location: string;
    salary_min: number;
    salary_max: number;
    job_type: JobType;
    status: JobStatus;
    employer: User;
    applications: Application[];
    created_at: Date;
    updated_at: Date;
}

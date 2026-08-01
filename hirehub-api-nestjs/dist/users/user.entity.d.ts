import { Job } from '../jobs/job.entity';
import { Application } from '../applications/application.entity';
export declare enum Role {
    CANDIDATE = "CANDIDATE",
    EMPLOYER = "EMPLOYER"
}
export declare class User {
    id: string;
    email: string;
    password?: string;
    role: Role;
    full_name: string;
    created_at: Date;
    updated_at: Date;
    jobs: Job[];
    applications: Application[];
}

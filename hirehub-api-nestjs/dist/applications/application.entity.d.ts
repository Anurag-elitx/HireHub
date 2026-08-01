import { Job } from '../jobs/job.entity';
import { User } from '../users/user.entity';
export declare enum ApplicationStatus {
    PENDING = "PENDING",
    REVIEWED = "REVIEWED",
    SHORTLISTED = "SHORTLISTED",
    REJECTED = "REJECTED"
}
export declare class Application {
    id: string;
    cover_letter: string;
    status: ApplicationStatus;
    job: Job;
    candidate: User;
    applied_at: Date;
}

import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobsDto } from './dto/filter-jobs.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(createJobDto: CreateJobDto, req: {
        user: {
            id: string;
        };
    }): Promise<import("./job.entity").Job>;
    findAll(filterDto: FilterJobsDto): Promise<{
        data: import("./job.entity").Job[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./job.entity").Job>;
    update(id: string, updateJobDto: UpdateJobDto, req: {
        user: {
            id: string;
        };
    }): Promise<import("./job.entity").Job>;
    remove(id: string, req: {
        user: {
            id: string;
        };
    }): Promise<void>;
}

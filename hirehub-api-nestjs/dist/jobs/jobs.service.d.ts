import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobsDto } from './dto/filter-jobs.dto';
export declare class JobsService {
    private jobsRepository;
    constructor(jobsRepository: Repository<Job>);
    create(createJobDto: CreateJobDto, employerId: string): Promise<Job>;
    findAll(filterDto: FilterJobsDto): Promise<{
        data: Job[];
        total: number;
    }>;
    findOne(id: string): Promise<Job>;
    update(id: string, updateJobDto: UpdateJobDto, employerId: string): Promise<Job>;
    remove(id: string, employerId: string): Promise<void>;
}

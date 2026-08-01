import { Repository } from 'typeorm';
import { Application } from './application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { JobsService } from '../jobs/jobs.service';
export declare class ApplicationsService {
    private applicationsRepository;
    private jobsService;
    constructor(applicationsRepository: Repository<Application>, jobsService: JobsService);
    apply(jobId: string, candidateId: string, createDto: CreateApplicationDto): Promise<Application>;
    findMyApplications(candidateId: string): Promise<Application[]>;
    findApplicationsForJob(jobId: string, employerId: string): Promise<Application[]>;
    updateStatus(id: string, updateDto: UpdateApplicationStatusDto, employerId: string): Promise<Application>;
}

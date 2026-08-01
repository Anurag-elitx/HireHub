import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from './application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { JobsService } from '../jobs/jobs.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
    private jobsService: JobsService,
  ) {}

  async apply(jobId: string, candidateId: string, createDto: CreateApplicationDto): Promise<Application> {
    const job = await this.jobsService.findOne(jobId);
    
    const existing = await this.applicationsRepository.findOne({
      where: { job: { id: jobId }, candidate: { id: candidateId } },
    });
    if (existing) {
      throw new ConflictException('You have already applied for this job');
    }

    const application = this.applicationsRepository.create({
      ...createDto,
      job: { id: jobId },
      candidate: { id: candidateId },
    });

    return this.applicationsRepository.save(application);
  }

  async findMyApplications(candidateId: string): Promise<Application[]> {
    return this.applicationsRepository.find({
      where: { candidate: { id: candidateId } },
      relations: { job: { employer: true } },
    });
  }

  async findApplicationsForJob(jobId: string, employerId: string): Promise<Application[]> {
    const job = await this.jobsService.findOne(jobId);
    if (job.employer.id !== employerId) {
      throw new UnauthorizedException('You can only view applications for your own jobs');
    }

    return this.applicationsRepository.find({
      where: { job: { id: jobId } },
      relations: { candidate: true },
    });
  }

  async updateStatus(id: string, updateDto: UpdateApplicationStatusDto, employerId: string): Promise<Application> {
    const application = await this.applicationsRepository.findOne({
      where: { id },
      relations: { job: { employer: true } },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.job.employer.id !== employerId) {
      throw new UnauthorizedException('You can only update applications for your own jobs');
    }

    application.status = updateDto.status;
    return this.applicationsRepository.save(application);
  }
}

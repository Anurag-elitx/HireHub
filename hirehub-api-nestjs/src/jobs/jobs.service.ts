import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, JobStatus } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobsDto } from './dto/filter-jobs.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto, employerId: string): Promise<Job> {
    const job = this.jobsRepository.create({
      ...createJobDto,
      employer: { id: employerId },
    });
    return this.jobsRepository.save(job);
  }

  async findAll(filterDto: FilterJobsDto): Promise<{ data: Job[], total: number }> {
    const { location, job_type, search, page = '1', limit = '10' } = filterDto;
    const query = this.jobsRepository.createQueryBuilder('job');

    query.where('job.status = :status', { status: JobStatus.ACTIVE });

    if (location) {
      query.andWhere('job.location ILIKE :location', { location: `%${location}%` });
    }
    if (job_type) {
      query.andWhere('job.job_type = :job_type', { job_type });
    }
    if (search) {
      query.andWhere('(job.title ILIKE :search OR job.company ILIKE :search)', { search: `%${search}%` });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    query.skip(skip).take(parseInt(limit));
    query.leftJoinAndSelect('job.employer', 'employer');

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobsRepository.findOne({
      where: { id },
      relations: { employer: true },
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto, employerId: string): Promise<Job> {
    const job = await this.findOne(id);
    if (job.employer.id !== employerId) {
      throw new UnauthorizedException('You can only update your own jobs');
    }

    Object.assign(job, updateJobDto);
    return this.jobsRepository.save(job);
  }

  async remove(id: string, employerId: string): Promise<void> {
    const job = await this.findOne(id);
    if (job.employer.id !== employerId) {
      throw new UnauthorizedException('You can only delete your own jobs');
    }

    job.status = JobStatus.CLOSED;
    await this.jobsRepository.save(job);
  }
}

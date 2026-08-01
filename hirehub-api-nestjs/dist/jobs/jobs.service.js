"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("./job.entity");
let JobsService = class JobsService {
    jobsRepository;
    constructor(jobsRepository) {
        this.jobsRepository = jobsRepository;
    }
    async create(createJobDto, employerId) {
        const job = this.jobsRepository.create({
            ...createJobDto,
            employer: { id: employerId },
        });
        return this.jobsRepository.save(job);
    }
    async findAll(filterDto) {
        const { location, job_type, search, page = '1', limit = '10' } = filterDto;
        const query = this.jobsRepository.createQueryBuilder('job');
        query.where('job.status = :status', { status: job_entity_1.JobStatus.ACTIVE });
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
    async findOne(id) {
        const job = await this.jobsRepository.findOne({
            where: { id },
            relations: { employer: true },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        return job;
    }
    async update(id, updateJobDto, employerId) {
        const job = await this.findOne(id);
        if (job.employer.id !== employerId) {
            throw new common_1.UnauthorizedException('You can only update your own jobs');
        }
        Object.assign(job, updateJobDto);
        return this.jobsRepository.save(job);
    }
    async remove(id, employerId) {
        const job = await this.findOne(id);
        if (job.employer.id !== employerId) {
            throw new common_1.UnauthorizedException('You can only delete your own jobs');
        }
        job.status = job_entity_1.JobStatus.CLOSED;
        await this.jobsRepository.save(job);
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JobsService);
//# sourceMappingURL=jobs.service.js.map
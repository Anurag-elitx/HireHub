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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const application_entity_1 = require("./application.entity");
const jobs_service_1 = require("../jobs/jobs.service");
let ApplicationsService = class ApplicationsService {
    applicationsRepository;
    jobsService;
    constructor(applicationsRepository, jobsService) {
        this.applicationsRepository = applicationsRepository;
        this.jobsService = jobsService;
    }
    async apply(jobId, candidateId, createDto) {
        const job = await this.jobsService.findOne(jobId);
        const existing = await this.applicationsRepository.findOne({
            where: { job: { id: jobId }, candidate: { id: candidateId } },
        });
        if (existing) {
            throw new common_1.ConflictException('You have already applied for this job');
        }
        const application = this.applicationsRepository.create({
            ...createDto,
            job: { id: jobId },
            candidate: { id: candidateId },
        });
        return this.applicationsRepository.save(application);
    }
    async findMyApplications(candidateId) {
        return this.applicationsRepository.find({
            where: { candidate: { id: candidateId } },
            relations: { job: { employer: true } },
        });
    }
    async findApplicationsForJob(jobId, employerId) {
        const job = await this.jobsService.findOne(jobId);
        if (job.employer.id !== employerId) {
            throw new common_1.UnauthorizedException('You can only view applications for your own jobs');
        }
        return this.applicationsRepository.find({
            where: { job: { id: jobId } },
            relations: { candidate: true },
        });
    }
    async updateStatus(id, updateDto, employerId) {
        const application = await this.applicationsRepository.findOne({
            where: { id },
            relations: { job: { employer: true } },
        });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        if (application.job.employer.id !== employerId) {
            throw new common_1.UnauthorizedException('You can only update applications for your own jobs');
        }
        application.status = updateDto.status;
        return this.applicationsRepository.save(application);
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jobs_service_1.JobsService])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map
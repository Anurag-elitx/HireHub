import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/user.entity';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Roles(Role.CANDIDATE)
  @Post(':jobId')
  @ApiOperation({ summary: 'Apply for a job (Candidate only)' })
  apply(@Param('jobId') jobId: string, @Body() createDto: CreateApplicationDto, @Request() req: { user: { id: string } }) {
    return this.applicationsService.apply(jobId, req.user.id, createDto);
  }

  @Roles(Role.CANDIDATE)
  @Get('my')
  @ApiOperation({ summary: 'Get all applications submitted by current candidate' })
  findMyApplications(@Request() req: { user: { id: string } }) {
    return this.applicationsService.findMyApplications(req.user.id);
  }

  @Roles(Role.EMPLOYER)
  @Get('job/:jobId')
  @ApiOperation({ summary: 'Get all applications for a specific job (Employer only)' })
  findApplicationsForJob(@Param('jobId') jobId: string, @Request() req: { user: { id: string } }) {
    return this.applicationsService.findApplicationsForJob(jobId, req.user.id);
  }

  @Roles(Role.EMPLOYER)
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update application status (Employer only)' })
  updateStatus(@Param('id') id: string, @Body() updateDto: UpdateApplicationStatusDto, @Request() req: { user: { id: string } }) {
    return this.applicationsService.updateStatus(id, updateDto, req.user.id);
  }
}

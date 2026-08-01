import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    apply(jobId: string, createDto: CreateApplicationDto, req: {
        user: {
            id: string;
        };
    }): Promise<import("./application.entity").Application>;
    findMyApplications(req: {
        user: {
            id: string;
        };
    }): Promise<import("./application.entity").Application[]>;
    findApplicationsForJob(jobId: string, req: {
        user: {
            id: string;
        };
    }): Promise<import("./application.entity").Application[]>;
    updateStatus(id: string, updateDto: UpdateApplicationStatusDto, req: {
        user: {
            id: string;
        };
    }): Promise<import("./application.entity").Application>;
}

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: {
        user: {
            id: string;
        };
    }): Promise<import("./user.entity").User>;
    updateProfile(req: {
        user: {
            id: string;
        };
    }, updateUserDto: UpdateUserDto): Promise<import("./user.entity").User>;
}

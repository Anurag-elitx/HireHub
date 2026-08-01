import { Role } from '../../users/user.entity';
export declare class RegisterDto {
    email: string;
    password: string;
    role: Role;
    full_name: string;
}

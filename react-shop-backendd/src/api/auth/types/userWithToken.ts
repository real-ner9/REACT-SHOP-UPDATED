import { User } from '../../user/entities/user.entity';

export interface UserWithToken { user: User, token: string }

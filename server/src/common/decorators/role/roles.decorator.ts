import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';

export const Roles = (...args: Role[]) => SetMetadata('roles', args);

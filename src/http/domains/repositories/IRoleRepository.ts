import { RolesEntity } from '@database/entities/roles.entity';
import { UserEntity } from '@database/entities/user.entity';
import { IRoleCreate } from '@domains/dtos/roles/IRoleCreate';

export abstract class IRoleRepository {
  abstract create(RoleCreate: IRoleCreate): Promise<RolesEntity>;
  abstract createRoles(users: UserEntity[], storeId: string): Promise<void>;
  abstract findRoleByUserId(userId: string): Promise<RolesEntity[]>;
}

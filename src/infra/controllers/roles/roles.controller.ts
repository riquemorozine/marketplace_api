import { Body, Controller, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { CreateRoleUseCase } from '@useCases/roles/createRole.useCase';

import { IPayload } from '@domains/dtos/users/IPayload';

import { AuthGuard } from 'src/http/guards/auth.guard';
import { User } from 'src/http/decorators/user.decorator';

import { ValidatorPipe } from '@validators/validatorPipe';
import { CreateRolesSchema } from '@validators/schemas/roles/createRolesSchema';
import { RolesGuard } from '@guards/roles.guard';
import { Roles } from '@decorators/roles.decorator';
import { RoleEnum } from '@domains/enums/RoleEnum';
import { UpdateRoleUseCase } from '@useCases/roles/updateRole.useCase';
import { IRoleUpdate } from '@domains/dtos/roles/IRoleUpdate';
import { UpdateRolesSchema } from '@validators/schemas/roles/updateRolesSchema';

@Controller('roles')
@UseGuards(AuthGuard)
export class RolesController {
  constructor(
    private createRoleUseCase: CreateRoleUseCase,
    private updateRoleUseCase: UpdateRoleUseCase,
  ) {}

  @Post()
  async create(
    @Body(new ValidatorPipe(CreateRolesSchema)) body: any,
    @User() user: IPayload,
    @Res() res: Response,
  ): Promise<void> {
    const { storeId, role } = body;
    const { email } = user;

    const roles = await this.createRoleUseCase.execute(
      { role, storeId },
      email,
    );

    res.json({ roles }).send();
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin)
  async update(
    @Body(new ValidatorPipe(UpdateRolesSchema)) body: IRoleUpdate,
    @User() user: IPayload,
    @Res() res: Response,
  ) {
    const { storeId, role, updUserId } = body;

    await this.updateRoleUseCase.execute(user.id, storeId, role, updUserId);

    res.status(201).send();
  }
}

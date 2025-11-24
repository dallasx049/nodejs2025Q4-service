import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { parseDto, parseUUID } from '../../lib/validation';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { getUserWithoutPassword } from './lib/getUserWithoutPassword';
import { CreateUserDtoSchema, UpdatePasswordDtoSchema } from './lib/validation';
import { ErrorMessage } from '../../lib/constants';

@Controller('/user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll() {
    const users = await this.usersService.getAll();

    return users.map(getUserWithoutPassword);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const dto = parseDto(CreateUserDtoSchema, createUserDto);
    const createdUser = await this.usersService.create(dto);

    return getUserWithoutPassword(createdUser);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const uuid = parseUUID(id);
    const user = await this.usersService.getOne(uuid);

    if (!user) {
      throw new NotFoundException();
    }

    return getUserWithoutPassword(user);
  }

  @Put(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const uuid = parseUUID(id);
    const user = await this.usersService.getOne(uuid);

    if (!user) {
      throw new NotFoundException();
    }

    const dto = parseDto(UpdatePasswordDtoSchema, updatePasswordDto);
    const { oldPassword, newPassword } = dto;

    if (user.password !== oldPassword) {
      throw new ForbiddenException(ErrorMessage.WRONG_PASSWORD);
    }

    const updatedUser = await this.usersService.update(id, {
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });

    if (!updatedUser) {
      throw new NotFoundException();
    }

    return getUserWithoutPassword(updatedUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const uuid = parseUUID(id);

    const deletedUser = await this.usersService.delete(uuid);

    if (!deletedUser) {
      throw new NotFoundException();
    }

    return getUserWithoutPassword(deletedUser);
  }
}

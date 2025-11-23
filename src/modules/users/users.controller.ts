import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  isValidCreateUserDto,
  isValidUpdatePasswordDto,
  isValidUserId,
} from '../../lib/validation';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { getUserWithoutPassword } from '../../lib/helpers';

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
    if (!isValidCreateUserDto(createUserDto)) {
      throw new HttpException(
        'You must provide a valid payload',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = await this.usersService.create(createUserDto);

    return getUserWithoutPassword(createdUser);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    if (!isValidUserId(id)) {
      throw new HttpException(
        'User id must be a valid UUID',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersService.getOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return getUserWithoutPassword(user);
  }

  @Put(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!isValidUserId(id)) {
      throw new HttpException(
        'User id must be a valid UUID',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersService.getOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!isValidUpdatePasswordDto(updatePasswordDto)) {
      throw new HttpException(
        'You must provide a valid payload',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }

    const updatedUser = await this.usersService.update(id, {
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });

    return getUserWithoutPassword(updatedUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!isValidUserId(id)) {
      throw new HttpException(
        'User id must be a valid UUID',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deletedUser = await this.usersService.delete(id);

    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return getUserWithoutPassword(deletedUser);
  }
}

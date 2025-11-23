import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  getAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return new Promise((res) => {
      const timestamp = Date.now();
      const user = {
        ...createUserDto,
        id: v4(),
        version: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      this.users.push(user);

      res(user);
    });
  }

  getOne(id: User['id']): Promise<User | null> {
    return new Promise((res) => {
      const user = this.users.find((user) => user.id === id) ?? null;

      res(user);
    });
  }

  update(
    id: User['id'],
    body: Partial<Omit<User, 'id' | 'createdAt'>>,
  ): Promise<User | null> {
    return new Promise(async (res) => {
      const index = this.users.findIndex((user) => user.id === id);

      if (index === -1) {
        return res(null);
      }

      const user = this.users[index];
      const updatedUser = { ...user, ...body };

      this.users[index] = updatedUser;

      res(updatedUser);
    });
  }

  delete(id: User['id']): Promise<User | null> {
    return new Promise(async (res) => {
      const index = this.users.findIndex((user) => user.id === id);

      if (index === -1) {
        return res(null);
      }

      const deletedUser = this.users[index];
      this.users.splice(index, 1);

      res(deletedUser);
    });
  }
}

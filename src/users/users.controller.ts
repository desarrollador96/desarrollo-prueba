import { Body, Controller, Post, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UsersService } from './users.service.js';
import { UpdateUserDto } from './dto/create.update.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/users")
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
    findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/users/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(Number(id), updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/users/:id')
  deleteUser(
    @Param('id') id: string,
  ) {
    return this.usersService.deleteUser(Number(id));
  }
}

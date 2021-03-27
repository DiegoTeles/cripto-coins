import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CrytoService } from './cryto.service';

@Controller('/cryto')
export class CrytoController {
  constructor(private readonly CrytoService: CrytoService) {}

  @Get('/btc')
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('calc') calc: boolean): Promise<any> {
    const result = await this.CrytoService.findAll(calc);
    return result;
  }

  @Post('/btc')
  @UseGuards(JwtAuthGuard)
  async createCoverage(@Body() data: any) {
    return await this.CrytoService.create(data);
  }
}

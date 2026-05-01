import { Controller, Get, Param } from '@nestjs/common';
import { AwardsService } from './awards.service';

@Controller('awards')
export class AwardsController {

  constructor(private readonly awardsService: AwardsService) {}

  @Get('notRescued/:user_id')
  async findNotRescuedAwards(@Param('user_id') user_id: string) {
    return this.awardsService.getNotRescuedUserAwards(user_id);
  }

  @Get('rescued/:user_id')
  async findRescuedAwards(@Param('user_id') user_id: string) {
        return this.awardsService.getRescuedUserAwards(user_id);
  }

}

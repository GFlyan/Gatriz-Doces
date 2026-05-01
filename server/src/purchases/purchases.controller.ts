import { Controller, Get, Param, Post } from '@nestjs/common';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {

  constructor(private readonly purchasesService: PurchasesService) {}

  @Get('progress/:user_id')
  async getUserPurchaseProgress(@Param('user_id') user_id: string): Promise<number> {
    return this.purchasesService.getUserPurchaseProgress(user_id);
  }

  @Post('new/:user_id')
  async newPurchase(@Param('user_id') user_id: string): Promise<{purchase_status: number, award_status: Promise<number>}> {
    return this.purchasesService.newPurchase(user_id);
  }

}

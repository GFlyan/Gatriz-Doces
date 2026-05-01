import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { AwardsModule } from 'src/awards/awards.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [AwardsModule, SupabaseModule],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}

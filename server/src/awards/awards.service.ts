import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AwardsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async newAward(user_id: string, user_purchases: number): Promise<number> {
    if(user_purchases % 10) return 0;
    const { status, error } = await this.supabaseService.supabase.from('award').insert({user_id: user_id});
    if(error) throw new Error(error.message);
    return status;
  }

  async getNotRescuedUserAwards(user_id: string): Promise<number> {
      const { data, error } = await this.supabaseService.supabase.from('award').select().match({'user_id': user_id, 'status': false});
      if(error) throw new Error(error.message);
      return data.length;
  }

  async getRescuedUserAwards(user_id: string): Promise<number> {
      const { data, error } = await this.supabaseService.supabase.from('award').select().match({'user_id': user_id, 'status': true});
      if (error) throw new Error(error.message);
      return data.length;
  }

}
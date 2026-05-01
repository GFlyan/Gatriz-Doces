import { Injectable } from '@nestjs/common';
import { AwardsService } from 'src/awards/awards.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class PurchasesService {

    constructor(private readonly awardsService: AwardsService, private readonly supabaseService: SupabaseService) {}
    
    private async getAllUserPurchases(user_id: string): Promise<{
                                                            purchase_id: number, 
                                                            user_id: number
                                                        }[]> {
                                                    
        const { data, error } = await this.supabaseService.supabase.from('purchase').select().eq('user_id', user_id);
        if(error) throw new Error(error.message);
        return data;
    }

    async newPurchase(user_id: string): Promise<{ 
                                                    purchase_status: number, 
                                                    award_status: Promise<number>
                                                }> {
        const { error: validate_error } = await this.supabaseService.adminAuthClient.getUserById(user_id); //Validation
        if(validate_error) throw new Error(validate_error.message);
        const { status: purchase_status, error } = await this.supabaseService.supabase.from('purchase').insert({user_id: user_id});
        if(error) throw new Error(error.message);
        const user_purchases = await this.getAllUserPurchases(user_id);
        const award_status = this.awardsService.newAward(user_id, user_purchases.length);
        return {purchase_status, award_status};
    }

    async getUserPurchaseProgress(user_id: string): Promise<number> {
        const user_purchases = await this.getAllUserPurchases(user_id);
        return user_purchases.length % 10;
    }

}
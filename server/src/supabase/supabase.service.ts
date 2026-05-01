import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient, GoTrueAdminApi } from "@supabase/supabase-js";



@Injectable()
export class SupabaseService {
    
    supabase: SupabaseClient;
    adminAuthClient: GoTrueAdminApi;
    constructor() {
        this.supabase = createClient(
                                        process.env.SUPABASE_URL!,
                                        process.env.SUPABASE_KEY!,
                                        {
                                            auth: {
                                            autoRefreshToken: false,
                                            persistSession: false
                                            }
                                        }
                                    )
        this.adminAuthClient = this.supabase.auth.admin;
    }

}

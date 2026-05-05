import { fetchData } from "./server";

export class UserServices {
    
    user_id: string;

    constructor(user_id: string) {
        this.user_id = user_id;
    }

    async getUserPurchaseProgress(): Promise<number> {
        return await fetchData(`/purchases/progress/${this.user_id}`);         
    }

    async getNotRescuedUserAwards(): Promise<number> {
         return await fetchData(`/awards/notRescued/${this.user_id}`); 
    }

    async getRescuedUserAwards(): Promise<number> {
        return await fetchData(`/awards/rescued/${this.user_id}`); 
    }

}
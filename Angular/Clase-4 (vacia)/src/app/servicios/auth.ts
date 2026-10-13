import { Service } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environments';

@Service()
export class Auth {
    private supabase: SupabaseClient;

    constructor(){
        this.supabase = new SupabaseClient(environment.supabaseUrl, environment.supabasePublishableKey);
    }
    
}

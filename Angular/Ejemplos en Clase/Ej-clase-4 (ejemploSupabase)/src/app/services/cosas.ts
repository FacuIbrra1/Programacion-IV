import { Service } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js/dist/index.cjs';
import { environment } from '../../environments/environment';
import { Cosa } from '../models/cosa';

@Service()
export class Cosas {
        private supabase: SupabaseClient

    constructor() {
        this.supabase = createClient(environment.supabaseUrl, environment.supabasePublishableKey)
    }

    getCosas() {
        return this.supabase.from('Cosas').select('*');
    }

    addCosa(cosa: Cosa) {
        return this.supabase.from('Cosas').insert([cosa]);
    }
}

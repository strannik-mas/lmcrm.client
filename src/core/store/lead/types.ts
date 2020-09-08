export interface Lead {
    id: number;
    name?: string;
    sphere_id: number;
    count_review: number;
    count_interest: number;
}

export interface LeadsState {
    requests_leads?: Array<Lead>;
    hisory_leads?: Array<Lead>;
    error: boolean;
}

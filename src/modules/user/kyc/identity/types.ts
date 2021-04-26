export interface IdentityData {
    first_name: string;
    last_name: string;
    dob?: string;
    address?: string;
    postcode?: string;
    city?: string;
    country?: string;
    metadata?: string;
    confirm?: boolean;
}


export interface ProfileMetadata {
    uid?: string;
    email?: string;
    fiscalcode?: string; 
    first_name?: string;
    last_name?: string;
    city_birth?: string;
    dob?: string;
    country_birth?: string;
    address?: string;
    postcode?: string;
    city_residence?: string;
    country_residence?: string;
    occupazione?: string;
    settore?: string;
    doveAttivita?: string;
    origineFondi?: string;
    reddito?: string;
    investimentoAnno?: string;
}


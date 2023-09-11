export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    employer: string;
    countryId: number;
}

export interface Country {
    country: string;
    currency: string;
}


export interface Disbursements{
    empId: number;
    amount: number;
    txHash: string;
}

import { Service } from "./service.models";

export class AccountAndServices {
    id: number
    date_final: Date;
    date_inital: Date;
    deleted_at: Date;
    deleted_by: string;
    is_active: boolean;
    nfse: number;
    pay_day: number;
    value: number;
    service: Service
}
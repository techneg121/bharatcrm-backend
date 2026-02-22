import { DealStage } from '@prisma/client';
export declare class CreateDealDto {
    title: string;
    value?: number;
    stage?: DealStage;
    probability?: number;
    ownerId?: string;
    leadId?: string;
    companyId?: string;
}

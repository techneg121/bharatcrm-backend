import { LeadStatus } from '@prisma/client';
export declare class UpdateLeadDto {
    title?: string;
    company?: string;
    phone?: string;
    email?: string;
    value?: number;
    source?: string;
    status?: LeadStatus;
    ownerId?: string;
}

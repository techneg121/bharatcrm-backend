"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const org = await prisma.organization.create({
        data: {
            name: 'Bharat CRM Demo Org',
        },
    });
    const admin = await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@bharatcrm.local',
            password: 'admin123',
            role: client_1.Role.ADMIN,
            orgId: org.id,
        },
    });
    await prisma.lead.create({
        data: {
            title: 'Website Inquiry – AC Installation',
            source: 'Website',
            status: 'NEW',
            ownerId: admin.id,
            orgId: org.id,
            aiSummary: 'High intent residential customer',
            score: 82,
        },
    });
    console.log('✅ Seed completed');
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map
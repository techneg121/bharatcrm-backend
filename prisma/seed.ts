import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Organization
  const org = await prisma.organization.create({
    data: {
      name: 'Bharat CRM Demo Org',
    },
  });

  // 2. Create Admin User
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@bharatcrm.local',
      password: 'admin123', // TEMP (hash later)
      role: Role.ADMIN,
      orgId: org.id,
    },
  });

  // 3. Create Sample Lead
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

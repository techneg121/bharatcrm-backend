import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LeadsModule } from './leads/leads.module';
import { DealsModule } from './deals/deals.module';
import { ContactsModule } from './contacts/contacts.module';
import { TasksModule } from './tasks/tasks.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    PrismaModule,
    EventEmitterModule.forRoot(),
    AuthModule,
    LeadsModule,
    DealsModule,
    ContactsModule,
    TasksModule,
    WorkflowsModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

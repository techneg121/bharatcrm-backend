/*
  Warnings:

  - Added the required column `orgId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "orgId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "orgId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Activity_orgId_idx" ON "Activity"("orgId");

-- CreateIndex
CREATE INDEX "Company_orgId_idx" ON "Company"("orgId");

-- CreateIndex
CREATE INDEX "Contact_orgId_idx" ON "Contact"("orgId");

-- CreateIndex
CREATE INDEX "Deal_orgId_idx" ON "Deal"("orgId");

-- CreateIndex
CREATE INDEX "Deal_ownerId_idx" ON "Deal"("ownerId");

-- CreateIndex
CREATE INDEX "Deal_stage_idx" ON "Deal"("stage");

-- CreateIndex
CREATE INDEX "Lead_orgId_idx" ON "Lead"("orgId");

-- CreateIndex
CREATE INDEX "Lead_ownerId_idx" ON "Lead"("ownerId");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Task_orgId_idx" ON "Task"("orgId");

-- CreateIndex
CREATE INDEX "Workflow_orgId_idx" ON "Workflow"("orgId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

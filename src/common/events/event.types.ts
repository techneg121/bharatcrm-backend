export enum SystemEvent {
  LEAD_CREATED = 'lead.created',
  LEAD_UPDATED = 'lead.updated',
  LEAD_ASSIGNED = 'lead.assigned',
  LEAD_STATUS_CHANGED = 'lead.status.changed',
  LEAD_DELETED = 'lead.deleted',

  DEAL_CREATED = 'deal.created',
  DEAL_STAGE_CHANGED = 'deal.stage.changed',

  TASK_CREATED = 'task.created',
  TASK_COMPLETED = 'task.completed',
}

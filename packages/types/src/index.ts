export const TASK_STATUS = ["todo", "in_progress", "done"] as const;
export type TaskStatus = (typeof TASK_STATUS)[number];
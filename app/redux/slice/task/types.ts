import { TASK_PRIORITY, TASK_STATUS } from "@utils";

export interface IData {
  id: string;
  priority: TASK_PRIORITY;
  title: string;
  description?: string;
  status: TASK_STATUS;
  comment?: string[];
}

export interface TaskReducer {
  data: IData[];
  task: IData;
  priorityTaskSelected: IData;
}

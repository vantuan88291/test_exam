import { IData } from "@redux";
import { TASK_PRIORITY } from "./enum";

export const randomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const randomTaskID = () => {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const sortDataByPriorityAndName = (rawData: IData[]) => {
  const priorityOrder = {
    [TASK_PRIORITY.high]: 1,
    [TASK_PRIORITY.medium]: 2,
    [TASK_PRIORITY.low]: 3,
  };
  rawData.sort((a, b) => {
    const priorityComparison =
      priorityOrder[a.priority] - priorityOrder[b.priority];

    if (priorityComparison !== 0) {
      return priorityComparison;
    }

    return a.title.localeCompare(b.title);
  });

  return rawData;
};

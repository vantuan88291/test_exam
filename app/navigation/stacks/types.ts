import { STACKS } from "@utils";

export type TRootStack = {
  [STACKS.unauthenticated]: undefined;
  [STACKS.authenticated]: undefined;
};

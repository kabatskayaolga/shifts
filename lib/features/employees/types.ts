type Contract = "fullTime" | "partTime" | "miniJob";

export type Employee = {
  id: string;
  name: string;
  contract: Contract;
};

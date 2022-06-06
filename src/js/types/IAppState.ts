type IOperator = '+' | '-' | '*' | '/';

type IPage = 'home' | 'list';

interface ICalc {
  operand1: number;
  operand2: number;
  operator: IOperator;
  result: number;
  store: string;
  done: boolean;
  correct: boolean | null;
}

interface IAppState {
  calculations: ICalc[];
  length: number;
  page: IPage;
}

export { IOperator, IAppState, ICalc, IPage };

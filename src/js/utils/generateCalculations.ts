import { ICalc, IOperator } from '../types/IAppState';

const operands: IOperator[] = ['+', '-', '*', '/'];

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const getResult = (operand1: number, operand2: number, operator: IOperator): number => {
  switch (operator) {
    case '*':
      return operand1 * operand2;
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '/':
      return operand1 * operand2;
  }
};

const generateCalculations = (length: number): Array<ICalc> => {
  let calculations: Array<ICalc> = [];
  const operandsLength = operands.length;

  for (let i = 0; i < length; i++) {
    const operand1 = getRandomInt(1, 10);
    const operand2 = getRandomInt(1, 10);
    const operator = operands[getRandomInt(0, operandsLength - 1)];
    const result = getResult(operand1, operand2, operator);

    if ('/' === operator) {
      calculations.push({
        operand1: result,
        operand2: operand1,
        operator,
        result: operand2,
        store: '',
        done: false,
        correct: null,
      });
      continue;
    }

    calculations.push({
      operand1,
      operand2,
      operator,
      result,
      store: '',
      done: false,
      correct: null,
    });
  }

  return calculations;
};

export { generateCalculations };

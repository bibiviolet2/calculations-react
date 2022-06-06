import { ICalc } from '../../types/IAppState';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Calculation.module.scss';
import classNames from 'classnames';

interface ICalculation {
  calculation: ICalc;
  index: number;
  focus: boolean;
  update: (index: number, value: number | '' | '-') => void;
  setFocusIndex: (index: number) => void;
}

const Calculation: React.FC<ICalculation> = ({
  calculation,
  index,
  focus,
  update,
  setFocusIndex,
}) => {
  const [inputValue, setInputValue] = useState<number | '' | '-'>('');
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (focus) {
      input.current?.focus();
    }
  }, [focus]);

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && '-' !== inputValue) {
      update(index, inputValue);
    }
  };

  const changeHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(parseInt(value))) {
      setInputValue(parseInt(value));
      return;
    }

    setInputValue('' === value || '-' === value ? value : inputValue);
  };

  return (
    <div
      className={classNames(
        styles.calculation,
        focus ? styles.focused : null,
        calculation.done ? (calculation.correct ? styles.right : styles.wrong) : null
      )}
    >
      {`${calculation.operand1} ${calculation.operator} ${calculation.operand2} = `}
      <input
        ref={input}
        type="text"
        value={calculation.done ? calculation.store : inputValue}
        disabled={calculation.done}
        onKeyDown={keyDownHandler}
        onChange={changeHandler}
        onFocus={() => {
          setFocusIndex(index);
        }}
      />
    </div>
  );
};

export default Calculation;

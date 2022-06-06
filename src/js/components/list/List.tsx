import React, { useEffect, useState } from 'react';
import useAppStateContext from '../../hooks/useAppStateContext';
import Calculation from '../calculation/Calculation';
import StopWatch from '../stopwatch/StopWatch';
import styles from './List.module.scss';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

const List: React.FC = () => {
  const { appState, updateCalculation, reset } = useAppStateContext();
  const [focusIndex, setFocusIndex] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(true);
  const [done, setDone] = useState<number>(0);

  const updateCalculationFromValue = (index: number, value: number | '' | '-') => {
    const newCalc = appState.calculations[index];
    setDone((done) => done + 1);

    switch (value) {
      case '-':
      case '':
        updateCalculation(index, {
          ...newCalc,
          done: true,
          store: '',
          correct: false,
        });
        return;
      default:
        updateCalculation(index, {
          ...newCalc,
          done: true,
          store: value.toString(),
          correct: value === newCalc.result,
        });
        return;
    }
  };

  const nextFocus = () => {
    let newFocusIndex = focusIndex;

    while (appState.calculations[newFocusIndex].done) {
      if (newFocusIndex === appState.length - 1) {
        newFocusIndex = 0;
      } else {
        newFocusIndex++;
      }
    }

    setFocusIndex(newFocusIndex);
  };

  useEffect(() => {
    if (done === appState.length) {
      setPlay(false);
      return;
    }
    nextFocus();
  }, [appState.calculations]);

  useEffect(() => {
    setPlay(true);
  }, []);

  return (
    <div>
      <div className={styles.calculations}>
        {appState.calculations.map((calculation, index) => (
          <Calculation
            calculation={calculation}
            index={index}
            key={index}
            focus={focusIndex === index}
            update={updateCalculationFromValue}
            setFocusIndex={setFocusIndex}
          />
        ))}
      </div>
      <div className={classNames(styles.calculationsFooter, !play ? styles.done : null)}>
        <div>
          <FormattedMessage defaultMessage="Finished" id="list.finished" />: {done}/
          {appState.length}
        </div>
        <StopWatch play={play} />
      </div>
      {!play ? (
        <div className={styles.again}>
          <button
            type="button"
            onClick={() => {
              reset();
            }}
          >
            <FormattedMessage defaultMessage="Again" id="list.again" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default List;

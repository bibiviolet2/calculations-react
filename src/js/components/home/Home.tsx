import React, { useState } from 'react';
import { generateCalculations } from '../../utils/generateCalculations';
import useAppStateContext from '../../hooks/useAppStateContext';
import styles from './Home.module.scss';
import { FormattedMessage } from 'react-intl';

const Home: React.FC = () => {
  const [noc, setNoc] = useState<number>(20);
  const { setCalculations, setPage } = useAppStateContext();

  const submitHandler = (e: React.FormEvent) => {
    if (noc < 20 || noc > 60) {
      return;
    }
    setCalculations(generateCalculations(noc));
    setPage('list');
    e.preventDefault();
  };

  return (
    <div className={styles.homeContent}>
      <form onSubmit={submitHandler}>
        <label htmlFor="noc">
          <FormattedMessage defaultMessage="Number of calculations" id="home.label" />
        </label>
        <input
          type="number"
          id="noc"
          min={20}
          max={60}
          value={noc}
          autoFocus={true}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            if (isNaN(v)) {
              return;
            }
            setNoc(v);
          }}
        />
        <button type="submit">
          <FormattedMessage defaultMessage="Start" id="home.start" />
        </button>
      </form>
    </div>
  );
};

export default Home;

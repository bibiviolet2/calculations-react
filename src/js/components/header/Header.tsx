import React from 'react';
import styles from './Header.module.scss';
import useAppStateContext from '../../hooks/useAppStateContext';
import { FormattedMessage } from 'react-intl';

const Header: React.FC = () => {
  const { reset } = useAppStateContext();

  return (
    <div className={styles.header}>
      <h1>
        <FormattedMessage defaultMessage="Home Calculator" id="header.title" />
      </h1>
      <button
        type="button"
        onClick={() => {
          reset();
        }}
      >
        <FormattedMessage defaultMessage="Back" id="header.back" />
      </button>
    </div>
  );
};

export default Header;

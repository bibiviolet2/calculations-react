import React from 'react';
import List from '../list/List';
import useAppStateContext from '../../hooks/useAppStateContext';
import Home from '../home/Home';
import styles from './layout.module.scss';
import Header from '../header/Header';

const PageContainer: React.FC = () => {
  const { appState } = useAppStateContext();

  return (
    <div className={styles.calculator}>
      <Header />
      <div className={styles.content}>{'home' === appState.page ? <Home /> : <List />}</div>
    </div>
  );
};

export default PageContainer;

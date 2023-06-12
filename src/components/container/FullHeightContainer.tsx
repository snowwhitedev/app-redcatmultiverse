import { useLayoutEffect, useState } from 'react';
import styles from './FullHeightContainer.module.scss';

const PageContainer = ({ className, children }: any) => {
  // useLayoutEffect(() => {
  //   const containerHeight = () => {
  //     document.getElementById("fullHeightContainer")?.setAttribute("height", `${window.innerHeight}px`);
  //   }

  //   window.addEventListener('resize', containerHeight)
  // });

  return (
    <div className={`${className} ${styles.fullHeightContainer}`} id="fullHeightContainer">{children}</div>
  );
};

export default PageContainer;

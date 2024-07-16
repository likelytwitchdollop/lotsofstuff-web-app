'use client'

import Colors from '@/utils/constants/Colors';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

type AppProgressBarProviderProps = {
  children: React.ReactNode | React.ReactNode[]
}

const AppProgressBarProvider = ({ children }: AppProgressBarProviderProps) => {
  return (
    <>
      {children}

      <ProgressBar
        height="4px"
        color={Colors.black}
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default AppProgressBarProvider;
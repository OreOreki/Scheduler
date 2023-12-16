'use client';

import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';

const client = new Client({
  url: 'https://graphql.anilist.co',
  exchanges: [cacheExchange, fetchExchange],
});

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider value={client}>
      <ThemeProvider attribute="class">
        <Theme accentColor="violet" grayColor="sage">
          {children}
        </Theme>
      </ThemeProvider>
    </Provider>
  );
};

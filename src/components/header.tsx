/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */

'use client';

import { Heading, TextField } from '@radix-ui/themes';
import { useDebounce } from '@uidotdev/usehooks';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

export const Header: FC = () => {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState<string>(searchParams.has('query') ? searchParams.get('query') as string : '');
  const router = useRouter();
  const debounced = useDebounce(username, 500);

  useEffect(() => {
    if (debounced) router.push(`/?query=${debounced}`);
  }, [router, debounced]);

  return (
    <header className={`flex flex-col items-center justify-center ${!username ? 'h-screen' : 'mt-3'} w-screen`}>
      <Heading color='violet' mb="5" size="9" weight="bold">
        Scheduler
      </Heading>
      <TextField.Root radius="full" size="3" style={{ width: '80%' }}>
        <TextField.Slot>
          <Search height="16" style={{ color: 'var(--violet-9)' }} width="16" />
        </TextField.Slot>
        <TextField.Input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="What is your anilist username?"
          value={username}
        />
      </TextField.Root>
    </header>
  );
};

/* eslint-disable react/function-component-definition */

import { Background } from '@/components/background';
import { Header } from '@/components/header';
import { Query } from '@/components/query';

export default function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <main>
      {searchParams.query ? null : <Background />}
      <div className="z-2">
        <Header />
        {searchParams.query ? <Query username={searchParams.query} /> : null}
      </div>
    </main>
  );
}

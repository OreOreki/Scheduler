/* eslint-disable react/function-component-definition */

import { User as Component } from '../../../components/user';

export default function User({ params }: { params: { id: string } }) {
  return (
    <main>
      <Component id={params.id} />
    </main>
  );
}

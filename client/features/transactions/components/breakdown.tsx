import { PropsWithChildren } from 'react';

import { Container } from '@/shared/ui';

type BreakdownProps = PropsWithChildren;

export const Breakdown = ({ children }: Readonly<BreakdownProps>) => {
  return (
    <section className="pb-8">
      <Container>
        <div className="flex gap-5">{children}</div>
      </Container>
    </section>
  );
};

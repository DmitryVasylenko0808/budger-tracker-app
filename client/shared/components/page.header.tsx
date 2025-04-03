import React from 'react';

import { BreadCrumbs, BreadCrumbsItem, Container } from '../ui';

type PageHeaderProps = {
  title: string;
  breadCrumbs?: BreadCrumbsItem[];
};

export const PageHeader = ({ title, breadCrumbs }: Readonly<PageHeaderProps>) => {
  return (
    <section className="py-10">
      <Container>
        {breadCrumbs && <BreadCrumbs items={breadCrumbs} className="mb-5" />}
        <h1 className="mb-4 text-3xl font-semibold">{title}</h1>
        <div className="mb-5 h-0.5 w-full bg-gray-50" />
      </Container>
    </section>
  );
};

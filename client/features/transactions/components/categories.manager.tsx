import { Container } from '@/shared/ui';

import { CategoriesApi } from '../api';
import { Categories } from './categories';

export default async function CategoriesManager() {
  const incomeCategories = await CategoriesApi.getCategories({ type: 'INCOME' });
  const expenseCategories = await CategoriesApi.getCategories({ type: 'EXPENSE' });

  return (
    <section className="pb-10">
      <Container>
        <div className="flex gap-8">
          <Categories type="INCOME" categories={incomeCategories} />
          <Categories type="EXPENSE" categories={expenseCategories} />
        </div>
      </Container>
    </section>
  );
}

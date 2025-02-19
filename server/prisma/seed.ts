import { Category, Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const generateUsers = async () => {
  const users = [
    {
      email: 'pmuckloe0@adobe.com',
      password: '11111111',
      name: 'Philippine Muckloe',
    },
    {
      email: 'shighway1@people.com.cn',
      password: '22222222',
      name: 'Suzette Highway',
    },
    {
      email: 'lbroek2@hibu.com',
      password: '33333333',
      name: 'Lilli Broek',
    },
  ].map((item) => {
    const passwordHash = bcrypt.hashSync(item.password, 10);

    return {
      email: item.email,
      name: item.name,
      passwordHash,
    };
  });

  await prisma.user.createMany({
    data: users,
  });
};

const generateCategories = async () => {
  const firstUserCategories: Prisma.CategoryCreateManyInput[] = [
    { name: 'Salary', type: 'INCOME', userId: 1 },
    { name: 'Rental Income', type: 'INCOME', userId: 1 },
    { name: 'Gifts', type: 'INCOME', userId: 1 },

    { name: 'Groceries', type: 'EXPENSE', userId: 1 },
    { name: 'Rent', type: 'EXPENSE', userId: 1 },
    { name: 'Transportation', type: 'EXPENSE', userId: 1 },
    { name: 'Fitness', type: 'EXPENSE', userId: 1 },
  ];

  const secondUserCategories: Prisma.CategoryCreateManyInput[] = [
    { name: 'Salary', type: 'INCOME', userId: 2 },

    { name: 'Groceries', type: 'EXPENSE', userId: 2 },
    { name: 'Housing', type: 'EXPENSE', userId: 2 },
    { name: 'Transportation', type: 'EXPENSE', userId: 2 },
    { name: 'Healthcare', type: 'EXPENSE', userId: 2 },
  ];

  await prisma.category.createMany({
    data: [...firstUserCategories, ...secondUserCategories],
  });
};

const truncateTables = async () => {
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE users, categories, transactions RESTART IDENTITY CASCADE`,
  );
};

const main = async () => {
  await truncateTables();

  await generateUsers();
  await generateCategories();
};

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

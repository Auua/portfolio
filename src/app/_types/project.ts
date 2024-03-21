import { Prisma } from '@prisma/client';

export type ProjectJsonProps = {
  title: string;
  data: Prisma.JsonValue | Record<string, Prisma.JsonValue>;
};

export type ProjectArrayProps = {
  title: string;
  data: string[];
};

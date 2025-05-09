'use server';

import { search as searchWrapper } from '@/lib/api';

export async function search(query: string) {
  const { result } = await searchWrapper.search({ searchKey: query });

  return result;
}

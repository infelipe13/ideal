import { Business } from '.prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

type UseBusiness = {
  redirectIfFound?: boolean;
  redirectTo?: string;
};

const fetcher = async (url: string) => {
  const result = await fetch(url);
  const data = await result.json();

  return data;
};

export const useBusiness = ({
  redirectIfFound,
  redirectTo,
}: UseBusiness = {}) => {
  const router = useRouter();
  // Rename "data" to "business". Set to "null" if "undefined".
  const { data: business = null, error } = useSWR<Business>(
    '/api/business',
    fetcher
  );
  const finished = !!business;
  const hasBusiness = !!business;

  useEffect(() => {
    if (!finished || !redirectTo) {
      return;
    }

    if (
      // Redirect if business was found and redirectIfFound is set.
      (hasBusiness && redirectIfFound) ||
      // Redirect if business was not found, and redirectTo is set.
      (!hasBusiness && !redirectIfFound && redirectTo)
    ) {
      router.push(redirectTo);
    }
  }, [finished, hasBusiness, redirectIfFound, redirectTo]);

  return error ? null : business;
};

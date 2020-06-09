import { Business } from '.prisma/client';
import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

type UseBusiness = {
  redirectIfFound?: boolean;
  redirectTo?: string;
};

const fetcher = async (url: string): Promise<Business> => {
  const response = await fetch(url);
  const business: Business = await response.json();

  return business;
};

export function useBusiness({ redirectIfFound, redirectTo }: UseBusiness) {
  const { data, error } = useSWR('/api/business', fetcher);
  const business = data;
  const finished = !!data;
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
      Router.push(redirectTo);
    }
  }, [finished, hasBusiness, redirectIfFound, redirectTo]);

  return error ? null : business;
}

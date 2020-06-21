import { Business } from '.prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

type UseBusiness = {
  redirectIfFound?: boolean;
  redirectTo?: string;
};

const fetcher = async (url: string): Promise<Business> => {
  const response = await fetch(url);
  const { business } = await response.json();
  console.log(business);
  return business;
};

export const useBusiness = ({
  redirectIfFound,
  redirectTo,
}: UseBusiness = {}) => {
  const router = useRouter();
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
      router.push(redirectTo);
    }
  }, [finished, hasBusiness, redirectIfFound, redirectTo]);

  return error ? null : business;
};

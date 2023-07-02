import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Redirect = () => {
  const router = useRouter()
  const { query, replace } = useRouter();
  const { shortURL } = query;

  useEffect(() => {
    if (shortURL) {
      replace(`/api/shorten?shortURL=${shortURL}`);
    }
  }, [replace, shortURL, router]);

  return null;
};

export default Redirect;

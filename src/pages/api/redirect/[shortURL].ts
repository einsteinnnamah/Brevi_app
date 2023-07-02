import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Redirect = () => {
  const { query, replace } = useRouter();
  const { shortURL } = query;

  useEffect(() => {
    if (shortURL) {
      replace(`/api/shorten?shortURL=${shortURL}`);
    }
  }, [replace, shortURL]);

  return null;
};

export default Redirect;

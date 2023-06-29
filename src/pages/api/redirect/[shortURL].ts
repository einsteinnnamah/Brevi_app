import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Redirect = () => {
  const router = useRouter();
  const { shortURL } = router.query;

  useEffect(() => {
    if (shortURL) {
      router.replace(`/api/shorten?shortURL=${shortURL}`);
    }
  }, [router, shortURL]);

  return null;
};

export default Redirect;

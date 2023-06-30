import { useRouter } from 'next/router';
import { useEffect, useContext, useState } from 'react';
import { LinkContext } from "../../Context/LinkContext";

const RedirectPage = () => {
  const router = useRouter();
  const {links} = useContext(LinkContext)
    const { shortURLId } = router.query;

    useEffect(() => {
        if(links.length > 0){
            const link = links.find((link: any) => link.id === shortURLId)
              router.push(link.data.longurl)
          }
    }, [links, shortURLId])
    useEffect(() => {

    })

  return <p>Redirecting...</p>;
};

export default RedirectPage;

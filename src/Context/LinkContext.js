import { createContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../pages/firebase';

const LinkContext = createContext();

const LinkProvider = ({ children }) => {
  const [links, setLinks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      setUsers(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              ...doc.data(),
            },
          };
        })
      );
    };

    getUsers();
  }, []);

  useEffect(() => {
    const getLinks = async () => {
      const querySnapshot = await getDocs(collection(db, 'links'));
      setLinks(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              name: doc.data().name,
              longurl: doc.data().longurl,
              shorturl: doc.data().shorturl,
              userId: doc.data().userId, // Add userId to link data
            },
          };
        })
      );
    };

    getLinks();
  }, []);

  return (
    <LinkContext.Provider value={{ users, links, setLinks }}>{children}</LinkContext.Provider>
  );
};

export { LinkContext, LinkProvider };

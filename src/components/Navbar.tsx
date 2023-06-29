import React, { useState, useEffect } from 'react';
import { auth, db } from '../pages/firebase';
import { useRouter } from 'next/router';
import { collection, getDocs } from "firebase/firestore";

const Navbar = () => {
  const [firstName, setFirstName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth.currentUser?.uid;

      if (userId) {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersData = usersSnapshot.docs.map((doc) => doc.data());
        const userDoc = usersData.find((user) => user.uid === userId);

        if (userDoc) {
          setFirstName(userDoc.firstName);
        }
      }
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-[24px] xl:w-[1440px] mt-[20px] flex justify-between xl:px-[120px] lg:px-[64px] md:px-[32px] m-auto ">
      <h2>Welcome {firstName} 👋</h2>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Navbar;

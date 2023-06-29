import React from 'react';
import { auth } from '../pages/firebase';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

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
      <h2>Welcome Kemi 👋</h2>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Navbar;

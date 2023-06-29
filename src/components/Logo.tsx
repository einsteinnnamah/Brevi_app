'use client';

import React from "react";
import { useRouter } from "next/navigation";

function Logo() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const router = useRouter()
  return (
   <div className=" lg:text-white text-French-Puce text-[32px] font-bold cursor-pointer">Br<span className="text-Crayola">evi</span></div>
  )
}

export default Logo;
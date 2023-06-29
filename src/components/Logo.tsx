'use client';

import React from "react";
import { useRouter } from "next/navigation";

function Logo() {

    const router = useRouter()
  return (
   <div className=" lg:text-white text-French-Puce text-[32px] font-bold cursor-pointer">Br<span className="text-Crayola">evi</span></div>
  )
}

export default Logo;
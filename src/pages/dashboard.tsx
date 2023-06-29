import React from 'react'
import LinkCard from '../components/LinkCard'
import Navbar from '../components/Navbar'
const dashboard = () => {
  return (
    <>
    <Navbar />
    <div className="xl:w-[1440px] px-[24px] xl:px-[120px] lg:px-[64px] md:px-[32px] m-auto ">
      <div className="border-[1px] border-[#CCCCCC] h-screen px-10 rounded-[10px]">
        <LinkCard />
      </div>
    </div>
  </>
  )
}

export default dashboard
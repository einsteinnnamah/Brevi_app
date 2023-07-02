"use client";
import React, { useState } from "react";
import axios from "axios";
import { LinkContext } from "../Context/LinkContext";
import { useContext } from "react";
import { collection, query, where, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "@/pages/firebase";
import Link from "next/link";


const ShortenLinkForm = () => {
  const [longURL, setLongURL] = useState("");
  const [name, setName] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [error, setError] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const {links, setLinks} = useContext(LinkContext)
  
  const checkURL = (url: string) => {
    if (!url.includes("https://") && !url.includes("http://")) {
      return "https://" + url;
    }
    return url;
  };

  const handleShorten = async () => {
    setError("");

    if (!longURL) {
      setError("Please enter a URL");
      return;
    }
    const checkedURL = checkURL(longURL);
  
    try {
      const response = await axios.post("/api/shorten", {
        longURL: checkedURL,
        customAlias,
      });
      const { shortURL } = response.data;
  
      
      setShortURL(shortURL);
      const q = query(collection(db, "links"), where("shorturl", "==", shortURL));
      const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          setError("Alias already exists");
          setTimeout(() => {
            setError("")
          }, 3000)
          return;
        }
        const docRef = await addDoc(collection(db, "links"), {
          name,
          longurl: checkedURL,
          shorturl: shortURL
        });

        const res = await getDocs(collection(db, "links"));
        const data = res.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setLinks(data);        
        return;
  
    } catch (error: any) {
      setError("Error occurred during URL shortening, could be that the alias has been used before");
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  };

  const handleClick = async (shorturl: string | number) => {
    const q = query(collection(db, "links"), where("shorturl", "==", shorturl));
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot", querySnapshot)
    if (querySnapshot.size > 0) {
      setClickCount(clickCount + 1);
      console.log("click count", clickCount)
    }
  }
  
  const handleDelete = async (shorturl: string | number) => {
    const q = query(collection(db, "links"), where("shorturl", "==", shorturl));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    }
    const res = await getDocs(collection(db, "links"));
    const data = res.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    setLinks(data);
  }

  return (
    <div>
      <h2 className="text-[24px]"> All links</h2>
      <div className="flex lg:flex-row-reverse mb-[20px] flex-col gap-x-[20px] justify-between">
      <div className="flex flex-col md:w-[460px] bg-[#F5F9FB] p-5 ">
        <div className="flex flex-col gap-y-[16px] mb-[8px]">
        <div className="flex flex-col">
   <label> Name</label>
      <input
       className="w-[200px] focus:outline-French-Puce  md:w-[416px] px-[14px] rounded-[5px] py-[10px] bg-[#E8E8E8]"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
   </div>
   <div className="flex flex-col">
   <label> long Url</label>
      <input
       className="w-[200] focus:outline-French-Puce  md:w-[416px] px-[14px] rounded-[5px] py-[10px] bg-[#E8E8E8]"
        type="text"
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
        placeholder="Enter the long URL"
      />
   </div>
   <div className="flex flex-col">
   <label> Custom link (optional)</label>
      <input
       className="w-[200px] focus:outline-French-Puce  md:w-[416px] px-[14px] rounded-[5px] py-[10px] bg-[#E8E8E8]"
        type="text"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
        placeholder="Custom alias (optional)"
      />
   </div>
        </div>

   {error && <p>{error}</p>}
      <button className="h-[42px] md:h-[48px] md:flex items-center justify-center cursor-pointer rounded-[5px] text-[16px] md:text-[18px] font-semibold text-white bg-French-Puce w-full" onClick={handleShorten}>Shorten</button>
     
      </div>

     
      {/* {shortURL && (
        <div className="flex">
          <p>Name: {name}</p>
          <p>
            Short URL:{" "}
            <a href={checkURL(longURL)} target="_blank" rel="noopener noreferrer">
              {shortURL}
            </a>
          </p>
          <p>
            Long URL:{" "}
            <a href={checkURL(longURL)} target="_blank" rel="noopener noreferrer">
              {checkURL(longURL)}
            </a>
          </p>
        </div> 
      )} */}

<div className="flex flex-col gap-y-[16px]">
{links.map((links: any) => (


  <div className="flex flex-col p-3 border-[gray] border-[1px] " key={links.id}>
                      <p>Name: {links.data.name}</p>
                      <p>
                        Short URL:{" "}
                        <Link onClick={() => handleClick(links.data.shorturl)} href={`/redirect/${links.id}`} target="_blank" rel="noopener noreferrer">
                          {links.data.shorturl}
                        </Link>
                      </p>
                      <p>
                        Long URL:{" "}
                        <a href={links.data.longurl} target="_blank" rel="noopener noreferrer">
                          {links.data.longurl}
                        </a>
                      </p>
                      <span>Number of clicks: {clickCount}</span>
                    <div className="delete">
                      <button onClick={() => handleDelete(links.data.shorturl)} className="bg-red-700 text-[#fff] font-semibold px-3 py-1 text-[14px] mt-4 rounded-md">Delete</button>
                    </div>
                    </div>     
          ) )
          }
    </div>
      </div>
    </div>
  );
};

export default ShortenLinkForm;

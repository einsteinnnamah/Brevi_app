"use client";
import React, { useState } from "react";
import axios from "axios";
import { LinkContext } from "../Context/LinkContext";
import { useContext } from "react";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/pages/firebase";
import Link from "next/link";


const ShortenLinkForm = () => {
  const [longURL, setLongURL] = useState("");
  const [name, setName] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [error, setError] = useState("");
  const [clickCount, setClickCount] = useState(0);
  
  const {links} = useContext(LinkContext)
  
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
  
      
      const q = query(collection(db, "links"), where("shorturl", "==", shortURL));
      const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          setError("Alias already exists");
          setTimeout(() => {
            setError("")
          }, 3000)
          return;
        }
          setShortURL(shortURL);
          await addDoc(collection(db, "links"), {
            name,
            longurl: checkedURL,
            shorturl: shortURL,
          });
  
    } catch (error: any) {
      setError("Error occurred during URL shortening, could be that the alias has been used before");
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  };

  const handleClick = async (shorturl: string | number) => {
    //update count if id matches
    const q = query(collection(db, "links"), where("shorturl", "==", shorturl));
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot", querySnapshot)
    if (querySnapshot.size > 0) {
      setClickCount(clickCount + 1);
      console.log("click count", clickCount)
    }
  }
  

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <input
        type="text"
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
        placeholder="Enter the long URL"
      />
      <input
        type="text"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
        placeholder="Custom alias (optional)"
      />
      <button onClick={handleShorten}>Shorten</button>
      {error && <p>{error}</p>}
      {shortURL && (
        <div>
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
      )}

{links.map((links: any) => (
                      <div key={links.id}>
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
                    </div>
          ) )

          }

    </div>
  );
};

export default ShortenLinkForm;

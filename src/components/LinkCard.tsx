import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { db } from "@/pages/firebase";
import { LinkContext } from "../Context/LinkContext";
import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";
import DeleteModal from "../components/modals/DeleteModal";

const ShortenLinkForm = () => {
  const [longURL, setLongURL] = useState("");
  const [name, setName] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<any>("");
  const { links, setLinks } = useContext(LinkContext);

  const checkURL = (url: any) => {
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
          setError("");
        }, 3000);
        return;
      }
      const docRef = await addDoc(collection(db, "links"), {
        name,
        longurl: checkedURL,
        shorturl: shortURL,
        clickCount: 0, // Initialize clickCount to 0
      });

      const res = await getDocs(collection(db, "links"));
      const data = res.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setLinks(data);
      return;
    } catch (error) {
      setError(
        "Error occurred during URL shortening, could be that the alias has been used before"
      );
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleClick = async (id: number) => {
    const linkRef = doc(db, "links", id);
    await updateDoc(linkRef, { clickCount: increment(1) });
  };

  const modalFunction = (id: any) => {
    setOpenModal(true);
    setData(id);
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const querySnapshot = await getDocs(collection(db, "links"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setLinks(data);
    };
  
    fetchLinks();
  }, [setLinks]);
  return (
    <div>
      <h2 className="text-[24px] pt-4"> All links</h2>
      <div className="flex mt-6 lg:flex-row-reverse mb-[20px] flex-col gap-x-[20px] justify-between">
        <div className="flex flex-col md:w-[460px] bg-[#F5F9FB] p-5 ">
          <div className="flex flex-col gap-y-[16px] mb-[8px]">
            <div className="flex flex-col">
              <label>Name</label>
              <input
                className="w-[200px] focus:outline-French-Puce  md:w-[416px] px-[14px] rounded-[5px] py-[10px] bg-[#E8E8E8]"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div className="flex flex-col">
              <label>Long Url</label>
              <input
                className="w-[200] focus:outline-French-Puce  md:w-[416px] px-[14px] rounded-[5px] py-[10px] bg-[#E8E8E8]"
                type="text"
                value={longURL}
                onChange={(e) => setLongURL(e.target.value)}
                placeholder="Enter the long URL"
              />
            </div>
            <div className="flex flex-col">
              <label>Custom link (optional)</label>
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
          <button
            className="h-[42px] md:h-[48px] md:flex items-center justify-center cursor-pointer rounded-[5px] text-[16px] md:text-[18px] font-semibold text-white bg-French-Puce w-full"
            onClick={handleShorten}
          >
            Shorten
          </button>
        </div>

        <div className="flex flex-col gap-y-[16px]">
          {links.map((link: any) => (
            <div className="flex flex-col p-3 border-[gray] border-[1px] " key={link.id}>
              <p>Name: {link.data.name}</p>
              <p>
                Short URL:{" "}
                <Link
                  onClick={() => handleClick(link.id)}
                  href={`/redirect/${link.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.data.shorturl}
                </Link>
              </p>
              <p>
                Long URL:{" "}
                <a href={link.data.longurl} target="_blank" rel="noopener noreferrer">
                  {link.data.longurl}
                </a>
              </p>
              <span>Number of clicks: {link.data.clickCount}</span>
              <div className="delete flex justify-end">
                <button
                  onClick={() => modalFunction(link.id)}
                  className="bg-red-700 text-[#fff] font-semibold px-3 py-1 text-[14px] mt-4 rounded-md"
                >
                  Delete
                </button>
              </div>
              {openModal && (
                <DeleteModal setOpenModal={setOpenModal} shorturl={data} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShortenLinkForm;

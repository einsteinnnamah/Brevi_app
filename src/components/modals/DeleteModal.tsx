import React, { useContext } from 'react'
import axios from "axios";
import { db } from "../../pages/api/firebase";
import { LinkContext } from "@/Context/LinkContext";
import { collection, query, where, addDoc, getDocs, deleteDoc } from "firebase/firestore";


interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  shorturl: string | number; 
}


const DeleteModal: React.FC<ModalProps> = ({ setOpenModal, shorturl }) => {
    const {links, setLinks} = useContext(LinkContext)

    const handleDelete = async (shorturl: string | number) => {      
      const q = query(collection(db, "links"), where("shorturl", "==", shorturl));
      const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
        setOpenModal(false)
      }
      const res = await getDocs(collection(db, "links"));
      const data = res.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setLinks(data);
    }
  
  return (
    <div className="bg-[#000] absolute left-0 w-screen top-0 h-screen bg-opacity-20 flex items-center justify-center ">
      <div className="bg-[#fff] shadow-2xl rounded-lg p-5">
        <h2 className="font-semibold font-mono">Are you sure you want to delete this link?</h2>
        <div className="flex justify-end space-x-2 text-[14px] mt-6">
          <button 
            className="bg-red-700 text-[#fff] font-semibold px-3 py-1 rounded-md"
            onClick={() => handleDelete(shorturl)}
            >
              Delete
            </button>
          <button 
            className="bg-[#000] text-[#fff] font-semibold px-3 py-1 rounded-md"
            onClick={() => setOpenModal(false)}
            >
              Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal

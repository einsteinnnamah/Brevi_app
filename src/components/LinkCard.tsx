"use client";
import React, { useState } from "react";
import axios from "axios";

const ShortenLinkForm = () => {
  const [longURL, setLongURL] = useState("");
  const [name, setName] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [error, setError] = useState("");

  const validateURL = (url: string) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const handleShorten = async () => {
    setError("");

    if (!validateURL(longURL)) {
      setError("Invalid URL format");
      return;
    }

    try {
      const response = await axios.post("/api/shorten", {
        longURL,
        customAlias,
      });
      const { shortURL } = response.data;

      setShortURL(shortURL); // Construct the full shortened URL with the "redirect" path
    } catch (error) {
      setError("Error occurred during URL shortening");
    }
  };


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
            <a href={shortURL} target="_blank" rel="noopener noreferrer">
              {shortURL}
            </a>
          </p>
          <p>
            Long URL:{" "}
            <a href={longURL} target="_blank" rel="noopener noreferrer">
              {longURL}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default ShortenLinkForm;

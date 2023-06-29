import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import validUrl from 'valid-url';

// An in-memory database to store the URL mappings
const urlMappings: { [key: string]: string } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { longURL, customAlias } = req.body;

    if (!isValidURL(longURL)) {
      res.status(400).json({ error: 'Invalid URL' });
      return;
    }

    let shortURL = '';

    if (customAlias) {
      if (urlMappings[customAlias]) {
        res.status(400).json({ error: 'Custom alias is already taken.' });
        return;
      }

      shortURL = customAlias;
    } else {
      shortURL = generateShortURL();
    }

    // Save the mapping between shortURL and longURL in the in-memory database
    urlMappings[shortURL] = longURL;

    const fullShortURL = `${req.headers.host}/${shortURL}`;
    res.status(200).json({ shortURL: fullShortURL });
  } else if (req.method === 'GET') {
    const shortURL = req.query.shortURL as string;
    const longURL = urlMappings[shortURL];

    if (longURL) {
      res.writeHead(301, { Location: longURL });
      res.end();
    } else {
      res.status(404).json({ error: 'Short URL not found' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

function isValidURL(url: string) {
  return validUrl.isWebUri(url); // Use valid-url library for URL validation
}

function generateShortURL() {
  return nanoid(8); // Generate a random short URL using nanoid
}

export {urlMappings}
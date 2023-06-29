import { createContext, useState } from 'react'

const LinkContext = createContext()

const LinkProvider = ({children}) => {
const [allLinks, setAllLinks] = useState()
const [allUsers, setAllUsers] = useState()
}

export {LinkContext}
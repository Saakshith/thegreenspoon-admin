import React, {useState, useEffect} from 'react'
import Navbar from "../Navbar/Navbar"
import logoDark from "../green_spoon_logo.png"
import {db} from "../firebase"
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./contacts.css"

const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const contactsRef = collection(db, "contacts")

  useEffect(() => {
    const getContacts = async () => {
      const data = await getDocs(contactsRef)
      setContacts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getContacts()
  }, [])

  return (
    <div>
      <Navbar 
        logo={logoDark}
        color="black"
        navLinkColor="black"
      />
      <h2 className="page-title">Contacts</h2>
      <div className="reservations-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, background: "rgba(0, 0, 0, 0.05)" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Subscribed</TableCell>
              <TableCell align="left">Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow
                key={contact.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{contact.firstName}</TableCell>
                <TableCell align="left">{contact.lastName}</TableCell>
                <TableCell align="left">{contact.email}</TableCell>
                <TableCell align="left">{contact.phone}</TableCell>
                <TableCell align="left">{contact.subscribed}</TableCell>
                <TableCell align="left" sx={{ maxWidth: '20rem', textAlign: 'left' }}>{contact.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  )
}

export default Contacts
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
import "./reservations.css"

const Reservations = () => { 
  const [reservations, setReservations] = useState([])
  const reservationsRef = collection(db, "reservations")

  useEffect(() => {
    const getReservations = async () => {
      const data = await getDocs(reservationsRef)
      setReservations(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getReservations()
  }, [])

  const deleteReservation = async (id, e) => {
    // e.preventDefault();
    try{
      const res = await deleteDoc(doc(db, "reservations", id));
      window.alert("Reservation is completed")
    }
    catch(err){
      console.log(err)
    } 
  }


  return (
    <div>
      <Navbar 
        logo={logoDark}
        color="black"
        navLinkColor="black"
      />
      <h2 className="page-title">Upcoming Reservations</h2>
      <div className="reservations-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, background: "rgba(0, 0, 0, 0.05)" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Date Of Reservation</TableCell>
              <TableCell align="left">Time Of Reservation</TableCell>
              <TableCell align="left">Party Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow
                key={reservation.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {reservation.name}
                </TableCell>
                <TableCell align="left">{reservation.email}</TableCell>
                <TableCell align="left">{reservation.time[0]}</TableCell>
                <TableCell align="left">{reservation.time[1]}</TableCell>
                <TableCell align="left">{reservation.guests}</TableCell>
                <TableCell align="center"><button className="complete-button" onClick={() => deleteReservation(reservation.id)}>Complete Reservation</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  )
}

export default Reservations
import Login from "./Login/Login"
import Menu from "./Menu/Menu"
import Contacts from "./Contacts/Contacts"
import Reservations from "./Reservations/Reservations"
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { AuthContext } from "./context/AuthContext"
import { useContext } from "react"

function App() {

  const {currentUser} = useContext(AuthContext)
  
  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/="/>
  }

  return (
    <div className="App">
       <Router>
          <Routes>
              <Route path="/" element={<Login key={Route.pathname}/>}/>
              <Route path="/menu" element={<RequireAuth><Menu key={Route.pathname}/></RequireAuth>}/>
              <Route path="/reservations" element={<RequireAuth><Reservations key={Route.pathname}/></RequireAuth>}/>
              <Route path="/contacts" element={<RequireAuth><Contacts key={Route.pathname}/></RequireAuth>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;

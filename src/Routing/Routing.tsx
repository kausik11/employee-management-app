import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Pgnf from '@/Components/Pgnf'
import Navbar from '@/Components/Navbar'
import RegForm from '@/Components/RegForm'
import Dashboard from '@/Pages/Dashboard'
import Footer from '@/Components/Footer'

const Routing = () => {
  return (
    <Router>
    <Navbar/>
    <br/>
    <Routes>
      <Route path='/' element={<RegForm/>}/> 
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='*' element={<Pgnf/>}/>
     </Routes>
     <Footer/>
     </Router>
  )
}

export default Routing

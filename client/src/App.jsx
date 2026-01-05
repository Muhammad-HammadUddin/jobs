
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import Applyjob from './pages/Applyjob';
import Applications from './pages/Applications';
function App() {

  return (
    <>
    <div>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/apply-job/:id" element={<Applyjob/>}/>
        <Route path="/applications" element={<Applications/>}/>

        </Routes>
        
        
    </div>
    </>
  )
}

export default App

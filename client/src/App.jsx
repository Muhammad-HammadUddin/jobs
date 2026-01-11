
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import Applyjob from './pages/Applyjob';
import Applications from './pages/Applications';
import RecruiterLogin from './components/RecruiterLogin';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ManageJobs from './pages/ManageJobs';
import ViewApplication from './pages/ViewApplication';
import 'quill/dist/quill.snow.css';
function App() {

  const {showRecruiterLogin}=useContext(AppContext)

  console.log(showRecruiterLogin);

  return (
    <>
    <div>
      {showRecruiterLogin&&<RecruiterLogin/>}

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/apply-job/:id" element={<Applyjob/>}/>
        <Route path="/applications" element={<Applications/>}/>
        <Route path='/dashboard'element={<Dashboard/>}>
        <Route path='add-job' element={<AddJob/>}/>
        <Route path='manage-jobs' element={<ManageJobs/>}/>
        <Route path='view-applications' element={<ViewApplication/>}/>
        </Route>  
        </Routes>
        
        
    </div>
    </>
  )
}

export default App

import './Styles/App.css'
import 'react-toastify/dist/ReactToastify.css';
import Register from './Login/Register'
import { ToastContainer } from 'react-toastify';
import Login from './Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../src/components/Dashboard';
import MovieReviewDashboard from './components/MovieReviewDashboard';
import LogOut from './Login/LogOut';
import ChangePassword from './Login/ChangePassword';
import ForgotPassword from './Login/ForgotPassword';
import { ThemeProvider } from './ThemeChange/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';
import './Styles/themes.css';
const App: React.FC = () => {
  

  return (
  <ThemeProvider>
     <BrowserRouter>
         <Routes>
           <Route path="/" element={<Dashboard />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/movies" element={<MovieReviewDashboard />} />
           <Route path="/logout" element={<LogOut/>}/>
           <Route path="/changePassword" element={<ChangePassword/>}/>
           <Route path="/Forgotpassword" element={<ForgotPassword/>}/>
         </Routes>
          <ToastContainer position="top-right"  autoClose={2500} />
       </BrowserRouter>
  </ThemeProvider>

       
    
  );
};

export default App;

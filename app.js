import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Stories from './pages/Stories';
import Navbar from './components/Navbar';

function App(){
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/messages" element={<Messages/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/stories" element={<Stories/>}/>
      </Routes>
    </Router>
  );
}
export default App;

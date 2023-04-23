import './App.css';
import Login from './page/Login'
import Chat from './page/Chat';
import Forget from './page/Forgetpassword';
import Resetpassword from './page/Resetpassword';
import Avatar from './page/Avatar';
import Profile from './page/Profile'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  return (    
<BrowserRouter>
<Routes>
  <Route path="/" element={<Login />}/>
  <Route path="/chat" element={<Chat />}/>
  <Route path="/forget" element={<Forget />}/>
  <Route path="/resetpassword/:id/:token" element={<Resetpassword />}/>
  <Route path="/avatar" element={<Avatar />}/>
  <Route path="/profile" element={<Profile />}/>
</Routes>
</BrowserRouter>
  );
}

export default App;

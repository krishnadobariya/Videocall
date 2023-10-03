import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './page/NoPage';
import Home from './page/Home';
import SingIn from './page/SignIn';
import Call from './components/Call';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SingIn />} />
        <Route path="users" element={<Home />} />
        <Route path="*" element={<NoPage />} />
        <Route path="call" element={<Call />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

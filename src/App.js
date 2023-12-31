import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/addEditform";
import UserList from "./components/userList";
import Userdetail from "./components/userdetail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/userDetail/:id?" element={<Userdetail />} />
          <Route path="/addEditFrom" element={<RegistrationForm />} />
          <Route path="/addEditFrom/:id?" element={<RegistrationForm />} />
          
        </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;

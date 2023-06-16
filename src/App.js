import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/addEditform";
import UserList from "./components/userList";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/addEditFrom" element={<RegistrationForm />} />
          <Route path="/addEditFrom/:id?" element={<RegistrationForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

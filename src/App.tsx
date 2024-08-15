import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Register } from "./Register/Register"
import Login from "./Login/Login"
import { Home } from "./Home/Home"
import { NotFound } from "./components/NotFound/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";

const isLoggedIn = localStorage.getItem("auth");

<Route
  path="/leaderboard"
  element={isLoggedIn ? <Leaderboard /> : <Login />}
/>

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
}

export default App;
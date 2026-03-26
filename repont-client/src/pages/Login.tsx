import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
     },
     credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });


    if (res.ok) {
      localStorage.setItem("auth", "true");
      navigate("/leaderboard");
    } else {
        alert("Wrong email or password");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "100px auto" }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
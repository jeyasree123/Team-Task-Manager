import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // 🔥 IMPORTANT CHECK
    if (!data?.user || !data?.session) {
      alert("Login failed");
      return;
    }

    // ✅ Store token
    localStorage.setItem("token", data.session.access_token);

    // ✅ Store userId (UUID)
    localStorage.setItem("userId", data.user.id);

    console.log("LOGIN SUCCESS");
    console.log("USER ID:", data.user.id);

    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-page">
      <div className="login-card p-4">
        <h3 className="text-center mb-3 text-light">TeamFlow</h3>

        <div className="d-flex mb-3">
          <button className="btn btn-primary w-50">Sign In</button>
          <button className="btn btn-dark w-50">Sign Up</button>
        </div>

        <input
          className="form-control my-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control my-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100 mt-3" onClick={handleLogin}>
          Sign In →
        </button>

        <p className="text-center mt-2 text-muted">
          No account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
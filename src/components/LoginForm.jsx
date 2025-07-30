import { useState } from "react";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

function LoginForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [token, setToken] = useLocalStorage("token", null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    

    axios
      .post("https://nextgen-project.onrender.com/api/s11d2/login", {
        username: form.username,
        password: form.password
      })
      .then((response) => {
        console.log("Başarılı giriş:", response.data);
        setToken(response.data.token);
      })
      .catch((error) => {
        console.error("Hata:", error);
        setError("Giriş başarısız. Lütfen bilgileri kontrol edin.");
      });
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <form className="loginFormMainDiv" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <input type="submit" value="Login" />

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;

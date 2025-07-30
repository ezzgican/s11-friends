import { useContext, useState } from "react";

import { AuthContext } from "../contexts/AuthContextProvider";


function LoginForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    if (!result.success) {
      setError(result.message);
    }
  };


  return (
    <div>
      <h1>LOG IN</h1>
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

        <input type="submit" value="SUBMIT" />

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;

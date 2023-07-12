import React, { useState } from "react";

const Form = () => {
  const [userData, setUserData] = useState({
    name: "",
    mail: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    mail: "",
    password: "",
  });

  const handleChange = (event) => {
    /* setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });*/
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    if (name <= 5) {
      setErrorMessage({
        ...errorMessage,
        name: "el nombre tiene que tener mas de 5 caracteres",
      });
      setError(true);
      return;
    }
    if (!e.target[1].value.includes("@")) {
      setErrorMessage({
        ...errorMessage,
        name: "",
        mail: "Tenes que colocar un email",
      });
      setError(true);
      return;
    }
    if (e.target[2].value.includes(" ")) {
      setErrorMessage({
        name:"",
        mail: "",
        password: "La password no puede tener espacios en blanco",
      });
      console.log(errorMessage.password);
      setError(true);
      return;
    }
    setUserData({
      ...userData,
      name: e.target[0].value,
      mail: e.target[1].value,
      password: e.target[2].value,
    });
    setErrorMessage({ ...errorMessage, password: "" });
    console.log(userData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          name="name"
          onChange={handleChange}
        />
        {errorMessage.name.length ? <h1>{errorMessage.name}</h1> : null}
        <input
          type="text"
          placeholder="Ingresa tu mail"
          name="mail"
          onChange={handleChange}
        />
        {errorMessage.mail.length ? <h1>{errorMessage.mail}</h1> : null}
        <input
          type="password"
          placeholder="Ingresa tu password"
          name="password"
          onChange={handleChange}
        />
        {errorMessage.password.length ? <h1>{errorMessage.password}</h1> : null}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Form;

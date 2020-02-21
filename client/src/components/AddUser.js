import React, { useState } from "react";
import { useHttp } from "../hooks/httphook";

const AddUser = (props) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    position: ""
  });

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const { request } = useHttp();

  async function addUser() {
    try {
      await request("/api/user", "POST", {...form});
      props.update()
    } catch (e) {}
  }

  return (
    <div>
      <form className="form">
        <span>First name</span>
        <input className="input" name="firstName" type="text" onChange={changeHandler} value={form.firstName}/>
        <span>Last name</span>
        <input className="input" name="lastName" type="text" onChange={changeHandler} value={form.lastName} />
        <span>Position</span>
        <input className="input" name="position" type="text" onChange={changeHandler} value={form.position} />

        <button type="button" className="btn btn-success" onClick={addUser}>Add user</button>
      </form>
    </div>
  );
};

export default AddUser;

import React, { useState } from "react";
import { useHttp } from "../hooks/httphook";

const AddTask = (props) => {
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "view",
    performer: ""
  });

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const { request } = useHttp();

  async function addTask() {
    try {
      await request("/api/task", "POST", {...form});
      props.update()
    } catch (e) {}
  }

  return (
    <div>
      <form className="form">
        <span>Title</span>
        <input className="input" name="title" type="text" onChange={changeHandler} value={form.title}/>
        <span>Description</span>
        <textarea className="input" name="description" onChange={changeHandler} value={form.description} />
        <button type="button" className="btn btn-success" onClick={addTask}>Add task</button>
      </form>
    </div>
  );
};

export default AddTask;

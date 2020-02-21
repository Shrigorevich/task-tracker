import React, {useEffect, useState} from "react";
import { useHttp } from "../hooks/httphook";

const UserSettings = (props) => { 
  
  const {request} = useHttp()
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    position: ""
  });

  const [error, setError] = useState({
    userId: props.match.params.id,
    error: false
  })

  if(props.match.params.id !== error.userId){
    setError({
      userId: props.match.params.id,
      error: false
    })
  }
  
  
  useEffect(() => {
    async function getData(){  
        const data = await request(`/api/user/${props.match.params.id}`)
        console.log(data);
        if(data.error){
          setError({
            userId: props.match.params.id,
            error: true
          })
        }else{
          setForm({
            firstName: data.user.first_name,
            lastName: data.user.last_name,
            position: data.user.position
          })  
        }
    }
    if (!error.error){      
      getData()
    }
  }, [error, request, props.match.params.id, props.data])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  async function saveUser(){
    await request(`/api/user/${props.match.params.id}`, "POST", {...form})
    props.update()
  }

  async function removeUser(){
    await request(`/api/removeuser/${props.match.params.id}`)
    setError({
      userId: props.match.params.id,
      error: true
    })
    props.update();
}

  if(!error.error){
    return (
      <form className="form">
        <span>First name</span>
        <input className="input" name="firstName" type="text" value={form.firstName} onChange={changeHandler}/>
        <span>Last name</span>
        <input className="input" name="lastName" type="text" value={form.lastName} onChange={changeHandler}/>
        <span>Position</span>
        <input className="input" name="position" type="text" value={form.position} onChange={changeHandler}/>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-success" onClick={saveUser}>Save</button>
          <button type="button" className="btn btn-danger" onClick={removeUser}>Delete</button>
        </div>
      </form>
    );
  }else{
    return (
      <div className="notFound">
        User is not found!
      </div>
    );
  }
};

export default UserSettings;

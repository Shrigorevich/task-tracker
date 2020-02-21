import React, {useEffect, useState} from "react";
import { useHttp } from "../hooks/httphook";

const TaskSettings = (props) => { 
  
  const {request} = useHttp()

  const [error, setError] = useState({
    userId: props.match.params.id,
    error: false
  })
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    performer: null,
  });  

  if(props.match.params.id !== error.userId){
    setError({
      userId: props.match.params.id,
      error: false
    })
  }
  
  useEffect(() => {
    
    async function getData(){  
        const data = await request(`/api/task/${props.match.params.id}`)
        if(data.error){
          setError({
            userId: props.match.params.id,
            error: true
          })
        }else{
          setForm({
            title: props.data ? props.data.title : data.task.title,
            description: props.data ? props.data.description : data.task.description,
            status: props.data ? props.data.status : data.task.status,
            performer: props.userData || data.task.performer
          })  
        }
    }
    if (!error.error){      
      getData()
    }
  }, [error, request, props.match.params.id, props.userData])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  async function saveTask(){
      await request(`/api/task/${props.match.params.id}`, "POST", {...form})
      props.update()
  }

  async function removeTask(){
      await request(`/api/removetask/${props.match.params.id}`)
      setError({
        userId: props.match.params.id,
        error: true
      })
      props.update()
  }

    if(!error.error){
      return (
        <form className="form">
          <span>Title</span>
          <input className="input" name="title" type="text" value={form.title} onChange={changeHandler}/>
          <span>Description</span>
          <textarea className="input" name="description" value={form.description} onChange={changeHandler}/>
          <span>Status</span>
          <select className="input" value={form.status} name="status" onChange={changeHandler}>
              <option value="view">view</option>
              <option value="in progress">in progress</option>
              <option value="done">done</option>
          </select>
          <div className="d-flex justify-content-between performer">
            {form.performer ? <p>Performer: {form.performer.firstName}&nbsp;{form.performer.lastName}</p> : <p>Performer: none</p>}
            <span title="Choose a performer" className="perfIcon" onClick={() => (props.selectionMode({...form}))}><i className="fas fa-user-alt fa-lg"/></span>
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-success" onClick={saveTask}>Save</button>
            <button type="button" className="btn btn-danger" onClick={removeTask}>Delete</button>
          </div>
        </form>
      );
    }else{
      return(
        <div className="notFound">
          Task is not found!
        </div>
      )
    }

};

export default TaskSettings;

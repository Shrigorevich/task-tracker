import React, { useState, useEffect } from "react";
import { Route, BrowserRouter, Link, Switch} from "react-router-dom";
import { useHttp } from "../hooks/httphook";
import Header from "./Header";
import AddUser from "./AddUser";
import AddTask from "./AddTask";
import ListElUser from "./ListElUser"
import ListElTask from "./ListElTask"
import UserSettings from "./UserSettings"
import TaskSettings from "./TaskSettings"

const Wrapper = () => {
  const { request } = useHttp();
  
  const [state, setState] = useState({
    update: false,
    selectionMode: false
  })
  const [users, setUsers] = useState({
    users: []
  });
  const [tasks, setTasks] = useState({
    tasks: []
  })
  const [user, setUser] = useState(null)

  function getUser(data){
    setUser({...data})
  }

  useEffect(() => {
    async function getData() {
        try {
          const usersResponse = await request(`/api/users`, "GET");
          const tasksResponse = await request(`/api/tasks`, "GET");
          setUsers({
            users: usersResponse.users
          });
          setTasks({
            tasks: tasksResponse.tasks
          });
        } catch (e) {}
      }
    getData()
  }, [state, request])

  function update(){
    setState({
      update: true
    }) 
    setUser(null)
    console.log('Info updated');
  }

  function selectionMode(data){   
    setState((state) => ({
      update: false,
      selectionMode: !state.selectionMode,
      taskState: data
    }))
  }


  return (
    <BrowserRouter>
      <Header />
      <div className="d-flex">
        <div className="lside">
          <div className="lsideHead">
            <h5>USER LIST</h5>
          </div>
          <ul className="list">
          {users.users.length === 0 ? null : users.users.map((item, i) => (<ListElUser 
            key={i}
            id={item.id}
            firstName={item.first_name}
            lastName={item.last_name}
            position={item.position}
            mode={state.selectionMode ? true : false}
            getUser={getUser}></ListElUser>))}
          </ul>
        </div>
        <div className="body p-1">
          <div className="tasklist">
            {tasks.tasks.length === 0 ? null : tasks.tasks.map((item, i) => (<ListElTask 
                key={item.id} 
                {...item}
                ></ListElTask>))}
          </div>
        </div>
        <div className="rside">
            <div className="rsideHead d-flex">
              <div className="add"><Link to="/addtask">ADD TASK</Link></div>
              <div className="add"><Link to="/adduser">ADD USER</Link></div>
            </div>
            <Switch>
              <Route path="/addtask" render={() => (<AddTask update={update}/>)}/>
              <Route path="/adduser" render={() => (<AddUser update={update}/>)}/>
              <Route exact path="/usersettings/:id" render={(props) => (<UserSettings update={update} {...props}/>)}/>
              <Route exact path="/tasksettings/:id" render={(props) => (<TaskSettings data={user ? state.taskState : null} userData={user ? user : null} update={update} selectionMode={selectionMode} {...props}/>)}/>
            </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default Wrapper;

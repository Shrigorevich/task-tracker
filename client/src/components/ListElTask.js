import React from "react";
import {Link} from "react-router-dom"

const ListElUser = (props) => {   
  
  return (  
      <div className="taskCard p-3 m-1">
          <div>
            <div className="d-flex justify-content-between my-2">
              <h5>{props.title}</h5>
              <Link to={`/tasksettings/${props.id}`}><span className="settings" ><i className="fas fa-cog"></i></span></Link>
            </div>
            <p>{props.description}</p>
          </div>
          <div>
            <div className="d-flex">
              <span>Status:</span>&nbsp;<span>{props.status}</span>
            </div>
            {props.performer ? <span>Performer: {props.performer.firstName}&nbsp;{props.performer.lastName}</span> : <span>Performer: none</span>}
          </div>
      </div>
  );
};

export default ListElUser;

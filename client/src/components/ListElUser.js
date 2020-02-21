import React from "react";
import {Link} from "react-router-dom"

const ListElUser = (props) => {
  if(!props.mode){
    return (
      <li className="listElem">
          <span>{props.firstName}  {props.lastName}</span>
          <Link to={`/usersettings/${props.id}`} className="settings"><i className="fas fa-cog"></i></Link>  
      </li>
    );
  }else{
    return(
      <li className="listElemSM" onClick={() => (props.getUser({
        firstName: props.firstName,
        lastName: props.lastName,
        position: props.position
      }))}>
        <span className="mb-2">{props.firstName}  {props.lastName}</span>
        <span>Position:  {props.position}</span>
      </li>
    );
  }
};

export default ListElUser;

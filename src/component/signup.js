import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import alumno from './alumno'
import PublicRoute from './ruta_publica';
import template from '../vistas/registroUsuario';
import $ from 'jquery';
import { server } from "../config/config";

class Signup extends Component {


    constructor() {
        super();
    }


    componentDidMount() {

    }

    render() {

return(
<div classname="card bg-light">
  <article classname="card-body mx-auto" style={{maxWidth: 400}}>
    <h4 classname="card-title mt-3 text-center">Create Account</h4>
    <p classname="text-center">Get started with your free account</p>
    <p>
      <a href classname="btn btn-block btn-twitter"> <i classname="fab fa-twitter" /> &nbsp; Login via Twitter</a>
      <a href classname="btn btn-block btn-facebook"> <i classname="fab fa-facebook-f" /> &nbsp; Login via facebook</a>
    </p>
    <p classname="divider-text">
      <span classname="bg-light">OR</span>
    </p>
    <form>
      <div classname="form-group input-group">
        <div className="className input-group-prepend">
          <span classname="input-group-text"> <i classname="fa fa-user" /> </span>
        </div>
        <input name classname="form-control" placeholder="Full name" type="text" />
      </div> {/* form-group// */}
      <div classname="form-group input-group">
        <div classname="input-group-prepend">
          <span classname="input-group-text"> <i classname="fa fa-envelope" /> </span>
        </div>
        <input name classname="form-control" placeholder="Email address" type="email" />
      </div> {/* form-group// */}
      <div classname="form-group input-group">
        <div classname="input-group-prepend">
          <span classname="input-group-text"> <i classname="fa fa-phone" /> </span>
        </div>
        <select classname="custom-select" style={{maxWidth: 120}}>
          <option selected>+971</option>
          <option value={1}>+972</option>
          <option value={2}>+198</option>
          <option value={3}>+701</option>
        </select>
        <input name classname="form-control" placeholder="Phone number" type="text" />
      </div> {/* form-group// */}
      <div classname="form-group input-group">
        <div classname="input-group-prepend">
          <span classname="input-group-text"> <i classname="fa fa-building" /> </span>
        </div>
        <select classname="form-control">
          <option selected> Select job type</option>
          <option>Designer</option>
          <option>Manager</option>
          <option>Accaunting</option>
        </select>
      </div> {/* form-group end.// */}
      <div classname="form-group input-group">
        <div classname="input-group-prepend">
          <span classname="input-group-text"> <i classname="fa fa-lock" /> </span>
        </div>
        <input classname="form-control" placeholder="Create password" type="password" />
      </div> {/* form-group// */}
      <div classname="form-group input-group">
        <div classname="input-group-prepend">
          <span classname="input-group-text"> <i classname="fa fa-lock" /> </span>
        </div>
        <input classname="form-control" placeholder="Repeat password" type="password" />
      </div> {/* form-group// */}                                      
      <div classname="form-group">
        <button type="submit" classname="btn btn-primary btn-block"> Create Account</button>
      </div> {/* form-group// */}      
      <p classname="text-center">Have an account? <a href>Log In</a> </p>                                                                 
    </form>
  </article>
</div>


);

    }
}

export default Signup;
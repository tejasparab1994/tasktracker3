import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import api from '../api';

let LoginForm  = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }



  function create_token(ev) {
    api.submit_login(props.login, props.history);
    console.log(props.login);
    // console.log(props.history);
  }

  return <div className="navbar-text">
    <Form inline>

      <FormGroup>
        <Input type="text" name="name" placeholder="name"
          value={props.login.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
          value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
    </Form>
  </div>;
    });

    let Session = connect(({token}) => {return {token};})((props) => {



      function logout(ev) {
        props.dispatch({
          type: 'LOGOUT',
        });
      }

      return <div className="navbar-text">
        Welcome { props.token.user_name }
        <Link to={"/"} onClick={logout}>
          Log Out
        </Link>
    </div>
  });

  function Nav(props) {
    let session_info;
    let navigation;
    console.log("here in nav checking props", props);
    if (props.token) {
      session_info = <Session token={props.token}/>;
      navigation = <ul className= "navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Feed</NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/assigned" exact={true} href="#" className="nav-link"> Your assigned Tasks</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/task-form" exact={true} href="#" className="nav-link">New Task</NavLink>
        </NavItem>


      </ul>;
    }

    else {
      session_info = <LoginForm history = {props.history}/>;
      navigation =
      <ul className = "navbar-nav mr-auto">

      </ul>
    }
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <span className="navbar-brand">
          TaskTracker
        </span>
        {navigation}
        {session_info}
      </nav>
    );
  }

  function state2props(state) {
    return {
      token: state.token,
    };
  }


  export default connect(state2props)(Nav);

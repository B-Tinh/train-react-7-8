import React, {Component} from 'react';
import './styles.scss';
import Login from '../../layout/login';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';
import history from '../../history';

class RegisterLeft extends Component{
	constructor(props) {
      super(props);
      this.signUp = this.signUp.bind(this);
      this.onHandleChange = this.onHandleChange.bind(this);
      this.state = {
        email : '',
        password : '',
        isLoading: false,
        Loading : false
      };
    }

  onHandleChange(event){
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name] : value
    });
  }

  signUp = (event) => {
    this.setState({
      Loading : true
    });
    setTimeout(() => {
      this.setState({
        Loading : false
      });
    }, 2000)
      event.preventDefault();
      if(this.state.password !== this.state.confirmPass){
            alert("Password do not match")
      } else
        this.props.onSignUp(this.state.email,this.state.password);
    }
    
    
   componentWillReceiveProps(nextProps){
   if (nextProps.tasks.isLoading) {
     this.props.history.push('/');
    }       
   console.log("check nextProps isLoading:",nextProps.tasks.isLoading);
    }

  render(){
    const {Loading} = this.state;
    var{ email, password, confirmPass } = this.state;
    return (
	    <div>
	      	<div className="col-md-12 Regis-Left">
				<div className="Sign-up">
					<h2>SIGN UP</h2>
					<form className="formSign" action="" onSubmit = {this.signUp}>
						Email:<br />
						<input onChange={this.onHandleChange} className="Sign-Email" value={email} placeholder="" type="text"  name ="email" required=""></input>
						<br />
						Password:<br />
						<input onChange={this.onHandleChange} className="Sign-Pass" value ={password} placeholder="" type="password"  name ="password" required=""></input>
						<br />
						Confirm Password:<br />
						<input onChange={this.onHandleChange} className="ConfirmPass" value={confirmPass} placeholder="" type="password"  name ="confirmPass" required=""></input>
					</form>
					<Link  to ="/">
            <button type="button" className="btn btn-default sign-up" onClick={this.signUp}>
              {Loading && <i className="fa fa-spinner fa-spin" disabled={Loading}></i>}
              SIGN UP
            </button>
          </Link>
					<p>&copy; 2019 Terralogic.Inc</p>
				</div>
			</div>
	    </div>
  );
  }
}

const mapStateToProps = (state) => {
	return {
		tasks: state.tasks
	}
	};
	const mapDispatchToProps = (dispatch, props) => {
	return{
		onSignUp : (email, password) =>{
			dispatch(actions.signUpAPI(email, password));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterLeft);
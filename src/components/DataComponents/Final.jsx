import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');
import {RESUMESITE} from '../../../actions/actionTypes'

// import {updateStoreData} from '../../../actions/actions'


class LinkConfigurer extends React.Component{
	constructor(props){
		super(props)
		this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
		this.isValidated =  this.isValidated.bind(this)
	}
	handleTextChange(name,e){
		this.setState({[name] : e.target.value})
	}
	isValidated(){
		var updates = this._grabUserInputs();
		// if()
	  this.props.updateStoreData(updates)
		return true;
	}
	_grabUserInputs(){
		return {
			"resumeid" : this.refs.resumeid.value
		}
	}
	render(){
		var toRender;
		if(isSaved){
			toRender = 		<form className="form-horizontal">
			      Your Account informations have been saved
						Your Resume is in <a href={RESUMESITE+(_.get(this.props,'user.userdata.resumeid',""))} target="_blank">Here</a>
					</form>
		}
		else{
			toRender = <div>Please go back to save your details</div>
		}
	return(
		<div className="">
			{toRender}
	</div>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    user : state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default (LinkConfigurer)

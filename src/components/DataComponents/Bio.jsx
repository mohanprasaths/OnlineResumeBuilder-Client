import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
// import {updateStoreData} from '../../../actions/actions'
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


class Bio extends React.Component{
	constructor(props){
		super(props)
		this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
		this.isValidated =  this.isValidated.bind(this)
	}
	componentDidMount(){
		var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

		// Firefox 1.0+
		var isFirefox = typeof InstallTrigger !== 'undefined';

		// Safari 3.0+ "[object HTMLElementConstructor]"
		var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

		// Internet Explorer 6-11
		var isIE = /*@cc_on!@*/false || !!document.documentMode;

		// Edge 20+
		var isEdge = !isIE && !!window.StyleMedia;

		// Chrome 1+
		var isChrome = !!window.chrome && !!window.chrome.webstore;

		// Blink engine detection
		var isBlink = (isChrome || isOpera) && !!window.CSS;
		if(!(isChrome || isSafari || isEdge))
		// this.addAlert()
		// this.addAlertMessage()
		this.addAlertMessage()
	}
	handleTextChange(name,e){
		// this.setState({[name] : e.target.value})
		this.props.updateStoreData({[name] : e.target.value})
	}
	isValidated(){
		var updates = this._grabUserInputs();
		// if()
	  this.props.updateStoreData(updates)
		return true;
	}
	_grabUserInputs(){
		return {
			"firstName" : this.refs.firstName.value,
			"lastName" : this.refs.lastName.value,
			"headline" : this.refs.headline.value,
			"industry" : this.refs.industry.value,
			"title" : this.refs.title.value,
			"summary" : this.refs.summary.value,
			"phonenumber" : this.refs["phonenumber"].value,
			"emailaddress" : this.refs["emailaddress"].value
		}
	}
	addAlert () {
  this.refs.containerToast.success(
    "Mohan.","Prasath", {
    timeOut: 3000  });
  }
  addAlertMessage () {
  this.refs.containerToast.success(
    "Google chrome , Safari ,Opera",
    "For best UX use in Computer's browsers.", {
    timeOut: 8000,
    extendedTimeOut: 1000
  });
  }
	render(){
	return(
		<div className="appBody">
			<ToastContainer ref="containerToast"
											toastMessageFactory={ToastMessageFactory}
											preventDuplicates={ false }
											className="toast-top-right" />


		<form className="form-horizontal">
			<div className="form-group">
        <label className="control-label col-sm-2" for="fname">First Name :  </label><div className="col-sm-4"><input ref="firstName" id="fname" className="form-control" placeholder="Name" type="text" value={_.get(this.props,'user.userdata.firstName',"")} onChange={(e)=>this.handleTextChange("firstName",e)} /></div>
        <label className="control-label col-sm-2" for="lname">Last Name :  </label><div className="col-sm-4"><input ref="lastName" id="lname" className="form-control" placeholder="Name" type="text" value={_.get(this.props,'user.userdata.lastName',"")} onChange={(e)=>this.handleTextChange("lastName",e)} /></div>
      </div>
			<div className="form-group">
        <label className="control-label col-sm-2" for="email"> E-Mail :  </label><div className="col-sm-10"><input id="email" ref="emailaddress" className="form-control" type="email" placeholder="E-Mail" type="text" value={_.get(this.props,'user.userdata.emailaddress',"")} onChange={(e)=>this.handleTextChange("emailaddress",e)}/></div>
      </div>
			<div className="form-group">
        <label className="control-label col-sm-2" for="phone"> Phone Number :  </label><div className="col-sm-10"><input id="phone" ref="phonenumber" className="form-control" type="" placeholder="Phone Number" type="number" value={_.get(this.props,'user.userdata.phonenumber',"")} onChange={(e)=>this.handleTextChange("phonenumber",e)}/></div>
      </div>
			<div className="form-group">
				<label className="control-label col-sm-2" for="headline"> headline :  </label><div className="col-sm-10"><input id="headline" ref="headline" className="form-control" placeholder="Headline" type="text" value={_.get(this.props,'user.userdata.headline',"")} onChange={(e)=>this.handleTextChange("headline",e)}/></div>
			</div>
			<div className="form-group">
				<label className="control-label col-sm-2" for="industry"> Industry :  </label><div className="col-sm-10"><input id="industry" ref="industry" className="form-control" type="email" placeholder="Industry" type="text" value={_.get(this.props,'user.userdata.industry',"")} onChange={(e)=>this.handleTextChange("industry",e)}/></div>
			</div>
			<div className="form-group">
				<label className="control-label col-sm-2" for="title"> Title :  </label><div className="col-sm-10"><input id="title" ref="title" className="form-control" type="email" placeholder="Title" type="text" value={_.get(this.props,'user.userdata.title',"")} onChange={(e)=>this.handleTextChange("title",e)}/></div>
			</div>
			<div className="form-group">
				<label className="control-label col-sm-2" for="summary"> Summary :  </label><div className="col-sm-10"><textarea id="summary" ref="summary" className="form-control" type="textarea" placeholder="Summary" type="textarea" value={_.get(this.props,'user.userdata.summary',"")} onChange={(e)=>this.handleTextChange("summary",e)}/></div>
			</div>
		</form>
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

export default (Bio)

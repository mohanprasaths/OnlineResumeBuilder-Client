import React from 'react'
import {connect} from 'react-redux';
var _ = require('lodash');
import StepZilla from 'react-stepzilla'
import Bio from './Bio.jsx'
import Education from './Education.jsx'
import Work from './Work.jsx'
import EducationDraggable from './EducationDraggable.jsx'
import Skills from './Skills.jsx'
import {updateStoreData} from '../../../actions/actions'



var WizardComponent = React.createClass({
  getStore : function(){
    return this.user;
  },
	render : function(){
    const steps =
        [
          {name: 'Basic', component: <Bio user = {this.props.user} updateStoreData={this.props.updateStoreData}/>},
          {name: 'Education', component: <EducationDraggable user = {this.props.user} updateStoreData={this.props.updateStoreData}/>},
          {name: 'Work', component: <Work user = {this.props.user} updateStoreData={this.props.updateStoreData}  />},
          {name: 'Skills', component: <Skills user = {this.props.user} updateStoreData={this.props.updateStoreData}  />}
        ]
	return(
			<div>
        <div className='step-progress'>
            <StepZilla steps={steps}></StepZilla>
        </div>
		    </div>
		)
	}
})


const mapStateToProps = (state) => {
  return {
    user : state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStoreData : ((updates)=>dispatch(updateStoreData(updates)))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WizardComponent)

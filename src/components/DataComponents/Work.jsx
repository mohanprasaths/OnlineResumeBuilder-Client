import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove,SortableHandle} from 'react-sortable-hoc';
import styles from './css/switch.css'
import DragHandle from './DragHandle.jsx'


/* Work component - Single */
const SortableItem = SortableElement(function({work,alertme,updateWorkComponents,id,deleteWorkComponent}){
  return(

    <SingleWorkComponent work={work} alertme={alertme} deleteWorkComponent={deleteWorkComponent} updateWorkComponents={updateWorkComponents} index={id} ></SingleWorkComponent>

  )
});

var SingleWorkComponent = React.createClass({
  updateWorkComponent : function(event,index){

    this.props.updateWorkComponents(event,index);

  },
  deleteWorkComponent : function(event,index){
    this.props.deleteWorkComponent(event,index);
  },
  render: function(){
    return(
      <div className="well well-lg" onChange={(event)=>this.updateWorkComponent(event,this.props.index)} >
        <div className="row closeButton">
        <DragHandle />
        <img src="/assets/img/delete.png" className="pull-right closeButtonImg" onClick={(event)=>this.deleteWorkComponent(event,this.props.index)} value="X" />
        </div>

        <div className="form-horizontal form-group">
          <label className="control-label col-sm-2" for="title">  Title :  </label><div className="col-sm-10"><input id="title" className="form-control" placeholder="eg: Software Developer" type="text"  value={_.get(this.props,'work.title',"")}  /></div>
        </div>
        <div className="form-horizontal form-group">
          <label className="control-label col-sm-2" for="company"> Company :  </label><div className="col-sm-4"><input id="company" className="form-control" type="email" placeholder="eg: Zoho Corp" type="text" value={_.get(this.props,'work.company',"")} /></div>
          <label className="control-label col-sm-2" for="company"> Location :  </label><div className="col-sm-4"><input id="location" className="form-control" type="email" placeholder="eg: Chennai" type="text" value={_.get(this.props,'work.location',"")} /></div>
        </div>
        <div className="form-horizontal form-group">
          <label className="control-label col-sm-2" for="currentCompany">  Is current company :  </label><div className="col-sm-10"><label className={styles.switch}> <input type="checkbox" defaultChecked={_.get(this.props,'work.iscurrent',"false")} id="iscurrent"/> <div className={styles.slider +' '+styles.round}></div></label></div>
        </div>
        <div className="form-horizontal form-group">
          <label className="control-label col-sm-2" for={"from"}> From :  </label><div className="col-sm-4"><input id={"from"} className="form-control" type="date" placeholder="Start Date (YYYY-MM-DD)" value={_.get(this.props,'work.from',"")} /></div>
          <label className="control-label col-sm-2" for={"to"}> To :  </label><div className="col-sm-4"><input id={"to"} className="form-control" type="date" placeholder="End Date (YYYY-MM-DD)" value={_.get(this.props,'work.to',"")} /></div>
        </div>
        <div className="form-horizontal form-group">
          <label className="control-label col-sm-2" for="description"> Description :  </label><div className="col-sm-10"><textarea id="description" className="form-control" type="textarea" placeholder="I developed XXX and YYY " type="text" value={_.get(this.props,'work.description',"")} /></div>
        </div>
      </div>
    )
  }
})


const SortableList = SortableContainer(function({work,alertme,updateWorkComponents,deleteWorkComponent}){
  return (
    <ul>
      {work.map((value, index) => (
        <SortableItem alertme={alertme} key={`work-${index}`} deleteWorkComponent={deleteWorkComponent} updateWorkComponents={updateWorkComponents} index={index}  id={index} work={value} ></SortableItem>
      ))}
    </ul>
  );
});


class SortableComponent extends Component {
  componentWillMount() {
    // var state = {
    //   items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    // };
    // this.setState({"items" : state.items})
  }
  onSortEnd({oldIndex, newIndex}){

    this.props.onSortEnd({oldIndex,newIndex});
  };
  alertme(){
    // alert("clicked me")
  }
  render() {


    return <SortableList work={this.props.work} deleteWorkComponent={this.props.deleteWorkComponent} updateWorkComponents={this.props.updateWorkComponents} alertme={this.alertme} onSortEnd={this.onSortEnd.bind(this)}   useDragHandle={true} axis="y" lockAxis="y" />;
  }
}

export default class DraggableComponent extends Component{
  constructor(props){
    super(props);
    //  this.updateWorkComponents=this.updateWorkComponents.bind(this)
    this.isValidated =  this.isValidated.bind(this)
  }
  componentWillUnmount() {
    var updates = this._grabUserInputs();
    // if()
    this.props.updateStoreData(updates)
    return true;
  }
  componentWillReceiveProps(nextProps) {
    //  this.setState({work:_.get(this.props,"user.userdata.work",[])})
  }
  isValidated(){
    var updates = this._grabUserInputs();
    // if()
    var flag = true
    updates.work.forEach(function(a){
      _.forOwn(a, function(value, key) {
        if(typeof (a[key]) != "boolean" && ( a[key] == "" || a[key] == undefined)){
          flag = false
        }
        console.log(value)
      });
    })
    if(!flag){
      alert("Fields cannot be left empty")
    }else{
      this.props.updateStoreData(updates)
    }
    return flag;
  }
  _grabUserInputs(){
    return {
      work : this.state.work
    }
  }
  componentWillMount(){
    this.setState({work:_.get(this.props,"user.userdata.work",[])})
  }
  componentDidMount(){
    // this.setState({work : (_.get(this.props,'user.userdata.work',[{"title":"TMHNU","from":"2","to":"3","company":"12th","description":"98"},{"title":"Sona","from":"2","to":"3","company":"12th","description":"98"}]))})
  }
  handleTextChange(name,e){
    this.setState({[name] : e.target.value})
  }
  updateWorkComponents(event,index){
    let work = this.state.work;

    var updates = {
      "title":event.currentTarget.querySelector('#title').value,
      "from" : event.currentTarget.querySelector('#from').value,
      "to" : event.currentTarget.querySelector('#to').value,
      "company" : event.currentTarget.querySelector('#company').value,
      "description" : event.currentTarget.querySelector('#description').value,
      "location" : event.currentTarget.querySelector('#location').value,
      "iscurrent" : event.currentTarget.querySelector('#iscurrent').checked
    }
    work[index] = updates;
    this.setState({"work" : work})
  }
  deleteWorkComponent(event,index){
    let work = this.state.work;
    work.splice(index,1);
    this.setState({"work":work})
  }
  addNewWork(){
    var work = this.state.work;
    work.push({"title":"","from":"","to":"","company":"","iscurrent":false,"location":"","description":""});
    this.setState({work : work})
  }
  captureWorkDetails(e){
  }
  updateState(obj){
    this.setState(obj);
    this.setState({"work" : this.state.work})
    this.forceUpdate();
  }
  componentWillReceiveProps(nextProps) {
  }
  componentWillUpdate(nextProps, nextState) {
  }
  onSortEnd({oldIndex, newIndex}){

    this.setState({
      work: arrayMove(this.state.work, oldIndex, newIndex),
    });
  };
  render(){
    var work = this.state.work
    return(
      <div ref="WorkComponentMaster" className="" >
        <form className="form-horizontal">
          <div className="form-horizontal form-group">
            <input type="button"  className="btn btn-success" onClick={this.addNewWork.bind(this)} value="add new" />
          </div>
          <SortableComponent onSortEnd={this.onSortEnd.bind(this)} deleteWorkComponent={this.deleteWorkComponent.bind(this)} updateWorkComponents={this.updateWorkComponents.bind(this)} work={work} > </SortableComponent>
        </form>
      </div>

    )
  }
}

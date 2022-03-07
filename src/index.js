import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactHeader from './ReactHeader';
import TaskList from './TaskList';
import TaskDetail from './TaskDetail';
import NewTask from './NewTask';

class Main extends React.Component{
  constructor(){
    super();
    this.importanceSortAscending = true;
    this.state = {
      taskList: [],
      selected: {},
      newTaskView: false 
    }

    this.select = this.select.bind(this);
    this.clearSelected = this.clearSelected.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.setNewTask = this.setNewTask.bind(this);
    this.sortByImportance = this.sortByImportance.bind(this);
  }

  async componentDidMount(){
    const response = (await axios.get('/api/tasks')).data;
    
    this.setState({
      taskList: response,
      selected:{}, 
      newTaskView: false
    })
  }



  async completeTask(id){
    console.log('test');
    await axios.delete(`/api/task/${id}`);
    

    this.componentDidMount();
  }

  setNewTask(){
    this.setState({
      newTaskView: true,
      selected: {}
    })
  }

  async select(id){
    const response = (await axios.get(`/api/task/${id}`)).data;

    this.setState({
      selected: response,
      newTaskView:false
    })
  }

  clearSelected(){
    this.setState({
      selected: {},
      newTaskView: false
    })
  }

  sortByImportance(){
    const tasks = this.state.taskList;
    let compare;
    if(this.importanceSortAscending)
      compare = (a, b) => {
        return (a.importance * 1) - (b.importance * 1);
    }
    else{
      compare = (a, b) => {
        return (b.importance * 1) - (a.importance * 1);
      }
    }
    this.importanceSortAscending = !this.importanceSortAscending;

    tasks.sort(compare);
    this.setState({
      taskList: tasks
    })
  }

  async newTask(){
    const task = (await axios.post(`/api/task`)).data;
    const tasks = [...this.state.tasks]
    tasks.push(task);
    this.setState({
      taskList: task,
      selected:{},
      newTaskView:false
    })
  }

  render(){
    // if(this.state.newTaskView){
    //   return(
    //     <NewTask newTask={this.newTask}/>
    //   ) 
      
    // }
    // if (Object.keys(this.state.selected).length === 0){
      return (
        <div id='main'>
          <table>
            <ReactHeader sortByImportance={this.sortByImportance}/>
            <TaskList tasks={this.state.taskList} select={this.select}/>
          
          </table>
        <div id='filler'></div>
        <button id="addButton" onClick={this.setNewTask}>+</button>
        
        {this.state.newTaskView ? <div id='new-task-form'><NewTask newTask={this.newTask}/></div> : <span></span>}

        {Object.keys(this.state.selected).length > 0 ? <TaskDetail task={this.state.selected} clearSelected={this.clearSelected} completeTask={this.completeTask}/> : <div></div>}
        </div>
        
      )
    // }
    // else{
    //   return(
    //     <TaskDetail task={this.state.selected} clearSelected={this.clearSelected} completeTask={this.completeTask}/>
    //   )
    // }
    
  }
}


ReactDOM.render(
  <Main/>,
  document.querySelector('#root')
)
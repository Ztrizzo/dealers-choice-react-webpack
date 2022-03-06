import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactHeader from './ReactHeader';
import TaskList from './TaskList';
import TaskDetail from './TaskDetail';

class Main extends React.Component{
  constructor(){
    super();
    this.state = {
      taskList: [],
      selected: {},
      newTaskView: false
    }

    this.select = this.select.bind(this);
    this.clearSelected = this.clearSelected.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.setNewTask = this.setNewTask.bind(this);
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
      newTaskView: true
    })
  }

  async select(id){
    const response = (await axios.get(`/api/task/${id}`)).data;

    this.setState({
      selected: response
    })
  }

  clearSelected(){
    this.setState({
      selected: {}
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
    if(this.state.newTaskView){
      return(
        <form>
          <div>Task: <input/></div>
          <div>Description: <textarea id='description-input'placeholder='This form just creates random tasks for now'/></div>
          <div>Importance: 
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div>Due Date: <input/></div>
          <button onClick={this.newTask}>Create</button>
        </form>
      )
      
    }
    else if (Object.keys(this.state.selected).length === 0){
      return (
        <div id='main'>
          <table>
            <ReactHeader/>
            <TaskList tasks={this.state.taskList} select={this.select}/>
          
          </table>
        <div id='filler'></div>
        <button id="addButton" onClick={this.setNewTask}>+</button>
  
        </div>
        
      )
    }
    else{
      return(
        <TaskDetail task={this.state.selected} clearSelected={this.clearSelected} completeTask={this.completeTask}/>
      )
    }
    
  }
}


ReactDOM.render(
  <Main/>,
  document.querySelector('#root')
)
import React from 'react';

const TaskDetail = (props) => {
  return(
    <div id="detail-view">
      <h3>{props.task.heading}</h3>
      <div>Importance: {props.task.importance}</div>
      <div>Description: {props.task.description}</div>
      <div>Due Date: {props.task.dueDate}</div>
      <button onClick={props.clearSelected}>Back</button>
      <button onClick={() => props.completeTask(props.task.id)}>Complete</button>
    </div>
  )
}

export default TaskDetail;
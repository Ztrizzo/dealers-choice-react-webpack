import React from 'react';

const TaskList = (props) => {
  return(
    <tbody>
            {props.tasks.map(task => {
              return(
                <tr key={task.id} onClick={() => props.select(task.id)}>
                  <td>{task.heading}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.importance}</td>
                </tr>
              )
            })}
        </tbody>
  )
}

export default TaskList;
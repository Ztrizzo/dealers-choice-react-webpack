import React from 'react';

const TaskList = (props) => {

  return(
    <tbody>
            {props.tasks.map(task => {
              return(
                <tr className='row' key={task.id} onClick={() => props.select(task.id)}>
                  <td>{task.heading}</td>
                  <td>{task.dueDate}</td>
                  <td>{Array(task.importance * 1).fill('\u2605').join('')}</td>
                </tr>
              )
            })}
        </tbody>
  )
}

export default TaskList;
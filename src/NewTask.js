import React from 'react';

const NewTask = (props) => {
  return (
    <form id="new-task-info">
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
          <button onClick={props.newTask}>Create</button>
        </form>
  )
}

export default NewTask;
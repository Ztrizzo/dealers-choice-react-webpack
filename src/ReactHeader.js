import React from 'react';

const ReactHeader = (props) => {
  return(
    <thead>
          <tr>
            <th className='header-sort'>Description</th>
            <th className='header-sort'>Due Date</th>
            <th className='header-sort' onClick={props.sortByImportance}>Importance</th>
          </tr>
        </thead>
  )
}

export default ReactHeader;
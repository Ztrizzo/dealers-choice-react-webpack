import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component{
  render(){
    return (
      <hr/>
    )
  }
}


ReactDOM.render(
  <Main/>,
  document.querySelector('#root')
)
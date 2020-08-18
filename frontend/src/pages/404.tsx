import React, {Component} from 'react';
import { history } from 'umi';
class NotFound extends Component{
  render(): JSX.Element{
    return (
      <div className="NotFound">
        <div className="content">
          <span className="number" >404</span>
          <p className="btnGroup" onClick={() => history.goBack()}>Back Home</p>
        </div>
        </div>
    );
  }

}


export default NotFound;

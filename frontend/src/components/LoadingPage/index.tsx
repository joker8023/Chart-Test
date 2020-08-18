import React, { Component } from 'react';
import './index.less';
interface Props{
  show: boolean;
}

class LoadingPage extends Component<Props, unknown> {
  render():JSX.Element {
    const { show = false } = this.props;

    return (
      <div className={`loadingPage ${show? show :''}`}>
      Loading <span className="dot" />
      </div>
    );
  }
}

export default LoadingPage;

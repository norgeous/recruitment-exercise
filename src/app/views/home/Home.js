import React, {
  PureComponent
}                       from 'react';
import {Weather}      from '../../components';
import cx             from 'classnames';
import { Link }       from 'react-router';

class Home extends PureComponent {
  state = {
    animated: true,
    viewEntersAnim: true
  };

  render() {
    const { animated, viewEntersAnim } = this.state;
    return(
      <div
        key="homeView"
        className={cx({
          'animatedViews': animated,
          'view-enter': viewEntersAnim
        })}>
        <Weather for="London"/>
        <hr/>
        <Weather for="Alaska"/>
        <hr/>
        <Weather for="Cuba"/>
      </div>
    );
  }
}

export default Home;

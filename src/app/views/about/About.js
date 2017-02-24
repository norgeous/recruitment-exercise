import React, {
  PureComponent
}                     from 'react';
import AnimatedView   from '../../components/animatedView/AnimatedView';

import {Weather}      from '../../components';

class About extends PureComponent {
  render() {
    return(
      <AnimatedView>
        <h1>
          About
        </h1>

        <Weather for="Cuba"/>
      </AnimatedView>
    );
  }
}

export default About;

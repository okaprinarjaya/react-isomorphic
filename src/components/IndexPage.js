import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AthletePreview from './AthletePreview';

class IndexPage extends React.Component {
  render() {
    const { athletes } = this.props;
    if (!athletes || isEmpty(athletes)) {
      return (
        <div></div>
      )
    }
    return (
      <div className="home">
        <div className="athletes-selector">
          {athletes.map(athleteData => <AthletePreview key={athleteData.id} {...athleteData} />)}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    athletes: state.athletes
  })
)(IndexPage);

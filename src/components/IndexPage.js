import React from 'react';
import { connect } from 'react-redux';
import AthletePreview from './AthletePreview';

class IndexPage extends React.Component {
  render() {
    const { athletes } = this.props;
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

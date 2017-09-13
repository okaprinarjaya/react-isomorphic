import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {getAthlete} from "../actions";

import NotFoundPage from './NotFoundPage';
import AthletesMenu from './AthletesMenu';
import Medal from './Medal';
import Flag from './Flag';
import isEmpty from 'lodash/isEmpty';

const AthletePageDumb = props => {
  const {athletes, athleteDetail: athlete} = props;
  if (!athlete || isEmpty(athlete)) {
    return (<NotFoundPage/>);
  }

  const headerStyle = {backgroundImage: `url(/img/${athlete.cover})`};

  return <div className="athlete-full">
    <AthletesMenu athletes={athletes}/>
    <div className="athlete">
      <header style={headerStyle}></header>

      <div className="picture-container">
        <img src={`/img/${athlete.image}`}/>
        <h2 className="name">{athlete.name}</h2>
      </div>

      <section className="description">
        Olympic medalist from <strong><Flag code={athlete.country} showName={true}/></strong>,
        born in {athlete.birth} (Find out more on <a href={athlete.link} target="_blank">Wikipedia</a>).
      </section>

      {athlete.medals && athlete.medals.length ? <section className="medals">
        <p>The Awesome Winner of <strong>{athlete.medals.length}</strong> medals:</p>
        <ul>
          {athlete.medals.map((medal, i) => <Medal key={i} {...medal} />)}
        </ul>
      </section> : null}
    </div>

    <div className="navigateBack">
      <Link to="/">Back to the index</Link>
    </div>
  </div>
}

const withAthlete = WrappedComponent => {
  return connect(
    state => ({
      athletes: state.athletes,
      athleteDetail: state.athleteDetail
    }),
    dispatch => ({
      getAthlete: athleteId => dispatch(getAthlete(athleteId))
    })
  )(class AthletePage extends Component {
    componentWillMount() {
      this.props.getAthlete(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.params.id !== this.props.params.id) {
        this.props.getAthlete(nextProps.params.id);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  });
}


export default withAthlete(AthletePageDumb)

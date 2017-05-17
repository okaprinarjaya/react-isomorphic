import React from 'react';

const typeMap = {
  'G': 'Gold',
  'S': 'Silver',
  'B': 'Bronze'
};

export default class Medal extends React.Component {
  render() {
    return (
      <li className="medal">
        <span className={`symbol symbol-${this.props.type}`} title={typeMap[this.props.type]}>{this.props.type}</span>
        <span className="year">{this.props.year}</span>&nbsp;
        <span className="city">{this.props.city}</span>&nbsp;
        <span className="event">({this.props.event})</span>&nbsp;
        <span className="category">{this.props.category}</span>&nbsp;
      </li>
    );
  }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBack extends Component {
  render() {
    const data = JSON.parse(localStorage.getItem('ranking'));
    const { scoreTotal } = this.props;
    return (
      <>
        <p data-testid="feedback-text">FeedBack</p>
        <header>
          <img
            src={ data[0].picture }
            alt="Imagem-Token"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{data[0].name}</p>
          <p data-testid="header-score">{scoreTotal}</p>
        </header>

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  scoreTotal: state.player.score,
});

FeedBack.propTypes = {
  scoreTotal: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FeedBack);

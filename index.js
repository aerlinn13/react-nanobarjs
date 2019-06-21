import Nanobar from 'nanobar';
import React from 'react';
import PropTypes from 'prop-types';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.placeholder = null;
    this.nanobar = null;
    this.state = { progress: null };
  }

  componentDidMount() {
    const { progress, mountOnBody, className } = this.props;

    const nanobar = (this.nanobar = new Nanobar({
      classname: className,
      target: mountOnBody ? null : this.placeholder.parentNode,
    }));

    nanobar.go(progress);
  }

  componentWillUnmount() {
    const { el } = this.nanobar;
    el.parentNode.removeChild(el);
  }

  componentWillReceiveProps(props) {
    this.nanobar.go(props.progress);
  }

  render() {
    return (
      <span
        ref={(c) => {
          this.placeholder = c;
        }}
      />
    );
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  mountOnBody: PropTypes.bool,
  className: PropTypes.string,
};

export default ProgressBar;

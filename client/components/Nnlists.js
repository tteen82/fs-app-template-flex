import React from 'react';
import { connect } from 'react-redux';
import { setNnlists } from '../store';
import NnCard from './NnCard';
import { Link, Switch, Route } from 'react-router-dom';

/**
 * COMPONENT
 */
class Nnlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nnList: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.setNnlists(this.props.auth.id);
  }
  componentDidUpdate() {
    if (this.state.nnList === null) {
      this.setState({ nnList: this.props.nnLists });
    }
  }

  handleClick(e) {
    e.preventDefault();
    const action = e.target.value;
    if (action === 'all') this.setState({ nnList: this.props.nnLists });
    if (action === 'nice')
      this.setState({
        nnList: this.props.nnLists.filter((list) => list.isNice === true),
      });
    if (action === 'naughty')
      this.setState({
        nnList: this.props.nnLists.filter((list) => list.isNaughty === true),
      });
  }
  render() {
    const nnLists = this.state.nnList || [];
    const { handleClick } = this;
    return (
      <div>
        <form onClick={handleClick}>
          <button value="all">Show All</button>
          <button value="nice">Show Nice</button>
          <button value="naughty">Show Naughty</button>
        </form>
        <ul>
          {nnLists.map((list) => (
            <li key={list.id}>
              <Link
                to={{
                  pathname: `/home/nnlists/${list.id}`,
                  state: {
                    list,
                  },
                }}
              >
                <NnCard list={list} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
/**
 * CONTAINER
 */

const mapDispatchToProps = (dispatch) => ({
  setNnlists: (id) => {
    dispatch(setNnlists(id));
  },
});

export default connect((state) => state, mapDispatchToProps)(Nnlists);

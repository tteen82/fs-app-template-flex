import React from 'react';
import { connect } from 'react-redux';
import { setNnlists, setSantaLists, me } from '../store';
import NnCard from './NnCard';
import { Link, Switch, Route } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
    if (this.props.auth.username === 'santa') {
      this.props.setSantaLists();
    } else {
      this.props.setNnlists(this.props.auth.id);
    }
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
      <Box
        sx={{
          padding: '0.5rem',
        }}
      >
        <form onClick={handleClick}>
          <Button
            value="all"
            sx={{ backgroundColor: '#27AE60', color: '#2C3E50', margin: 0.5 }}
          >
            Show All
          </Button>
          <Button
            value="nice"
            sx={{ backgroundColor: '#27AE60', color: '#2C3E50', margin: 0.5 }}
          >
            Show Nice
          </Button>
          <Button
            value="naughty"
            sx={{ backgroundColor: '#27AE60', color: '#2C3E50', margin: 0.5 }}
          >
            Show Naughty
          </Button>
        </form>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {nnLists.map((list) => (
            <Link
              key={list.id}
              to={{
                pathname: `/home/nnlists/${list.id}`,
                state: {
                  list,
                },
              }}
            >
              <NnCard list={list} />
            </Link>
          ))}
        </Box>
      </Box>
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
  setSantaLists: () => {
    dispatch(setSantaLists());
  },
  loadInitialData: () => {
    dispatch(me());
  },
});

export default connect((state) => state, mapDispatchToProps)(Nnlists);

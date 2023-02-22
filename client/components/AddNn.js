import React from 'react';
import { connect } from 'react-redux';
import { addNnlist } from '../store';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
/**
 * COMPONENT
 */
class AddNn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nnTitle: '',
      description: '',
      isNice: false,
      isNaughty: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.nnTitle === '') {
      alert('It needs Title');
    } else if (
      this.state.isNice === 'true' &&
      this.state.isNaughty === 'true'
    ) {
      alert('Was it Nice or Naughty? Choose just One');
    } else {
      this.props.addNnlist(this.props.auth.id, this.state);
      this.props.history.push('./');
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { handleSubmit, handleChange } = this;
    const { isNice } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit} className="campusCreateForm">
          <label htmlFor="title">Title</label>
          <input
            name="nnTitle"
            placeholder="Title"
            onChange={handleChange}
          ></input>
          <label htmlFor="description">description</label>
          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
          ></input>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  name="isNice"
                  value={this.state.isNice === 'true' ? false : true}
                  icon={<ThumbUpOffAltIcon />}
                  checkedIcon={<ThumbUpAltIcon />}
                />
              }
              label="Nice"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  name="isNaughty"
                  value={this.state.isNaughty === 'true' ? false : true}
                  icon={<ThumbDownOffAltIcon />}
                  checkedIcon={<ThumbDownAltIcon />}
                />
              }
              label="Naughty"
            />
          </div>
          <button>Create</button>
        </form>
      </div>
    );
  }
}
/**
 * CONTAINER
 */

const mapDispatchToProps = (dispatch) => ({
  addNnlist: (id, data) => {
    dispatch(addNnlist(id, data));
  },
});

export default connect((state) => state, mapDispatchToProps)(AddNn);

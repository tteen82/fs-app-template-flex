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
import BorderColorIcon from '@mui/icons-material/BorderColor';
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
      <Box>
        <form onSubmit={handleSubmit}>
          <TextField
            id="title"
            label="Title"
            name="nnTitle"
            onChange={handleChange}
            sx={{
              width: 320,
            }}
          />
          <TextField
            id="description"
            label="Description"
            name="description"
            onChange={handleChange}
            sx={{
              width: 320,
            }}
          />
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
          <Button
            variant="contained"
            endIcon={<BorderColorIcon />}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </form>
      </Box>
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

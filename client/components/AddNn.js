import React from 'react';
import { connect } from 'react-redux';
import { addNnlist } from '../store';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
      isNice: 'false',
      isNaughty: 'false',
      myImage: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
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
    } else if (
      this.state.isNice === 'false' &&
      this.state.isNaughty === 'false'
    ) {
      alert('Was it Nice or Naughty? Choose One');
    } else {
      const formData = new FormData();
      formData.append('myImage', this.state.myImage);
      formData.append('nnTitle', this.state.nnTitle);
      formData.append('description', this.state.description);
      formData.append('isNice', this.state.isNice);
      formData.append('isNaughty', this.state.isNaughty);
      this.props.addNnlist(this.props.auth.id, formData);
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFileUpload(e) {
    this.setState({ myImage: e.target.files[0] });
  }

  render() {
    const { handleSubmit, handleChange, handleFileUpload } = this;
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
          <input
            type="file"
            label="Image"
            name="myFile"
            accept=".jpeg, .png, .jpg"
            onChange={handleFileUpload}
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
  meAgain: (id) => {
    dispatch(meAgain(id));
  },
});

export default connect((state) => state, mapDispatchToProps)(AddNn);

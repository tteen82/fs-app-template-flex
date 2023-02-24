import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../store';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';
/**
 * COMPONENT
 */
class SantaPower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.setUser(this.state.name);
    this.setState({ name: '' });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const user = this.props.santaPower;
    const { handleSubmit, handleChange } = this;
    return (
      <Box
        sx={{
          width: 450,
          backgroundColor: '#F2F4F4',
          margin: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
        }}
      >
        <Typography variant="h5" component="div">
          only for you Santa!
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 400,
            margin: 1,
            padding: 1,
          }}
        >
          <TextField
            id="name"
            label="Put Name"
            name="name"
            value={this.state.name}
            onChange={handleChange}
            sx={{
              width: 320,
            }}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
          ></Button>
        </Box>
        <Divider />
        {user.id ? (
          <List>
            <ListItem>
              <ListItemText primary="Name" secondary={user.username} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Nice Point" secondary={user.nicePoint} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Naughty Point"
                secondary={user.naughtyPoint}
              />
            </ListItem>
          </List>
        ) : (
          ''
        )}
      </Box>
    );
  }
}
/**
 * CONTAINER
 */

const mapDispatchToProps = (dispatch) => ({
  setUser: (name) => {
    dispatch(setUser(name));
  },
});

export default connect((state) => state, mapDispatchToProps)(SantaPower);

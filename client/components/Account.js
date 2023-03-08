import React from 'react';
import { connect } from 'react-redux';
import { updateAuth } from '../store';
import SantaPower from './SantaPower';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import SendIcon from '@mui/icons-material/Send';
/**
 * COMPONENT
 */
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: '', isShow: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.setState(this.props.auth);
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password === '') {
      alert('It needs password');
    } else {
      this.props.updateAuth(this.state);
      this.setState({ password: '', isShow: false });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { username, password, naughtyPoint, nicePoint, isShow } = this.state;
    const currentPassword = this.props.auth.password;
    const { handleSubmit, handleChange } = this;
    return (
      <Box>
        <Card
          sx={{
            backgroundColor: '#F2F4F4',
            margin: 1,
            padding: 2,
            margin: 'auto',
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {username}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {currentPassword}
            </Typography>
            <Typography variant="body2">
              How nice ? {nicePoint} {nicePoint > 1 ? 'points' : 'point'}
              <br />
              How naughty ? {naughtyPoint}{' '}
              {naughtyPoint > 1 ? 'points' : 'point'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={(e) => {
                e.preventDefault;
                if (isShow === false) {
                  this.setState({ isShow: true });
                } else {
                  this.setState({ isShow: false });
                }
              }}
            >
              Change Password
            </Button>
          </CardActions>
        </Card>
        {isShow ? (
          <form>
            <TextField
              id="password"
              label="new Password"
              name="password"
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
          </form>
        ) : (
          ''
        )}
        {this.props.auth.isAdmin ? <SantaPower /> : ''}
      </Box>
    );
  }
}
/**
 * CONTAINER
 */

const mapDispatchToProps = (dispatch) => ({
  updateAuth: (data) => {
    dispatch(updateAuth(data));
  },
});

export default connect((state) => state, mapDispatchToProps)(Account);

import React from 'react';
import { connect } from 'react-redux';
import { setComments, addComment, deleteComment } from '../store';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
/**
 * COMPONENT
 */
class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.setComments(this.props.id);
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.comment === '') {
      alert('It needs comment');
    } else {
      this.props.addComment(this.props.id, this.props.auth.id, this.state);
      this.setState({ comment: '' });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { comments, deleteComment } = this.props;
    const { handleSubmit, handleChange } = this;
    return (
      <Box sx={{ width: 400 }}>
        {comments.map((comment) => (
          <Paper
            key={comment.id}
            sx={{
              width: 400,
              margin: 1,
              padding: 1,
              backgroundColor: '#FDF2E9',
            }}
          >
            {comment.user.username} - {comment.comment}
          </Paper>
        ))}
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
            id="comment"
            label="Add Comment"
            name="comment"
            value={this.state.comment}
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
      </Box>
    );
  }
}
/**
 * CONTAINER
 */

const mapDispatchToProps = (dispatch) => ({
  setComments: (id) => {
    dispatch(setComments(id));
  },
  addComment: (listId, userId, data) => {
    dispatch(addComment(listId, userId, data));
  },
  deleteComment: (id) => {
    dispatch(deleteComment(id));
  },
});

export default connect((state) => state, mapDispatchToProps)(Comments);

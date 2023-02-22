import React from 'react';
import { connect } from 'react-redux';
import { deleteNnList } from '../store';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

/**
 * COMPONENT
 */
export const SingleNn = (props) => {
  const { list } = props.location.state;
  const { deleteNnList } = props;
  return (
    <Box>
      <Card sx={{ maxWidth: 345, margin: 1, padding: 1 }}>
        <CardMedia sx={{ height: 140 }} image={list.imageUrl} title="image" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {list.nnTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {list.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Thumbs Up</Button>
          <Button size="small">ADD Comments</Button>
          <Button
            size="small"
            onClick={() => {
              deleteNnList(list.id);
              props.history.push('../');
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      {list.comments.map((comment) => (
        <Paper key={comment.id} sx={{ maxWidth: 345, margin: 1, padding: 1 }}>
          {comment.comment}
        </Paper>
      ))}
    </Box>
  );
};

/**
 * CONTAINER
 */

const mapDispatchToProps = (dispatch) => ({
  deleteNnList: (id) => {
    dispatch(deleteNnList(id));
  },
});

export default connect((state) => state, mapDispatchToProps)(SingleNn);

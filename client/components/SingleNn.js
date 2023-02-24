import React from 'react';
import { connect } from 'react-redux';
import { deleteNnList } from '../store';
import Comments from './Comments';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import timeAgo from 'node-time-ago';

/**
 * COMPONENT
 */
export const SingleNn = (props) => {
  const { list } = props.location.state;
  const { deleteNnList } = props;
  return (
    <Box>
      <Card
        sx={{ width: 400, margin: 1, padding: 1, backgroundColor: '#F9EBEA' }}
      >
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            endIcon={<ClearIcon />}
            size="small"
            onClick={() => {
              deleteNnList(list.id);
              props.history.push('../');
            }}
          >
            Delete
          </Button>
        </CardActions>
        <CardMedia
          sx={{ height: 300, width: 300, margin: 'auto' }}
          image={list.imageUrl}
          title="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {list.nnTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {list.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {timeAgo(list.createdAt)}
          </Typography>
        </CardContent>
      </Card>
      <Comments id={list.id} />
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

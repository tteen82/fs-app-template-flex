import React from 'react';
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
export const NnCard = ({ list }) => {
  const { nnTitle, isNice } = list;
  const comments = list.comments || [];
  return (
    <Box>
      <Card
        sx={{
          width: 400,
          height: 400,
          margin: 1,
          padding: 1,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {nnTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isNice ? 'Nice' : 'Naughty'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            comments({comments.length})
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

/**
 * CONTAINER
 */

export default NnCard;

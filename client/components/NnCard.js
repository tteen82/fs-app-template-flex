import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import timeAgo from 'node-time-ago';
/**
 * COMPONENT
 */
export const NnCard = ({ list }) => {
  const { nnTitle, isNice, createdAt, user } = list;
  const comments = list.comments || [];
  return (
    <Box>
      {isNice ? (
        <Card
          sx={{
            margin: 1,
            padding: 1,
            backgroundColor: '#D4EFDF',
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {nnTitle}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {isNice ? 'Nice' : 'Naughty'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              comments({comments.length})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {timeAgo(createdAt)}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            margin: 1,
            padding: 1,
            backgroundColor: '#F1948A',
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {nnTitle}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {isNice ? 'Nice' : 'Naughty'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              comments({comments.length})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {timeAgo(createdAt)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

/**
 * CONTAINER
 */

export default NnCard;

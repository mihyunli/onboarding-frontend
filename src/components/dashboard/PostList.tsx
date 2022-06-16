import React from 'react';

// @mui
import { Typography, Card, CardContent, CardMedia, Box } from '@mui/material';

interface IPostType {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  authorId: number;
  author: IAuthorType;
}

interface IAuthorType {
  id: number;
  username: string;
  createdAt: string;
  email: number;
}

interface IpropsType {
  post: IPostType;
}

export default function PostList({ post }: IpropsType) {
  const truncate = (key: string, text: string) => {
    if (key === 'title' && text.length > 50) return text.substring(0, 50) + '...';
    if (key === 'body' && text.length > 270) return text.substring(0, 270) + '...';
    return text;
  };

  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: '12px',
        padding: '1rem',
        height: '180px',
        alignItems: 'center',
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 151, padding: '1rem' }}
        image="/assets/illustrations/illustration_invite.png"
        alt={post.title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '3rem' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            component="div"
            variant="h4"
            style={{
              marginBottom: '6px',
            }}
          >
            {truncate('title', post.title)}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            style={{
              fontSize: '12px',
              color: '#9e9e9e',
              marginBottom: '6px',
            }}
          >
            {`${post.author.username} / ${post.createdAt}`}
          </Typography>
          <Typography color="text.secondary" component="div" style={{ color: '#616161' }}>
            {truncate('body', post.body)}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

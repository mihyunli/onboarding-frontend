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
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/assets/illustrations/illustration_invite.png"
        alt={post.title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {post.body}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            작성자: {post.author.username}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            작성일: {post.createdAt}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

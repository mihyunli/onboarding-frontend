import { useEffect, useState } from 'react';

// apis
import { getAllPosts } from '../../api/blog';

// @mui
import { Typography, Button, Box, Paper } from '@mui/material';

// hooks
import { useNavigate, Link } from 'react-router-dom';

// components
import PostList from '../../components/dashboard/PostList';

// ----------------------------------------------------------------------

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

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    const setBlogPosts = async () => {
      const posts = await getAllPosts();
      console.log('res', posts);
      setPosts(posts);
    };

    setBlogPosts();
  }, []);

  const moveToWritingPage = () => {
    navigation('/dashboard/create');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: '100%',
            height: 200,
          },
        }}
      >
        <Paper elevation={3}>Hero</Paper>
      </Box>
      <Typography variant="h5" component="div" gutterBottom>
        최근 글 목록
      </Typography>
      <Button variant="contained" onClick={moveToWritingPage}>
        글쓰기
      </Button>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: '100%',
            height: 120,
          },
        }}
      >
        {posts.map((post: IPostType) => (
          <Link to={`/dashboard/${post.id}`} key={post.id}>
            <PostList post={post} />
          </Link>
        ))}
      </Box>
    </>
  );
}

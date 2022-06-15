import { useEffect, useState } from 'react';

// apis
import { getAllPosts } from '../../api/blog';

// @mui
import { Typography, Button, Card, CardContent, CardMedia, Box, Paper } from '@mui/material';

// hooks
import { useNavigate, Link } from 'react-router-dom';

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

const BlogListComponent = ({ post }: any) => (
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
            <BlogListComponent post={post} />
          </Link>
        ))}
      </Box>
    </>
  );
}

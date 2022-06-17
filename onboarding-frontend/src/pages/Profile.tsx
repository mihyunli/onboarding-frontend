import { useEffect, useState } from 'react';
// apis
import { getAllPosts } from '../api/blog';
// @mui
import { Box, Grid, Avatar, Typography, Skeleton } from '@mui/material';
// hooks
import { Link, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import PostListCard from '../components/dashboard/PostListCard';

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

export default function Profile() {
  const { user } = useAuth();

  const usesrId = useParams().id || '';

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const setMyBlogPosts = async () => {
    try {
      const posts = await getAllPosts();
      const myPosts = posts.filter((post: IPostType) => parseInt(usesrId) === post.author.id);
      setPosts(myPosts);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setMyBlogPosts();
  }, []);

  return (
    <>
      <Typography variant="h2" component="div" gutterBottom align="center">
        프로필
      </Typography>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar
          src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg"
          alt="Rayan Moran"
          style={{
            width: '75px',
            height: '75px',
            marginBottom: '10px',
          }}
        />
        <Typography gutterBottom variant="h5" component="div">
          {user && user.username}
        </Typography>
        <Typography component="div" color="text.secondary">
          {user && user.email}
        </Typography>
        <Box>
          <Typography
            variant="h4"
            component="div"
            style={{
              marginBottom: '16px',
            }}
          >
            내가 작성한 글
          </Typography>

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {posts.map((post: IPostType) => (
              <Grid item xs={2} sm={3} md={4} key={post.id}>
                {loading ? (
                  <>
                    <Skeleton variant="rectangular" width={300} height={180} />
                    <Skeleton width="60%" />
                    <Skeleton width={300} />
                  </>
                ) : (
                  <Link
                    to={`/dashboard/${post.id}`}
                    key={post.id}
                    style={{ textDecoration: 'none' }}
                  >
                    <PostListCard post={post} />
                  </Link>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

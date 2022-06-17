import React, { useEffect, useState, KeyboardEvent } from 'react';
// apis
import { getAllPosts } from '../../api/blog';
// @mui
import {
  Typography,
  Button,
  Box,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Card,
  CardMedia,
} from '@mui/material';
// hooks
import { useNavigate, Link } from 'react-router-dom';
// config
import { ICON } from '../../config';
// components
import PostList from '../../components/dashboard/PostList';
import Iconify from '../../components/Iconify';

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
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [noResult, setNoResult] = useState(false);

  const navigation = useNavigate();

  const setBlogPosts = async () => {
    try {
      const posts = await getAllPosts();
      setPosts(posts);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setBlogPosts();
  }, []);

  const handleKeywordChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSearchKeyword(value);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await setBlogPosts();
    setNoResult(false);
    const searchResult = posts.filter((post: IPostType) => post.title.includes(searchKeyword));
    searchResult.length === 0 ? setNoResult(true) : setPosts(searchResult);
  };

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
        <Paper
          elevation={3}
          style={{
            backgroundImage: 'linear-gradient(to right, #2193b0, #6dd5ed)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2" component="div">
            Awsome Blog
          </Typography>
          <Box style={{ display: 'flex' }}>
            <form onSubmit={handleSearch}>
              <TextField
                type="text"
                placeholder="검색어를 입력하세요"
                name="searchKeyword"
                value={searchKeyword}
                variant="standard"
                style={{ marginBottom: '8px', background: 'white' }}
                onChange={handleKeywordChange}
              />
              <Button type="submit" name="submit" variant="outlined">
                검색
              </Button>
            </form>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '16px',
          paddingRight: '8px',
        }}
      >
        <Typography variant="h5" component="div">
          최근 글 목록
        </Typography>
        <Button variant="contained" color="info" onClick={moveToWritingPage}>
          <Iconify
            icon="icon-park-outline:write"
            sx={{
              mr: 0.5,
              width: ICON.NAVBAR_ITEM_HORIZONTAL,
              height: 16,
            }}
          />
          글쓰기
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: '100%',
          },
        }}
      >
        {loading ? (
          <>
            <Stack spacing={2}>
              <Skeleton animation="wave" variant="rectangular" height="100px" />
              <Skeleton animation="wave" variant="rectangular" height="100px" />
              <Skeleton animation="wave" variant="rectangular" height="100px" />
            </Stack>
          </>
        ) : noResult ? (
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
              image="/assets/illustrations/illustration_login.png"
              alt="no-result"
            />
            <Typography component="div" variant="subtitle1">
              검색 결과가 없습니다
            </Typography>
          </Card>
        ) : (
          posts.map((post: IPostType) => (
            <Link to={`/dashboard/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
              <PostList post={post} />
            </Link>
          ))
        )}
      </Box>
    </>
  );
}

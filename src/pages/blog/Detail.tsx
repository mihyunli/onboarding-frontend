import React, { useState, useEffect } from 'react';
// apis
import { createPost, getAllPosts, updatePost, deletePost } from '../../api/blog';
// hooks
import { useNavigate, useParams } from 'react-router-dom';
// components
import EditForm from '../../components/dashboard/EditForm';
import DetailPost from '../../components/dashboard/DetailPost';

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

function BlogDetail({ postData }: any) {
  const navigation = useNavigate();
  const postId = useParams().id || '';

  const [mode, setMode] = useState('create');
  const [post, setPost] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    // TODO: props 데이터를 갖고 넘어온경우 props로, 없으면 API 조회로.
    if (!postId) return;
    setMode('read');
    getBlogPostDetail();
  }, []);

  const getBlogPostDetail = async () => {
    const posts = await getAllPosts();
    const detail = posts.filter((p: IPostType) => postId && p.id === parseInt(postId))[0];
    setPost(detail);
  };

  const handelSave = async () => {
    if (!post.title || !post.body) return alert('제목 또는 내용을 입력하세요.');
    if (mode === 'create') await createPost(post);
    else if (mode === 'modify') await updatePost(post, postId);

    navigation('/dashboard');
  };

  const hadleChange = (e: React.ChangeEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleDelete = async () => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    await deletePost(postId || '');
    navigation('/dashboard');
  };

  const moveToDashboard = () => {
    navigation('/dashboard');
  };

  return (
    <>
      {mode === 'read' ? (
        <DetailPost
          post={post}
          moveToDashboard={moveToDashboard}
          setMode={setMode}
          handleDelete={handleDelete}
        />
      ) : (
        <EditForm
          mode={mode}
          post={post}
          hadleChange={hadleChange}
          moveToDashboard={moveToDashboard}
          handelSave={handelSave}
        />
      )}
    </>
  );
}

export default BlogDetail;

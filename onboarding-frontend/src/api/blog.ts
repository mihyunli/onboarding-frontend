import httpClient from '../utils/axios';
// ----------------------------------------------------------------------

export const URLS = {
  POST: `/blog/post`,
  POSTS: `/blog/posts`,
};

interface IPostType {
  title: string;
  body: string;
}

export async function getAllPosts(): Promise<any> {
  const { data } = await httpClient({
    method: 'GET',
    url: URLS.POSTS,
  });
  return data;
}

export async function createPost(form: IPostType): Promise<any> {
  const { data } = await httpClient({
    method: 'POST',
    url: URLS.POST,
    data: { ...form },
  });
  return data;
}

export async function updatePost(form: IPostType, postId: string): Promise<any> {
  const { data } = await httpClient({
    method: 'PUT',
    url: `${URLS.POST}/${postId}`,
    data: { ...form },
  });
  return data;
}

export async function deletePost(postId: string): Promise<any> {
  const { data } = await httpClient({
    method: 'DELETE',
    url: `${URLS.POST}/${postId}`,
  });
  return data;
}

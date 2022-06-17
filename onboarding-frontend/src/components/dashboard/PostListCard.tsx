import { Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';

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

interface IPropsType {
  post: IPostType;
}

export default function PostListCard({ post }: IPropsType) {
  const truncate = (key: string, text: string) => {
    if (key === 'title' && text.length > 50) return text.substring(0, 50) + '...';
    if (key === 'body' && text.length > 110) return text.substring(0, 110) + '...';
    return text;
  };

  return (
    <Card sx={{ maxWidth: 345, height: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/assets/illustrations/illustration_login.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {truncate('title', post.title)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {truncate('body', post.body)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

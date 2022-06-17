// mui
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface IAuthorType {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

interface IPropsType {
  author: IAuthorType;
}

export default function ProfileCard({ author }: IPropsType) {
  const navigation = useNavigate();

  const moveToProfilePage = () => {
    navigation(`/dashboard/user/${author.id}`);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} variant="subtitle1" color="text.secondary" gutterBottom>
          작성자
        </Typography>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Box style={{ marginRight: '20px' }}>
            <Avatar
              src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg"
              alt="Rayan Moran"
            />
            <Typography variant="h5" component="div">
              {author.username}
            </Typography>
          </Box>
          <Box style={{}}>
            <Container>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {author.email}
              </Typography>
              <Typography variant="body2">Life is awesome.</Typography>
              <CardActions disableSpacing={true}>
                <Button size="small" onClick={moveToProfilePage}>
                  프로필 보기
                </Button>
              </CardActions>
            </Container>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

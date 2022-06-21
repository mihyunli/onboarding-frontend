// mui
import { Button, Typography, Box, Card, CardContent, CardActions, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LetterAvatar from './LetterAvatar';

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
    navigation(`/user/${author.id}`);
  };

  return (
    <Card sx={{ minWidth: 275, paddingLeft: '8px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          작성자
        </Typography>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: '20px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '180px',
            }}
          >
            <LetterAvatar name={author.username} styleOptions={{ width: 56, height: 56 }} />
            <Typography
              variant="subtitle1"
              component="div"
              style={{
                marginTop: '6px',
              }}
              color="text.primary"
            >
              {author.username}
            </Typography>
          </Box>
          <Container>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {author.email}
            </Typography>
            <Typography variant="body2">Life is awesome.</Typography>
            <CardActions style={{ paddingLeft: '0px' }}>
              <Button style={{ paddingLeft: '0px' }} onClick={moveToProfilePage}>
                프로필 보기
              </Button>
            </CardActions>
          </Container>
        </Box>
      </CardContent>
    </Card>
  );
}

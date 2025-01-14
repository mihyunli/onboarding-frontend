import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import LetterAvatar from '../../../components/dashboard/LetterAvatar';
// hooks
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    title: '블로그',
    label: 'dashboard',
    linkTo: '/dashboard',
  },
  {
    title: '프로필',
    label: 'profile',
    linkTo: '',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const navigation = useNavigate();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation('/login');
  };

  const moveToProfilePage = (linkTo: string) => {
    navigation(linkTo);
    handleClose();
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <LetterAvatar name={user?.username} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user && user.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user && user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => {
            if (option.label === 'profile') option.linkTo = `/user/${user?.id}`;
            return (
              <MenuItem key={option.label} onClick={() => moveToProfilePage(option.linkTo)}>
                {option.title}
              </MenuItem>
            );
          })}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ m: 1 }} onClick={handleLogout}>
          로그아웃
        </MenuItem>
      </MenuPopover>
    </>
  );
}

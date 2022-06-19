// mui
import { Avatar } from '@mui/material';

export default function LetterAvatar({ name, styleOptions }: any) {
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string = 'undifiend') {
    return {
      sx: {
        bgcolor: stringToColor(name),
        ...styleOptions,
      },
      children: `${name[0]}`,
    };
  }

  return (
    <>
      <Avatar {...stringAvatar(name)} />
    </>
  );
}

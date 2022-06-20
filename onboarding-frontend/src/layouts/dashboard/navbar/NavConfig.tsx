// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '대시보드',
    items: [
      { title: '블로그', label: 'dashboard', path: '/dashboard', icon: ICONS.dashboard },
      { title: '프로필', label: 'profile', path: '/dashboard/user', icon: ICONS.user },
    ],
  },
];

export default navConfig;

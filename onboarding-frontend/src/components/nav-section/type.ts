import { ReactElement } from 'react';
import { BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export type NavListProps = {
  title: string;
  path: string;
  label?: string;
  icon?: ReactElement;
  info?: ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: {
    title: string;
    path: string;
    children?: { title: string; path: string }[];
  }[];
};

export type NavItemProps = {
  item: NavListProps;
  isCollapse?: boolean;
  active?: boolean | undefined;
  open?: boolean;
  onOpen?: VoidFunction;
  onMouseEnter?: VoidFunction;
  onMouseLeave?: VoidFunction;
};

export interface NavSectionProps extends BoxProps {
  isCollapse?: boolean;
  navConfig: {
    subheader: string;
    items: NavListProps[];
  }[];
}

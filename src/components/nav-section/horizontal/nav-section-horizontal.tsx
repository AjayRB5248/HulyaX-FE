import { memo } from 'react';
// @mui
import Stack from '@mui/material/Stack';
// theme
import { hideScroll } from 'src/theme/css';
//
import { NavSectionProps, NavListProps, NavConfigProps } from '../types';
import { navHorizontalConfig } from '../config';
import NavList from './nav-list';

// ----------------------------------------------------------------------

function NavSectionHorizontal({ data, config, sx, ...other }: NavSectionProps) {
  data.forEach((section) => {
    section.items = section.items.filter((item) => item.show !== false);
  });
  return (
    <Stack
      direction="row"
      sx={{
        mx: 'auto',
        ...hideScroll.y,
        ...sx,
      }}
      {...other}
    >
      {data.filter((d) => d.show).map((group, index) => (
        <Group
          key={group.subheader || index}
          items={group.items}
          config={navHorizontalConfig(config)}
        />
      ))}
    </Stack>
  );
}

export default memo(NavSectionHorizontal);

// ----------------------------------------------------------------------

type GroupProps = {
  items: NavListProps[];
  config: NavConfigProps;
};

function Group({ items, config }: GroupProps) {
  return (
    <>
      {items.filter((d) => d.show).map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </>
  );
}

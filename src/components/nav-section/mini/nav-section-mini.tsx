import { memo } from 'react';
import Stack from '@mui/material/Stack';
//
import { NavSectionProps, NavListProps, NavConfigProps } from '../types';
import { navMiniConfig } from '../config';
import NavList from './nav-list';

// ----------------------------------------------------------------------

function NavSectionMini({ data, config, sx, ...other }: NavSectionProps) {
  data.forEach((section) => {
    section.items = section.items.filter((item) => item.show !== false);
  });
  return (
    <Stack sx={sx} {...other}>
      {data.filter((d) => d.show).map((group, index) => (
        <Group key={group.subheader || index} items={group.items} config={navMiniConfig(config)} />
      ))}
    </Stack>
  );
}

export default memo(NavSectionMini);

// ----------------------------------------------------------------------

type GroupProps = {
  items: NavListProps[];
  config: NavConfigProps;
};

function Group({ items, config }: GroupProps) {
  return (
    <>
      {items.map((list) => (
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

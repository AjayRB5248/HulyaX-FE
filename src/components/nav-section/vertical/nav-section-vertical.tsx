import { memo, useCallback, useState } from 'react';
// @mui
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
//
import { navVerticalConfig } from '../config';
import { NavConfigProps, NavListProps, NavSectionProps } from '../types';
import { StyledSubheader } from './styles';

import NavList from './nav-list';

// ----------------------------------------------------------------------

function NavSectionVertical({ data, config, sx, ...other }: NavSectionProps) {
  data.forEach((section) => {
    section.items = section.items.filter((item) => item.show !== false);
  });

  return (
    <Stack sx={sx} {...other}>
      {data
        .filter((d) => d.show === true)
        .map((group, index) => {
          return (
            <Group
              key={group.subheader || index}
              subheader={group.subheader}
              items={group.items}
              config={navVerticalConfig(config)}
            />
          );
        })}
    </Stack>
  );
}

export default memo(NavSectionVertical);

// ----------------------------------------------------------------------

type GroupProps = {
  subheader: string;
  items: NavListProps[];
  config: NavConfigProps;
};

function Group({ subheader, items, config }: GroupProps) {
  const [open, setOpen] = useState(true);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const renderContent = items.map((list) => (
    <NavList
      key={list.title + list.path}
      data={list}
      depth={1}
      hasChild={!!list.children}
      config={config}
    />
  ));

  return (
    <List disablePadding sx={{ px: 2 }}>
      {subheader ? (
        <>
          <StyledSubheader
            disableGutters
            disableSticky
            onClick={handleToggle}
            config={config}
          >
            {subheader}
          </StyledSubheader>

          <Collapse in={open}>{renderContent}</Collapse>
        </>
      ) : (
        renderContent
      )}
    </List>
  );
}

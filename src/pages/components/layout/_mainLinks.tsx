import React, { useEffect, useState } from 'react';
import * as TablerIcons from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import Link from 'next/link';
import { api } from '../../../utils/api';
import { NavBarItem } from '@prisma/client';

interface MainLinkProps {
  iconName: string;
  color: string;
  label: string;
  order: number;
}

function MainLink({ iconName, color, label }: MainLinkProps) {
  iconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  label = label.charAt(0).toUpperCase() + label.slice(1);
  const [IconComponent, setIconComponent] = useState<React.ComponentType<any> | null>(null);
  useEffect(() => {
    const icon = TablerIcons[iconName as keyof typeof TablerIcons ];
    if (icon) {
      setIconComponent(() => icon);
    } else {
      console.error(`Icon ${iconName} not found in react-tabler-icons`);
    }
  });
  if (!IconComponent) {
    return null; // or render a loading spinner or something else while the component is being loaded
  }
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
        <IconComponent color={color} />
                </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

// const data = [
//   { icon: <SquarePlus size={16} />, color: 'blue', label: 'New', route: 'new' }
// ];

export function MainLinks() {
  const items = api.ui.getAllNavBarItems.useQuery();
  const links = items.data
  ?.sort((a, b) => a.order - b.order) // sort the items by their `id`
  .map((item: NavBarItem) => (
    <Link href={`/${item.link}`} key={item.id}>
      <MainLink order={item.order} color={item.color} label={item.label} iconName={item.icon} />
    </Link>
  ));

  return <div>{links}</div>;
}
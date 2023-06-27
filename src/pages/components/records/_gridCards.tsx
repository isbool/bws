import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
  rem,
  Indicator,
  Tooltip,
} from '@mantine/core';
import { Assessment } from '@prisma/client';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import {
  CreditCard,
  BuildingBank,
  Repeat,
  ReceiptRefund,
  Receipt,
  ReceiptTax,
  Report,
  CashBanknote,
  Coin,
  Trash,
  TrashX,
  CircleLetterX
} from 'tabler-icons-react';
import { api } from '../../../utils/api';
import { useAuth } from '@clerk/nextjs';


const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: rem(90),
    padding: rem(15),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.05)',
    },
  },
}));



type ActionGridProps = {
  name: string;
  assessments: Assessment[];
  enableDelete?: boolean;
  setAssessments: (prev: any) => void;
  toggleEnableDelete?: any;
  userId : string;
  mutateAsync : any;
};

export function ActionGrid({ userId, mutateAsync,name, assessments, enableDelete, toggleEnableDelete, setAssessments }: ActionGridProps) {
  const { classes, theme } = useStyles();

  const items = assessments.map((assessment: Assessment) => {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);  // 10 minutes ago
    const createdAt = new Date(assessment.createdAt);
    const updatedAt = new Date(assessment.updatedAt);
    const isNew = createdAt > tenMinutesAgo;
    const isRecentlyModified = updatedAt > tenMinutesAgo && !isNew;

    return (
      <UnstyledButton key={assessment.title} className={classes.item}>
        <Report strokeWidth={1} size={60} />
        <Text tt="capitalize" size="xs" mt={7}>
          {assessment.title}
        </Text>
      </UnstyledButton>
    )
  });

  const deletableItems = assessments.map((assessment: Assessment) => {
    const [deleteConfirmed, setDeleteConfirmed] = useState(false);
    const handleDelete = async () => {
      if (!deleteConfirmed) {
        setDeleteConfirmed(true);
      } else {
        // Delete the assessment here

        try {
          console.log("Deleting assessment");
          const submitData = {
            userId: userId,
            assessmentId: assessment.id
          };

          const result = await mutateAsync(submitData);
          console.log(result); // Assessment deleted successfully
          setDeleteConfirmed(false);
          if (setAssessments) {
            setAssessments(prev => prev.filter(assmnt => assmnt.id !== assessment.id))
          }
          
          notifications.show({
            title: 'Assessment deleted successfully',
            message: 'ssessment deleted successfully',
          })
        } catch (error) {
          notifications.show({
            title: 'Faild to delete assessment 🤥',
            message: error.toString(),
          })
          console.error(error);
        }
      }
    }
    return (
      <Group position="center">
        <UnstyledButton onClick={() => handleDelete()}>
          <Indicator style={{ cursor: 'pointer' }} color="white" inline label={<CircleLetterX size={15}
            strokeWidth={1.5}
            color={'black'} />} withBorder >
            <UnstyledButton key={assessment.title} className={classes.item}>
              <Report strokeWidth={1} size={60} />
              <Text tt="capitalize" size="xs" mt={7}>
                {assessment.title}
              </Text>
            </UnstyledButton>
          </Indicator>
        </UnstyledButton>
      </Group>
    )
  });

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group position="apart">
        <Tooltip withArrow position="bottom" label={name}><Text className={classes.title}>{name}</Text></Tooltip>
        <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }} onClick={toggleEnableDelete}>
          {enableDelete ? "Disable" : "Enable"} task delete
        </Anchor>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {enableDelete ? (
          deletableItems
        ) : (items)}

      </SimpleGrid>
    </Card>
  );
}
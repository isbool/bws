import { useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Text, rem, TextInput, UnstyledButton, Center, Badge } from '@mantine/core';
import { keys } from '@mantine/utils';
import { Selector, ChevronDown, ChevronUp, Search, Trash } from 'tabler-icons-react';
import mock_data_1 from './mock_data_1.json';
import { Assessment, AssessmentCriteria, StrategicObjective } from '@prisma/client';
import { useAuth } from '@clerk/nextjs';
import { api } from "../../../utils/api";

const useStyles = createStyles((theme) => ({
    rowSelected: {
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors[theme.primaryColor][7]
                : theme.colors[theme.primaryColor][0],
    },
    th: {
        padding: '0 !important',
    },
    control: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
    icon: {
        width: rem(21),
        height: rem(21),
        borderRadius: rem(21),
    },
}));

interface MergedTableProps {
    data?: { avatar: string; name: string; email: string; job: string; id: string }[];
}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;

    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size="0.9rem" stroke="1.5" />
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}

function filterData(data: any[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => item[key].toString().toLowerCase().includes(query))
    );
}

function sortData(
    data: any[],
    payload: { sortBy: keyof any | null; reversed: boolean; search: string }
) {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            // Ensure the values are strings
            const aString = typeof aValue === 'string' ? aValue : String(aValue);
            const bString = typeof bValue === 'string' ? bValue : String(bValue);

            if (payload.reversed) {
                return bString.localeCompare(aString);
            }

            return aString.localeCompare(bString);
        }),
        payload.search
    );
}

export function MergedTable({ data = mock_data_1.data }: MergedTableProps) {
    const { classes, cx } = useStyles();
    const [selection, setSelection] = useState(['1']);
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof any | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const toggleRow = (id: string) =>
        setSelection((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );

    const toggleAll = () =>
        setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

    const setSorting = (field: keyof any) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((item) => {
        const selected = selection.includes(item.id);
        return (
            <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
                <td>
                    <Checkbox
                        checked={selection.includes(item.id)}
                        onChange={() => toggleRow(item.id)}
                        transitionDuration={0}
                    />
                </td>
                <td>
                    <Group spacing="sm">
                        {/* <Avatar size={26} src={item.avatar} radius={26} /> */}
                        <Text size="sm" weight={500}>
                            {item.name}
                        </Text>
                    </Group>
                </td>
                <td>{item.email}</td>
                <td>{item.job}</td>
            </tr>
        );
    });

    return (
        <ScrollArea>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                icon={<Search size="0.9rem" stroke="1.5" />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table miw={800} verticalSpacing="sm">
                <thead>
                    <tr>
                        <th style={{ width: rem(40) }}>
                            <Checkbox
                                onChange={toggleAll}
                                checked={selection.length === data.length}
                                indeterminate={selection.length > 0 && selection.length !== data.length}
                                transitionDuration={0}
                            />
                        </th>
                        <Th
                            sorted={sortBy === 'name'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('name')}
                        >
                            User
                        </Th>
                        <Th
                            sorted={sortBy === 'email'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('email')}
                        >
                            Email
                        </Th>
                        <Th
                            sorted={sortBy === 'job'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('job')}
                        >
                            Job
                        </Th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}

interface MergedTable2Props {
    assessments: Assessment[];
}

export function MergedTable2({ assessments }: MergedTable2Props) {
    const { classes, cx } = useStyles();
    const [selection, setSelection] = useState(['1']);
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(assessments);
    const [sortBy, setSortBy] = useState<keyof any | null>(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const { mutate, mutateAsync, error, isLoading } = api.records.deleteAssessment.useMutation();
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    console.log(assessments)
    const toggleRow = (id: string) =>
        setSelection((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );

    const toggleAll = () =>
        setSelection((current) => (current.length === assessments.length ? [] : assessments.map((item) => item.id.toString())));

    const setSorting = (field: keyof any) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(assessments, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(assessments, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((item) => {
        const selected = selection.includes(item.id.toString());
     
        const handleDelete = async () => {
            try {
              console.log("Deleting assessment");
              const submitData = {
                userId: userId,
                assessmentId: item.id
              };
    
              const result = await mutateAsync(submitData);
            
              if (setSortedData) {
                setSortedData(prev => prev.filter(assmnt => assmnt.id !== item.id))
              }
            } catch (error) {
              console.error(error);
          }
        }
        return (
            <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
                <td>
                    <Checkbox
                        checked={selection.includes(item.id.toString())}
                        onChange={() => toggleRow(item.id.toString())}
                        transitionDuration={0}
                    />
                </td>
                <td>
                    <Group spacing="sm">
                        {/* <Avatar size={26} src={item.avatar} radius={26} /> */}
                        <Text size="sm" weight={500}>
                            {item.title}
                        </Text>
                    </Group>
                </td>
                <td>{item.description}</td>
                <td>{item.strategicObjectives.map((objective: StrategicObjective, index: Number) => (
                    <Badge key={index.toString()} color="blue">{objective.id}</Badge>
                ))}
                </td>
                <td>{item.assessmentCriterias.map((objective: AssessmentCriteria, index: Number) => (
                    <Badge key={index.toString()} color="red">{objective.id}</Badge>
                ))}
                </td>
                <td>{item.metrics.map((objective: Metric, index: Number) => (
                    <Badge key={index.toString()} color="yellow">{objective.id}</Badge>
                ))}
                </td>
                <td><Trash onClick={handleDelete}/></td>
            </tr>
        );
    });

    return (
        <ScrollArea>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                icon={<Search size="0.9rem" stroke="1.5" />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table miw={800} verticalSpacing="sm">
                <thead>
                    <tr>
                        <th style={{ width: rem(40) }}>
                            <Checkbox
                                onChange={toggleAll}
                                checked={selection.length === assessments.length}
                                indeterminate={selection.length > 0 && selection.length !== assessments.length}
                                transitionDuration={0}
                            />
                        </th>
                        <Th
                            sorted={sortBy === 'title'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('title')}
                        >
                            Title
                        </Th>
                        <Th
                            sorted={sortBy === 'desc'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('desc')}
                        >
                            Description
                        </Th>
                        <Th
                            sorted={sortBy === 'so'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('so')}
                        >
                            Strategic Objective
                        </Th>
                        <Th
                            sorted={sortBy === 'ac'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('ac')}
                        >
                            Asessment Criteria
                        </Th>
                        <Th
                            sorted={sortBy === 'mt'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('mt')}
                        >
                            Metric
                        </Th>
                        <Th
                        >
                           
                        </Th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}

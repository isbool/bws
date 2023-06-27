import { Card, Image, Group, Text, Badge, Button, Center, ThemeIcon } from "@mantine/core";
import { Assessment } from "@prisma/client";
import { useState } from "react";
import { api } from "../../../utils/api";
import { useAuth } from "@clerk/nextjs";
import assessmenet_placeholder from "../../../../public/assessment_placeholder.png"
import { Report } from 'tabler-icons-react';

type assessmentCardProps = {
    key: string;
    assessment: Assessment;
    setAssessments: React.Dispatch<React.SetStateAction<Assessment[]>>;
};

export function AssessmentCard({ key, assessment, setAssessments }: assessmentCardProps) {
    console.log(assessmenet_placeholder)
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const { mutate, mutateAsync, error, isLoading } = api.records.deleteAssessment.useMutation();
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
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <Card key={key} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section component="a" href="#">
                {/* <Image
                    src={assessmenet_placeholder.src}
                    height={100}
                    fit="contain"
                /> */}
                {/* <ThemeIcon variant="light" size="xl" > */}
             <Center>  <Report  size={60 } strokeWidth={1} /></Center> 
                {/* </ThemeIcon> */}
            </Card.Section>

           
                <Center><Text weight={500}>{assessment.title}</Text></Center>
        
           

            <Text size="sm" color="dimmed">
                {assessment.description ? assessment.description.slice(0, 100) : ''}
            </Text>
            <Group position="apart" spacing="md" grow={true}>
                <Button variant="light" color="blue" mt="md" radius="md">
                    Edit
                </Button>
                <Button
                    variant={deleteConfirmed ? "outline" : "light"}
                    color="red"
                    mt="md"
                    radius="md"
                    onClick={handleDelete}
                >
                    {deleteConfirmed ? 'Confirm?' : 'Delete'}
                </Button>
            </Group>
        </Card>
    )
};
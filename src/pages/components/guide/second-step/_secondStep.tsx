import { Badge, Loader, Stack, Tooltip } from "@mantine/core";
import { AssessmentCriteria, StrategicObjective } from "@prisma/client";
import { Chips } from "../_chips";
import React, { useState } from "react";

interface SecondStepProps {
    selectedStrategicObjectives: StrategicObjective[];
    selectedAssessmentCriteria: AssessmentCriteria[];
    setSelectedAssessmentCriteria: React.Dispatch<React.SetStateAction<AssessmentCriteria[]>>;
}

const SecondStep = ({ selectedStrategicObjectives, selectedAssessmentCriteria, setSelectedAssessmentCriteria }: SecondStepProps) => {
    const [selectThem, setSelectThem] = useState<Boolean>(true);

    const handleBadgeClick = (strategicObjective: StrategicObjective) => {
        let newSelectedAssessmentCriteria = [...selectedAssessmentCriteria];
        if (selectThem) {
            strategicObjective.assessmentCriterias.forEach((assessmentCriteria: AssessmentCriteria) => {
                const index = newSelectedAssessmentCriteria.findIndex(
                    (item) => item.id === assessmentCriteria.id
                );
                if (index === -1) {
                    newSelectedAssessmentCriteria.push(assessmentCriteria);
                }
            });
        } else {
            strategicObjective.assessmentCriterias.forEach((assessmentCriteria: AssessmentCriteria) => {
                const index = newSelectedAssessmentCriteria.findIndex(
                    (item) => item.id === assessmentCriteria.id
                );
                if (index !== -1) {
                    newSelectedAssessmentCriteria.splice(index, 1);
                }
            });
        }
        setSelectedAssessmentCriteria(newSelectedAssessmentCriteria);
        setSelectThem(!selectThem);
    };

    return (
        <>
            {selectedStrategicObjectives ? (
                <>
                    {selectedStrategicObjectives.map((strategicObjective) => (
                         
                        <Stack
                            key={strategicObjective.id.toString()}
                            align="flex-start"
                            justify="flex-start"
                            spacing="xs"
                            sx={(theme) => ({
                                backgroundColor:
                                    theme.colorScheme === "dark"
                                        ? theme.colors.dark[8]
                                        : theme.colors.gray[0],
                                height: 100,
                            })}
                        >
                            <Tooltip
                                label={selectThem ? "Select all" : "Deselect all"}
                                color="dark"
                                position="right"
                                withArrow
                            >
                                <Badge
                                    
                                    style={{ cursor: "pointer" }}
                                    component="a"
                                    onClick={() => handleBadgeClick(strategicObjective)}
                                    color="teal"
                                    radius="sm"
                                    variant="filled"
                                >
                                    {strategicObjective.name}
                                </Badge>
                            </Tooltip>

                           
                                <Chips
                                    multiSelect={true}
                                    api={strategicObjective.assessmentCriterias}
                                    selected={selectedAssessmentCriteria}
                                    setSelected={setSelectedAssessmentCriteria}
                                />
                        </Stack>
                            
                    ))}
                </>
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        // alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <Loader size="xl" variant="dots" />
                </div>
            )}
        </>
    );
};

export default SecondStep;

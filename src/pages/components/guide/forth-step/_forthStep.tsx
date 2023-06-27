import { Carousel } from "@mantine/carousel";
import { Badge, SimpleGrid, Stack } from "@mantine/core";
import { Equation } from "./_equation";
import { Fields } from "./_fields";
import { DraggableSection } from "./_draggable";
// import { MD5, SHA256 } from "crypto-js";
import { AssessmentCriteria, Input, Metric, StrategicObjective } from "@prisma/client";
import { useEffect } from "react";
import { TrafficLightRating } from "./_trafficLightRating";

interface ForthStepProps {
    activeStep: number;
    selectedStrategicObjectives: StrategicObjective[];
    selectedAssessmentCriteria: AssessmentCriteria[];
    selectedMetrics: Metric[];
    availableInputs: Input[];
    inputValues: Array<number | undefined>;
    setAvailableInputs: React.Dispatch<React.SetStateAction<Input[]>>;
    setInputValues: React.Dispatch<React.SetStateAction<(number | undefined)[]>>;
}

const ForthStep = ({ activeStep, selectedStrategicObjectives, selectedAssessmentCriteria, selectedMetrics, inputValues, availableInputs, setAvailableInputs, setInputValues }: ForthStepProps) => {
    useEffect(() => {
        selectedMetrics.forEach((metric) => {
          metric.Input.forEach((input: Input) => {
            availableInputs[input.id] = input;
          });
        });
      }, []);

    useEffect(() => {
        selectedMetrics.forEach((metric) => {
          metric.Input.forEach((input: Input) => {
            availableInputs[input.id] = input;
          });
        });
      }, [selectedMetrics]);
    return (
        <Stack
            spacing="xs"
            sx={(theme) => ({
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[8]
                        : theme.colors.gray[0]
            })}
        >
            <div
            // style={{ border: "4px dotted #38A169", boxShadow: "md" }}
            >
                <DraggableSection
                    style={
                        {
                            // border: "4px dotted  #38A169", // blue hex #38A169
                            // borderRadius: "md",
                            // boxShadow: "md",
                        }
                    }
                    showFullTitle={true}
                    showMetrics={true}
                    stackHeight={200}
                    activeStep={activeStep}
                    selectedStrategicObjectives={selectedStrategicObjectives}
                    selectedAssessmentCriteria={selectedAssessmentCriteria}
                    selectedMetrics={selectedMetrics}
                />
            </div>
            <div
            >
                <Carousel
                    height={450}
                    // height="100%"
                    sx={{ flex: 1 }}
                    slideSize="100%"
                    orientation="vertical"
                    align="start"
                    slideGap="xs"
                    controlsOffset="xs"
                    draggable={false}
                    styles={{
                        control: {
                            "&[data-inactive]": {
                                opacity: 0,
                                cursor: "default",
                            },
                        }
                    }}
                >
                    {selectedAssessmentCriteria.map(
                        (assessmentCriteria: AssessmentCriteria, index:number) => {
                            const filteredMetrics = selectedMetrics.filter((metric: Metric) =>
                                assessmentCriteria.metrics.includes(metric)
                            );
                            // filteredMetrics.map((metric: Metric) => {
                            //     const sortedInputs = metric.Input?.sort((a: { id: number }, b: { id: number }) => a.id - b.id);
                            //     if (sortedInputs) {
                            //       sortedInputs.forEach((input: Input) => {
                            //         availableInputs[input.id-1] = input;
                            //       });
                            //     }
                            //     return sortedInputs;
                            //   });
                            console.log(
                                `assessmentCriteria: ${assessmentCriteria.id}, filteredMetrics: ${filteredMetrics.length}`
                            );
                            if (filteredMetrics.length > 0) {
                                return (
                                    <Carousel.Slide key={index}>
                                        <SimpleGrid cols={2}>
                                            {filteredMetrics.map((metric: Metric) => (
                                                
                                                <>
                                                    <Stack
                                                        key={metric.id}
                                                        align="flex-start"
                                                        sx={(theme) => ({
                                                            backgroundColor:
                                                                theme.colorScheme === "dark"
                                                                    ? theme.colors.dark[8]
                                                                    : theme.colors.gray[0]
                                                        })}
                                                    >
                                                        <Badge
                                                            id={(metric.title).toString()}
                                                            color="teal"
                                                            radius="sm"
                                                            variant="filled"
                                                        >
                                                            {metric.title}
                                                        </Badge>

                                                        <Fields
                                                            api={metric.Input?.sort((a: { id: number }, b: { id: number }) => a.id - b.id)}
                                                            values={inputValues}
                                                            setValues={setInputValues}
                                                            availableInputs={availableInputs}
                                                            setAvailableInputs={setAvailableInputs}
                                                        />
                                                    </Stack>
                                                    {metric.type === "Equation-based" ? (
                                                        <Equation
                                                            hkey={(metric.id.toString()).toString()}
                                                            equation={metric.equation}
                                                            inputs={metric.Input}
                                                            output={metric.Output}
                                                            values={inputValues}
                                                        />
                                                    ) : (
                                                        <></>
                                                    )}
                        
                                                </>
                                            ))}
                                        </SimpleGrid>
                                    </Carousel.Slide>
                                );
                            } else {
                                return null;
                            }
                        }
                    )}
                </Carousel>
            </div>
        </Stack>

    );
};

export default ForthStep;

import { Accordion,Text, Badge, Loader, Paper, Space, Tabs } from "@mantine/core";
import { AssessmentCriteria, Metric } from "@prisma/client";
import { useEffect, useState } from "react";
import { Chips } from "../_chips";

// const useStyles = createStyles((theme) => ({
//   root: {
//     backgroundColor:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[6]
//         : theme.colors.gray[0],
//     borderRadius: theme.radius.sm,
//     width: "100%",
//   },

//   item: {
//     backgroundColor:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[6]
//         : theme.colors.gray[0],
//     border: "1px solid transparent",
//     position: "relative",
//     zIndex: 0,
//     transition: "transform 150ms ease",

//     "&[data-active]": {
//       transform: "scale(1.03)",
//       backgroundColor:
//         theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
//       boxShadow: theme.shadows.md,
//       borderColor:
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[4]
//           : theme.colors.gray[2],
//       borderRadius: theme.radius.md,
//       zIndex: 1,
//     },
//   },

//   chevron: {
//     "&[data-rotate]": {
//       transform: "rotate(-90deg)",
//     },
//   },
// }));

interface ThirdStepProps {
    activeStep: number;
    selectedAssessmentCriteria: AssessmentCriteria[];
    selectedMetrics: Metric[];
    setSelectedMetrics: React.Dispatch<React.SetStateAction<Metric[]>>;
}

const ThirdStep = ({ activeStep, selectedAssessmentCriteria, selectedMetrics, setSelectedMetrics }: ThirdStepProps) => {
    // const { classes } = useStyles();
    const [accordionValue, setAccordionValue] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const extract_metric_tag =
    /(\w+\s*){1,3}["“](\w+\.\w+\.\w+)["”](\s*\w+){0,2}/;
   
    useEffect(() => {
        if (selectedMetrics && activeStep === 3) {
          if (selectedMetrics.length - 1 >= 0) {
            setActiveTab(selectedMetrics[selectedMetrics.length - 1].id.toString());
          } else {
            setActiveTab(null);
          }
        }
      }, [selectedMetrics]);
    return (
        <>
            {selectedAssessmentCriteria ? (
                <>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <Accordion
                            // sx={{ width: "95%" }}
                            value={accordionValue}
                            onChange={setAccordionValue}
                            style={{ width: "calc(50% - 4px)", margin: 2 }}
                            mx="auto"
                            variant="filled"
                            defaultValue="customization"
                            // classNames={classes}
                            // className={classes.root}
                        >
                            {selectedAssessmentCriteria.map(
                                (assessmentCriteria: AssessmentCriteria, index:number) =>
                                    index % 2 === 0 ? (
                                        <Accordion.Item
                                            key={assessmentCriteria.id.toString()}
                                            value={assessmentCriteria.id.toString()}
                                        >
                                            <Accordion.Control>
                                                <Badge color="teal" radius="sm" variant="filled">
                                                    {assessmentCriteria.name}
                                                </Badge>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                
                                                    <Chips
                                                        multiSelect={true}
                                                        api={assessmentCriteria.metrics}
                                                        selected={selectedMetrics}
                                                        setSelected={setSelectedMetrics}
                                                    />
                                              
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                    ) : null
                            )}
                        </Accordion>

                        <Accordion
                            // sx={{ width: "95%" }}            
                            onChange={setAccordionValue}
                            value={accordionValue}
                            style={{ width: "calc(50% - 4px)", margin: 2 }}
                            mx="auto"
                            variant="filled"
                            defaultValue="customization"
                            // classNames={classes}
                            // className={classes.root}
                        >
                            {selectedAssessmentCriteria.map(
                                (assessmentCriteria, index) =>
                                    index % 2 !== 0 ? (
                                        
                                        <Accordion.Item
                                        key={assessmentCriteria.name.toString()}
                                            value={assessmentCriteria.id.toString()}
                                        >
                                            <Accordion.Control>
                                                <Badge color="teal" radius="sm" variant="filled">
                                                    {assessmentCriteria.name}
                                                </Badge>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                    <Chips
                                                        multiSelect={true}
                                                        api={assessmentCriteria.metrics}
                                                        selected={selectedMetrics}
                                                        setSelected={setSelectedMetrics}
                                                    />
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                               
                                    ) : null
                            )}
                        </Accordion>
                    </div>

                    {activeTab != null ? (
                        <Tabs value={activeTab} onTabChange={setActiveTab}>
                            <Tabs.List>
                                {selectedMetrics &&
                                    selectedMetrics.map((metric) => (
                                        <Tabs.Tab key={metric.id.toString()} value={metric.id.toString()}>
                                            <Text>
                                                {extract_metric_tag.exec(metric.title)?.[2] ??
                                                    null
                                                    ? extract_metric_tag.exec(metric.title)[2]
                                                    : "Error"}
                                            </Text>
                                        </Tabs.Tab>
                                    ))}
                            </Tabs.List>
                            {selectedMetrics &&
                                selectedMetrics.map((metric) => (
                                    <Tabs.Panel key={metric.id.toString()} value={metric.id.toString()}>
                                        <Badge size="sm" color="pink">
                                            Description
                                        </Badge>
                                        <Space h="xs" />
                                        <Paper shadow="xs" p="md">
                                            <Text>{metric.description}</Text>
                                        </Paper>
                                        <Space h="lg" />
                                        <Badge size="sm" color="pink">
                                            Type
                                        </Badge>
                                        <Space h="xs" />
                                        <Badge color="yellow" radius="xs" variant="dot">
                                            {metric.type}
                                        </Badge>
                                    </Tabs.Panel>
                                ))}
                        </Tabs>
                    ) : null}
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

export default ThirdStep;

import React from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { Kbd, SimpleGrid, Stack, Sx } from "@mantine/core";
// import { SHA256 } from "crypto-js";
import { AssessmentCriteria, Metric, StrategicObjective } from "@prisma/client";

const DraggableBox = ({ label, id } : { label: string, id: string }) => {
  const updateXarrow = useXarrow();
  return (
    <Draggable key={id} 
      bounds="body"
      onDrag={updateXarrow}
      onStop={updateXarrow}
    >
      <Kbd  style={{ cursor: "pointer" }} id={id}>{label}</Kbd>
    </Draggable>
  );
};

interface DraggableSectionProps {
  selectedStrategicObjectives: StrategicObjective[];
  selectedAssessmentCriteria: AssessmentCriteria[];
  selectedMetrics: Metric[];
  activeStep: number;
  stackHeight: number;
  style: Sx;
  showFullTitle: boolean;
  showMetrics: boolean;
}

export function DraggableSection({
  selectedStrategicObjectives,
  selectedAssessmentCriteria,
  selectedMetrics,
  activeStep,
  stackHeight,
  style,
  showFullTitle=false,
  showMetrics=true,
}: DraggableSectionProps){

  const getObjectiveNameById = (strategicObjectiveId: number) => {
    const objective = selectedStrategicObjectives.find(
      (obj) => obj.id === strategicObjectiveId
    );
    return objective ? objective.name : "";
  };
  const getCritiriaById = (assessmentCriteriaId: number) => {
    const objective = selectedAssessmentCriteria.find(
      (obj) => obj.id === assessmentCriteriaId
    );
    return objective ? objective.name : "";
  };
  return selectedStrategicObjectives &&
    selectedAssessmentCriteria &&
    selectedMetrics ? (
    // <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
      <SimpleGrid sx={style} cols={activeStep}>
        <Xwrapper>
          <Stack
            align="flex-start"
            spacing="lg"
            
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              height: stackHeight,
            //   border: "2px solid #CBD5E0",
            //   borderRadius: "md",
            //   boxShadow: "md",
            })}
          >
            {selectedStrategicObjectives.map((objective: StrategicObjective) => (
              <DraggableBox
                label={showFullTitle ? objective.name : objective.name.substring(0, 2)}
                id={(objective.name).toString()}
              />
            ))}
          </Stack>
          <Stack
            align="flex-start"
            spacing="md"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              height: stackHeight,
            //   border: "2px solid #CBD5E0",
            //   borderRadius: "md",
            //   boxShadow: "md",
            })}
          >
            {selectedAssessmentCriteria.map((critiria: AssessmentCriteria) => (
              <>
              
                <DraggableBox
                 
                  label={showFullTitle ? critiria.name : critiria.name.substring(0, 3)}
                  id={(critiria.name).toString()}
                />
                <Xarrow
                  start={(
                    getObjectiveNameById(critiria.strategicObjectiveId)
                  ).toString()}
                  end={(critiria.name).toString()}
                />
              </>
            ))}
          </Stack>
          {/* <Stack
            align="flex-start"
            spacing="lg"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              height: stackHeight,
            //   border: "2px solid #CBD5E0",
            //   borderRadius: "md",
            //   boxShadow: "md",
            })}
          > */}
            <SimpleGrid cols={selectedMetrics.length/2}>
            {selectedMetrics.map((metric: Metric) => (
              <>
              {showMetrics ? (
                <>
                <DraggableBox
                  
                  label={showFullTitle ? metric.title : metric.title.substring(8, 13)}
                  id={(metric.title).toString()}
                />
                <Xarrow
                  start={(
                    getCritiriaById(metric.assessmentCriteriaId)
                  ).toString()}
                  end={(metric.title).toString()}
                />
                </>
                ) : (     
                null
                )}
              </>
            ))}
            </SimpleGrid>
          {/* </Stack> */}
        </Xwrapper>
      </SimpleGrid>
  ) : // </div>

  null;
}

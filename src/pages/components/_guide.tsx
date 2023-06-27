import { api } from "../../utils/api";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  Stepper,
  Space,
  Stack,
} from "@mantine/core";

import type {
  AssessmentCriteria,
  Input,
  Metric,
  StrategicObjective,
} from "@prisma/client";
import React from "react";

import ZeroStep from "./guide/zero-step/_zeroStep";
import FirstStep from "./guide/first-step/_firstStep";
import SecondStep from "./guide/second-step/_secondStep";
import ThirdStep from "./guide/third-step/_thirdStep";
import ForthStep from "./guide/forth-step/_forthStep";
import Completed from "./guide/completed/_completed";
import { Controls } from "./guide/_controls";



const Guide = ({ children }: PropsWithChildren) => {

  const [active, setActive] = useState<number>(0);
  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const strategicObjectivesQuery = api.guide.getAllStrategicObjectives.useQuery();

  const [assessmentTitle, setassessmentTitle] = useState<string>("");
  const [assessmentDesc, setassessmentDesc] = useState<string>("");
  const [selectedStrategicObjectives, setSelectedStrategicObjectives] = useState<StrategicObjective[]>([]);
  const [selectedAssessmentCriteria, setSelectedAssessmentCriteria] = useState<AssessmentCriteria[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<Metric[]>([]);
  const [availableInputs, setAvailableInputs] = useState<Input[]>([]);
  const [inputValues, setMetricValues] = useState<Array<number | undefined>>([]);

  useEffect(() => {
    setAvailableInputs([]);
  }, [selectedMetrics]);

  return (
    <Stack
      spacing="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        height: window.innerHeight
      })}
    >
      <div>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="md"
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Initial step" description="Initialising assessment">
            <Space h="md" />
            <ZeroStep
              assessmentTitle={assessmentTitle}
              setassessmentTitle={setassessmentTitle}
              assessmentDesc={assessmentDesc}
              setassessmentDesc={setassessmentDesc}
            />
          </Stepper.Step>
          <Stepper.Step label="First step" description="Strategic Objectives">
            <Space h="md" />
            <FirstStep
              strategicObjectivesQuery={strategicObjectivesQuery}
              selectedStrategicObjectives={selectedStrategicObjectives}
              setSelectedStrategicObjectives={setSelectedStrategicObjectives}
            />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Assessment criteria">
            <Space h="md" />
            <SecondStep
              selectedStrategicObjectives={selectedStrategicObjectives}
              selectedAssessmentCriteria={selectedAssessmentCriteria}
              setSelectedAssessmentCriteria={setSelectedAssessmentCriteria}
            />
          </Stepper.Step>
          <Stepper.Step label="Third step" description="Metrics">
            <ThirdStep
              activeStep={active}
              selectedAssessmentCriteria={selectedAssessmentCriteria}
              selectedMetrics={selectedMetrics}
              setSelectedMetrics={setSelectedMetrics}
            />
          </Stepper.Step>
          <Stepper.Step label="Forth step" description="Inputs">
            <ForthStep
              activeStep={active}
              selectedStrategicObjectives={selectedStrategicObjectives}
              selectedAssessmentCriteria={selectedAssessmentCriteria}
              selectedMetrics={selectedMetrics}
              availableInputs={availableInputs}
              inputValues={inputValues}
              setAvailableInputs={setAvailableInputs}
              setInputValues={setMetricValues}
            />
          </Stepper.Step>

          <Stepper.Completed>
            <Completed
              assessmentTitle={assessmentTitle}
              assessmentDesc={assessmentDesc}
              selectedStrategicObjectives={selectedStrategicObjectives}
              selectedAssessmentCriteria={selectedAssessmentCriteria}
              selectedMetrics={selectedMetrics}
              availableInputs={availableInputs}
              inputValues={inputValues}
            />
          </Stepper.Completed>
        </Stepper>
      </div>
      <div>
        <Controls
          selectedMetrics={selectedMetrics}
          inputValues={inputValues}
          active={active}
          prevStep={prevStep}
          nextStep={nextStep}
          nextStepBtn0State={assessmentTitle.length == 0 ? true : false}
          nextStepBtn1stState={selectedStrategicObjectives?.length == 0 ? true : false}
          nextStepBtn2ndState={selectedAssessmentCriteria?.length == 0 ? true : false}
          nextStepBtn3rdState={selectedMetrics?.length == 0 ? true : false}
        />
      </div>
    </Stack>

  );
};

export default Guide;

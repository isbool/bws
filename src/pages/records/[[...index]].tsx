import { type NextPage } from "next";
import { Center, Input, Title, Group, Loader, Space, Text, Indicator, SegmentedControl, Grid, Col, Tooltip, UnstyledButton, Card, Anchor, SimpleGrid, Button, Paper, ThemeIcon, Avatar, Switch } from "@mantine/core";

import { Filter } from 'tabler-icons-react';
import { api } from "../../utils/api";
import { Assessment, AssessmentCriteria, Dimension, Metric, StrategicObjective } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { AssessmentCard } from "../components/records/_assessmentCard";
import { ActionGrid } from "../components/records/_gridCards";
import { OriginalActionsGrid } from "../components/records/_originalActionGrid";
import MuiBasicCard from "../components/records/_muiCard";
import { TableSelection, TableSort } from "../components/records/_tableWithSelect";
import { MergedTable, MergedTable2 } from "../components/records/_mergedTable";
import { useAuth } from "@clerk/nextjs";
// import { ActionsGrid } from "../components/records/_gridCards";



const New: NextPage = () => {
  const assessmentsQuery = api.records.getAllassessments.useQuery();
  const strategicObjectivesQuery = api.ui.getAllStrategicObjectives.useQuery();
  const assessmentCritiriaQuery = api.ui.getAllAssessmentCritiria.useQuery();
  const metricsQuery = api.ui.getAllMetrics.useQuery();
  const dimensionsQuery = api.ui.getAllDimensions.useQuery();

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { mutate, mutateAsync, error, isLoading } = api.records.deleteAssessment.useMutation();

  const [enableDeleteStatesSO, setEnableDeleteStatesSO] = useState<any>({}); // Object to hold states
  const [enableDeleteStatesAC, setEnableDeleteStatesAC] = useState<any>({}); // Object to hold states
  const [enableDeleteStatesMT, setEnableDeleteStatesMT] = useState<any>({}); // Object to hold states
  const [enableDeleteStatesD, setEnableDeleteStatesD] = useState<any>({}); // Object to hold states

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [strategicObjectives, setStrategicObjectives] = useState<StrategicObjective[]>([]);
  const [assessmentCritiria, setAssessmentCritiria] = useState<AssessmentCriteria[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [dimensions, setDimensions] = useState<Dimension[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [filtersValue, setFiltersValue] = useState('so');
  // const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (assessmentsQuery.data) {
      setAssessments(assessmentsQuery.data);
    }
  }, [assessmentsQuery.data]);

  useEffect(() => {
    if (strategicObjectivesQuery.data) {
      // Initialize enableDeleteStates
      const initialEnableDeleteStates = strategicObjectivesQuery.data.reduce((acc, cur) => ({
        ...acc,
        [cur.id]: false
      }), {});
      setEnableDeleteStatesSO(initialEnableDeleteStates);
      setStrategicObjectives(strategicObjectivesQuery.data);
    }
  }, [strategicObjectivesQuery.data]);

  useEffect(() => {
    if (assessmentCritiriaQuery.data) {
      const initialEnableDeleteStates = assessmentCritiriaQuery.data.reduce((acc, cur) => ({
        ...acc,
        [cur.id]: false
      }), {});
      setEnableDeleteStatesAC(initialEnableDeleteStates);
      setAssessmentCritiria(assessmentCritiriaQuery.data);
    }
  }, [assessmentCritiriaQuery.data]);

  useEffect(() => {
    if (metricsQuery.data) {
      const initialEnableDeleteStates = metricsQuery.data.reduce((acc, cur) => ({
        ...acc,
        [cur.id]: false
      }), {});
      setEnableDeleteStatesMT(initialEnableDeleteStates);
      setMetrics(metricsQuery.data);
    }
  }, [metricsQuery.data]);

  useEffect(() => {
    if (dimensionsQuery.data) {
      const initialEnableDeleteStates = dimensionsQuery.data.reduce((acc, cur) => ({
        ...acc,
        [cur.id]: false
      }), {});
      setEnableDeleteStatesD(initialEnableDeleteStates);
      setDimensions(dimensionsQuery.data);
    }
  }, [dimensionsQuery.data]);

  const toggleEnableDeleteSO = (id: number) => {
    setEnableDeleteStatesSO(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleEnableDeleteAC = (id: number) => {
    setEnableDeleteStatesAC(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleEnableDeleteMT = (id: number) => {
    setEnableDeleteStatesMT(prev => ({ ...prev, [id]: !prev[id] }));
  };
  const toggleEnableDeleteD = (id: number) => {
    setEnableDeleteStatesD(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Center maw={400} h={100} mx="auto">
        <Title order={1}>Records</Title>
      </Center>
{/* 
      <Input

        icon={<Filter />}
        placeholder="Filter records..."
        radius="lg"
        size="lg"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
      /> */}
      {/* <Grid justify="space-between" align="center">
        <Grid.Col span={11}> */}
          <SegmentedControl
            fullWidth
            value={filtersValue}
            onChange={setFiltersValue}
            data={[
              { label: 'All Assessments', value: 'all' },
              { label: 'By Strategic Objective', value: 'so' },
              { label: 'By Assessment Criteria', value: 'ac' },
              { label: 'By Metric', value: 'metric' },
              { label: 'By Dimension', value: 'dimension', disabled: true },
            ]}
          />
        {/* </Grid.Col>
        <Grid.Col span="auto">
          <Switch
            size="lg"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            onLabel={"Cards"}
            offLabel={"Grid"}
          />
        </Grid.Col>
      </Grid> */}

      {/* </div> */}
      <Space h="xl" />
      {assessments ? (
        // !checked ? (
          <Group position="left" spacing="md" grow={false} >
            {filtersValue === 'all' ? (
              <>
              {/* <TableSelection/>
              <TableSort/> */}
              {/* <MergedTable /> */}
              <MergedTable2 assessments={assessments}/>
              {/* <OriginalActionsGrid/> */}
              </>
              // <MuiBasicCard/>
            // <ActionGrid  name={"All Assessments"} assessments={assessments} setAssessments={setAssessments} />
            ): filtersValue === 'so' ? (
              strategicObjectives.map((strategicObjective: StrategicObjective) => {

                const filteredAssessments = assessments.filter(assessment =>
                  assessment.strategicObjectives.some(obj => obj.strategicObjectiveId === strategicObjective.id)
                );
                if (filteredAssessments.length > 0) {
                  return (
                    <ActionGrid userId={userId} mutateAsync={mutateAsync} enableDelete={enableDeleteStatesSO[strategicObjective.id]} toggleEnableDelete={() => toggleEnableDeleteSO(strategicObjective.id)} key={"SO"+strategicObjective.id} name={strategicObjective.name.substring(0, 1)} assessments={filteredAssessments} setAssessments={setAssessments} />
                  );
                }
              })
            ) : filtersValue === 'ac' ? (
              assessmentCritiria.map((assessmentCriteria: AssessmentCriteria) => {

                const filteredAssessments = assessments.filter(assessment =>
                  assessment.assessmentCriterias.some(obj => obj.assessmentCriteriaId === assessmentCriteria.id)
                );
                if (filteredAssessments.length > 0) {
                  return (
                    <ActionGrid  userId={userId} mutateAsync={mutateAsync} enableDelete={enableDeleteStatesAC[assessmentCriteria.id]} toggleEnableDelete={() => toggleEnableDeleteAC(assessmentCriteria.id)} key={"AC"+assessmentCriteria.id} name={assessmentCriteria.name.substring(0, 4)} assessments={filteredAssessments} setAssessments={setAssessments} />
                  );
                }
              })
            ) : filtersValue === 'metric' ? (
              metrics.map((metric: Metric) => {

                const filteredAssessments = assessments.filter(assessment =>
                  assessment.metrics.some(obj => obj.metricId === metric.id)
                );
                if (filteredAssessments.length > 0) {
                  return (
                    <ActionGrid  userId={userId} mutateAsync={mutateAsync} enableDelete={enableDeleteStatesMT[metric.id]} toggleEnableDelete={() => toggleEnableDeleteMT(metric.id)} key={"MT"+metric.id} name={metric.title.substring(8, 13)} assessments={filteredAssessments} setAssessments={setAssessments} />
                  );
                }
              })
            ) : filtersValue === 'dimension' ? (
              dimensions.map((dimension: Dimension) => {

                const filteredAssessments = assessments.filter(assessment =>
                  assessment.dimensions.some(obj => obj.dimensionId === dimension.id)
                );
                if (filteredAssessments.length > 0) {
                  return (
                    <ActionGrid enableDelete={enableDeleteStatesD[dimension.id]} toggleEnableDelete={() => toggleEnableDeleteD(dimension.id)} key={dimension.id} name={dimension.title} assessments={filteredAssessments} setAssessments={setAssessments} />
                  );
                }
              }
              )
            ) : <></>}
          </Group>
        // ) : (
        //   <Group position="left" spacing="md" grow={false}>
        //   {assessments.map((assessment, index) =>
        //     <AssessmentCard key={index.toString()} assessment={assessment} setAssessments={setAssessments} />
        //   )}
        //   </Group>
        // )
      ) : (
        <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
          <Loader size="xl" variant="dots" />
        </div>
      )}
    </>
  )
};

export default New;


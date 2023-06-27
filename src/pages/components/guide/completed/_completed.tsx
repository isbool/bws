import { Kbd } from "@mantine/core";
import { AssessmentCriteria, Input, Metric, StrategicObjective } from "@prisma/client";
import { api } from "../../../../utils/api";
import { useAuth  } from '@clerk/nextjs';


interface CompletedProps {
  assessmentTitle: string;
  assessmentDesc: string;
  selectedStrategicObjectives: StrategicObjective[];
  selectedAssessmentCriteria: AssessmentCriteria[];
  selectedMetrics: Metric[];
  availableInputs: Input[];
  inputValues: Array<number | undefined>;
}

const Completed = ({ assessmentTitle, assessmentDesc, selectedStrategicObjectives, selectedAssessmentCriteria, selectedMetrics, availableInputs, inputValues }: CompletedProps) => {

  const strategicObjectives = selectedStrategicObjectives.map((so: StrategicObjective) => so.id);
  const assessmentCriteria = selectedAssessmentCriteria.map((ac: AssessmentCriteria) => `(${ac.strategicObjectiveId},${ac.id})`);
  const metrics = selectedMetrics.map((m: Metric) => `(${m.assessmentCriteriaId},${m.id})`);
  const inputs = selectedMetrics.flatMap((m: Metric) => availableInputs.filter((i: Input) => i.metricId === m.id).map((i: Input) => `(${m.id},${i.id})`));
  const values = selectedMetrics.filter((m: Metric) => inputValues[m.id - 1] !== undefined).map((m: Metric) => `(${m.id},${inputValues[m.id - 1]})`);

  const {mutate, mutateAsync,error, isLoading } = api.guide.submitData.useMutation();

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  

  const handleSubmit = async () => {
    const strategicObjectiveIds = selectedStrategicObjectives.map(obj => obj.id);
    const assessmentCriteriaIds = selectedAssessmentCriteria.map(obj => obj.id);
    const metricIds = selectedMetrics.map(obj => obj.id);
    const inputIds = availableInputs.map(obj => obj.id);
    inputIds[0]=-1;
    const submitData = {
      userId: userId,
      assessmentTitle: assessmentTitle,
      assessmentDesc:  assessmentDesc,
      strategicObjectives: strategicObjectiveIds,
      assessmentCriteria: assessmentCriteriaIds,
      metrics: metricIds,
      inputs: inputIds,
      inputValues: inputValues,
    };

    try {
      console.log("data:",submitData)
      const result = await mutateAsync(submitData);
      console.log(result)
    } catch (error) {
      console.error(error); // log the error for debugging purposes
    }
  };

  return (
    <>
      <div>StrategicObjectives: [{strategicObjectives.join(",")}]</div>
      <div>assessmentCritieria: [{assessmentCriteria.join(",")}]</div>
      <div>Metrics: [{metrics.join(",")}]</div>
      <div>Inputs: [{inputs.join(",")}]</div>
      <div>Values: [{values.join(",")}]</div>

      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? <Kbd>Submitting...</Kbd> : <Kbd>Submit</Kbd>}
      </button>
    </>
  );
};

export default Completed;

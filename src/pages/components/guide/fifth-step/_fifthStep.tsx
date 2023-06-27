import { Kbd } from "@mantine/core";
import { AssessmentCriteria, Input, Metric, StrategicObjective } from "@prisma/client";

interface CompletedProps {
    selectedStrategicObjectives: StrategicObjective[];
    selectedAssessmentCriteria: AssessmentCriteria[];
    selectedMetrics: Metric[];
    availableInputs: Input[];
    inputValues: Array<number | undefined>;
}

const Completed = ({ selectedStrategicObjectives, selectedAssessmentCriteria, selectedMetrics, availableInputs, inputValues }: CompletedProps) => {
    return (
        <>

        </>
    );
};

export default Completed;

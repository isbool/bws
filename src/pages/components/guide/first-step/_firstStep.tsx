import { StrategicObjective } from "@prisma/client";
import { Chips } from "../_chips";
import { Loader } from "@mantine/core";

interface FirstStepProps {
    strategicObjectivesQuery: any;
    selectedStrategicObjectives: StrategicObjective[];
    setSelectedStrategicObjectives: React.Dispatch<React.SetStateAction<StrategicObjective[]>>;
}

const FirstStep = ({ strategicObjectivesQuery, selectedStrategicObjectives, setSelectedStrategicObjectives}: FirstStepProps) => {
    return (
        <>
            {strategicObjectivesQuery.data ? (
                <Chips
                   
                    multiSelect={true}
                    api={strategicObjectivesQuery.data}
                    selected={selectedStrategicObjectives}
                    setSelected={setSelectedStrategicObjectives}
                />
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

export default FirstStep;

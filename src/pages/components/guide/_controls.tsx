import { Button, Group } from "@mantine/core";

import { useEffect, useState } from "react";

type ControlsProps = {
  active: number;
  prevStep: () => void;
  nextStep: () => void;
  nextStepBtn0State: boolean;
  nextStepBtn1stState: boolean;
  nextStepBtn2ndState: boolean;
  nextStepBtn3rdState: boolean;
  inputValues: Array<number | undefined>;
};

export function Controls({
  active,
  prevStep,
  nextStep,
  nextStepBtn0State,
  nextStepBtn1stState,
  nextStepBtn2ndState,
  nextStepBtn3rdState,
  inputValues
}: ControlsProps) {
  const [saveBtnState, setSaveBtnState] = useState(false);

  useEffect(() => {
    if (inputValues.length > 0 && inputValues.every((val) => val !== undefined)) {
      setSaveBtnState(true);
    } else {
      setSaveBtnState(false);
    }
    //console.log("metricValues2", inputValues);
  }, [inputValues]);

  return (
    <Group
      position="center"
      mt="xl"
      grow
    // style={{ display: "flex", width: "100%" }}
    >
      {active == 0 ? (
        <Button
          variant="outline"
          onClick={nextStep}
          disabled={nextStepBtn0State}
          style={{ flex: 1 }}
        >
          Next step
        </Button>
      ) : active == 1 ? (
        <>
          <Button variant="default" onClick={prevStep} style={{ flex: 1 }}>
            Back
          </Button>
          <Button
            variant="outline"
            onClick={nextStep}
            disabled={nextStepBtn1stState}
            style={{ flex: 1 }}
          >
            Next step
          </Button>
        </>
      ) : active == 2 ? (
        <>
          <Button variant="default" onClick={prevStep} style={{ flex: 1 }}>
            Back
          </Button>

          <Button
            variant="outline"
            onClick={nextStep}
            disabled={nextStepBtn2ndState}
            style={{ flex: 1 }}
          >
            Next step
          </Button>
        </>
      ) : active == 3 ? (
        <>
          <Button variant="default" onClick={prevStep} style={{ flex: 1 }}>
            Back
          </Button>
          <Button
            variant="outline"
            onClick={nextStep}
            disabled={nextStepBtn3rdState}
            style={{ flex: 1 }}
          >
            Next step
          </Button>
        </>
      ) : active == 4 ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button variant="default" onClick={nextStep}>
            Next step
          </Button>
        </div>
      ) : active == 5 ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            disabled={!saveBtnState}
            variant="default"
            onClick={prevStep}
            style={{ marginBottom: "10px" }}
          >
            Save
          </Button>

          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        </div>
      ) : null}

    </Group>
  );
}

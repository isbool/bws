import React, { useEffect, useState } from "react";
import {
  Badge,
  Grid,
  Text,
  Stack,
} from "@mantine/core";

import type { Metric } from "@prisma/client";

interface TrafficLightRating {
  metric: Metric;
  inputValue: number | undefined;
}

export function TrafficLightRating({ inputValue, metric }: TrafficLightRating) {
 const [value, setValue] = useState(0)

  if (
    inputValue &&
    metric
  ) {


  }

  useEffect(() => {
    if (equationRef && equationRef.current) {
      // console.log(equationRef.current);
      const rect = equationRef.current.getBoundingClientRect();
      setEquationBadgeWidth(rect.width);
    }
  }, [inputValue]);

  return (

    <Stack align="flex-start" key={hkey}>
      <Grid >
        <Grid.Col>
          
          <Badge radius="sm" color="blue" style={{  width: equationBadgeWidth }}>
            Equation
          </Badge>
          {result !== undefined ? (
            <>
              <Badge
                radius="sm"
                color="orange"
                style={{ width: equalsbadgeWidth,visibility: "hidden" }}
              ></Badge>
              <Badge radius="sm" color="green" style={{ width: resultBadgeWidth }}>
                Output
              </Badge>
            </>
          ) : null}
        </Grid.Col>
        <Grid.Col>
          <Text>
            <span ref={equationRef}>
              <Latex>{"$" + latexEquation + "$"}</Latex>
            </span>
            <span ref={equalsRef}>
              {result !== undefined && unitValue !== undefined ? (
                <Latex>{"$" + "\\;" + "=" + "\\;" + "$"}</Latex>
              ) : null}
            </span>
            <span ref={resultRef}>
              {result !== undefined && unitValue !== undefined ? (
                <Latex>{"$" + result + unitValue + "$"}</Latex>
              ) : null}
            </span>
          </Text>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

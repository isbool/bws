import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Grid,
  Text,
  Stack,
} from "@mantine/core";
import * as math from "mathjs";
import Latex from "react-latex-next";
import type { Input, Output } from "@prisma/client";

interface EquationProps {
  hkey: string;
  equation: { latex: string; format: string };
  inputs: Input[];
  output: Output[];
  values: Array<number | undefined>;
}

export function Equation({ hkey, equation, inputs, output, values }: EquationProps) {
  // const[mathEquation,setMathEquation] = useState<string>(equation.format);
  // const[latexEquation,setLatexEquation] = useState<string>(equation.latex);
  const equationRef = useRef(null);
  const resultRef = useRef(null);
  const equalsRef = useRef(null);
  const [equationBadgeWidth, setEquationBadgeWidth] = useState(null);
  const [resultBadgeWidth, setResultBadgeWidth] = useState(null);
  const [equalsbadgeWidth, setEqualsBadgeWidth] = useState(null);

  let latexEquation = undefined;
  let mathEquation = undefined;
  let result = undefined;
  let unitValue = undefined;
  let outputName = undefined;

  if (
    equation &&
    equation.latex &&
    equation.format &&
    inputs &&
    output &&
    output[0] &&
    output[0].unit
  ) {
    latexEquation = equation.latex;
    mathEquation = equation.format;

    inputs.forEach((input, index) => {
      const inputName = input.name.replace(/\$/g, "");
      const regex1 = new RegExp(`%${index + 1}`, "g");

      if (values[input.id] !== undefined) {
        latexEquation = latexEquation.replace(regex1, `${values[input.id]}`);
        mathEquation = mathEquation.replace(regex1, `${values[input.id]}`);
      } else {
        latexEquation = latexEquation.replace(regex1, `${inputName}`);
      }
    });

    outputName  = output[0].name.replace(/\$/g, "");
    unitValue = output[0].unit.value.replace(/\$/g, "");
    if (inputs.every((input) => values[input.id] !== undefined)) {
      try {
        result = math.evaluate(mathEquation);
      } catch (err) {
        console.error(err);
      }
    }
    latexEquation = outputName + "=" + latexEquation;
    // console.log(latexEquation);

  }

  useEffect(() => {
    if (equationRef && equationRef.current) {
      // console.log(equationRef.current);
      const rect = equationRef.current.getBoundingClientRect();
      setEquationBadgeWidth(rect.width);
    }
  }, [equationRef.current, latexEquation]);

  useEffect(() => {
    if (resultRef && resultRef.current) {
      // console.log(resultRef.current);
      const rect = resultRef.current.getBoundingClientRect();
      setResultBadgeWidth(rect.width);
    }
  }, [resultRef.current, result]);

  useEffect(() => {
    if (equalsRef && equalsRef.current) {
      // console.log(resultRef.current);
      const rect = equalsRef.current.getBoundingClientRect();
      setEqualsBadgeWidth(rect.width);
    }
  }, [equalsRef.current]);
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

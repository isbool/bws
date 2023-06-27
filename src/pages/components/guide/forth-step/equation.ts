import type { Input, Output } from "@prisma/client";
import * as math from "mathjs";

export const renderEquation = (
  equation: { latex: string; format: string },
  inputs: Input[],
  output: Output[],
  values: Array<number>
) => {
  let latexEquation = equation.latex;
  let mathEquation = equation.format;

  if (
    equation &&
    inputs &&
    output &&
    output[0] &&
    latexEquation &&
    mathEquation
  ) {
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

    const outputName = output[0].name.replace(/\$/g, "");

    // if (inputs.every((input) => values[input.id] !== undefined)) {
    //   let result;
    //   try {
    //     result = math.evaluate(mathEquation);
    //   } catch (err) {
    //     console.error(err);
    //   }

    //   if (result !== undefined) {
    //     latexEquation += "=" + result;
    //   }
    // }

    latexEquation = outputName + "=" + latexEquation;

    console.log(latexEquation);

    return { latex: "$" + latexEquation + "$", math: mathEquation };
  }
  return null;
};
export const renderOutput = (
  inputs: Input[],
  values: Array<number>,
  mathEquation: string
) => {
  console.log("TREXAS GAY");
  console.log(inputs);
  console.log(values);
  console.log(mathEquation);
  if (inputs && values && mathEquation) {
    if (inputs.every((input) => values[input.id] !== undefined)) {
      let result;
      try {
        result = math.evaluate(mathEquation);
      } catch (err) {
        console.error(err);
      }

      if (result !== undefined) {
        return result;
      }
    }
  } else {
    return "NOO";
  }
};

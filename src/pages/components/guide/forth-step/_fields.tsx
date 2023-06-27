import React, { useEffect } from "react";
import { Flex, NumberInput, SimpleGrid, Tooltip } from "@mantine/core";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { Input } from "@prisma/client";

interface FieldsProps {
  api: any;
  values: Array<number | undefined>;
  availableInputs: Input[];
  setValues: React.Dispatch<React.SetStateAction<any>>;
  setAvailableInputs: React.Dispatch<React.SetStateAction<Input[]>>;
}

export function Fields({ api, values, availableInputs, setAvailableInputs, setValues }: FieldsProps) {
  // useEffect(() => {
  //   setAvailableInputs(availableInputs => [...availableInputs, api]);
  // }, [api, availableInputs]);

  useEffect(() => {
    console.log("availableInputs", availableInputs)
    console.log("fields", api?.map((input: Input) => ({ id: input.id })));
    console.log("values", values);
  }, [values,api]);

  const fields = api.map((input: Input) => {
      // console.log("Input", input);
      if (api.length > 0 && values.length === 0 && !values[input.id]) {
        values[input.id] = undefined;
      }
      return (
        //alignItems="center"
          <NumberInput
          onChange={(val) => {
            setValues((values: any) => {
              const newValues = [...values];
              newValues[input.id] = val;
              return newValues;
            });
          }}
          defaultValue={input.min ? input.min : 0}
          value={values[input.id]}
          label={
            <SimpleGrid cols={3} spacing="xl" verticalSpacing="xs">
              <Tooltip withArrow={true} label={input.description}>
                <span>
                  <Latex>{input.name}</Latex>
                </span>
              </Tooltip>
        </SimpleGrid>
             
            }
            placeholder={input.min + "<=" + (input.max ? input.max : "oo")}
            max={input.max}
            min={input.min}
            // icon={<div style={{ width: '1rem', height: '1rem',  }}><Latex >{input.unit?.value}</Latex></div>} //overflow: 'hidden'
          />
   
  
      
      );
    });
  
  return (<Flex
    direction={{ base: 'column', sm: 'row' }}
    gap={{ base: 'sm', sm: 'lg' }}
    justify={{ sm: 'flex-start' }}
  >
  {fields}
</Flex>
  );
}

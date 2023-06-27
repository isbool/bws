import { StrategicObjective } from "@prisma/client";

import { TextInput, Textarea } from "@mantine/core";
import { ImageDropzone } from "./_imageDropzone";

interface ZeroStepProps {
    assessmentTitle: string;
    setassessmentTitle: React.Dispatch<React.SetStateAction<string>>;
    assessmentDesc: string;
    setassessmentDesc: React.Dispatch<React.SetStateAction<string>>;
}

const ZeroStep = ({ assessmentTitle, setassessmentTitle, assessmentDesc, setassessmentDesc }: ZeroStepProps) => {
    return (
        <>
            <TextInput
                value={assessmentTitle}
                onChange={(event) => setassessmentTitle(event.currentTarget.value)}
                placeholder="Enter assessment title/nickname"
                label="Assessment Title"
                withAsterisk
            />
            <ImageDropzone />
            <Textarea
                value={assessmentDesc}
                onChange={(event) => setassessmentDesc(event.currentTarget.value)}
                placeholder="If you want you can enter an assessment description..."
                label="Description"
            />

        </>

    );
};

export default ZeroStep;

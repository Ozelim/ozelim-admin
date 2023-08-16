import React from "react";
import { Button, NumberInput, TextInput, Textarea } from "@mantine/core";
import { pb } from "shared/api";

async function getQuestions() {
  return (await pb.collection("questions").getFullList())[0];
}

export const Construct = () => {
  const [questions, setQuestions] = React.useState({});

  function handleQuestionChange(e) {
    const { value, name } = e?.currentTarget;
    setQuestions({ ...questions, [name]: value });
  }

  async function saveQuestions() {
    await pb.collection("questions").update(questions?.id, questions);
  }

  React.useEffect(() => {
    getQuestions().then((res) => {
      setQuestions(res);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-xs">
        <NumberInput label="Сколько вопросов отображать ?" type="number" />
        {Object.keys(questions).map((key, i) => {
          if (!isNaN(key))
            return (
              <Textarea
                label={`Вопрос ${i + 1}`}
                autosize
                name={`${i + 1}`}
                value={questions?.[key]}
                onChange={handleQuestionChange}
              />
            );
        })}
      </div>
      <Button onClick={saveQuestions}>Сохранить</Button>
    </div>
  );
};

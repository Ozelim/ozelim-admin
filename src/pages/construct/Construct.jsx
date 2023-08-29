import React from 'react'
import { Button, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { pb } from 'shared/api'
import { useUtils } from 'shared/hooks';

async function getQuestions () {
  return (await pb.collection('questions').getFullList({
    filter: `question = true`
  }))[0]
}

export const Construct = () => {
  
  const [questions, setQuestions] = React.useState({});
 
  const [count, setCount] = React.useState(10)

  const {record, diseases} = useUtils()

  function handleQuestionChange (e) {
    const { value, name } = e?.currentTarget
    setQuestions({...questions, [name]: value})
  }

  async function saveQuestions () {
    await pb.collection("questions").update(questions?.id, {
      ...questions,
      count: count
    });
  }

  React.useEffect(() => {
    getQuestions().then((res) => {
      setQuestions(res);
      // setCount(res.count);
    });
  }, []);

  return (
    <div className='w-full'>
      <div className='grid grid-cols-2'>
        <div className='max-w-xs'>
          <NumberInput
            value={count}
            onChange={e => setCount(e)}
            label='Сколько вопросов отображать? (первые:)'
          />
          {Object.keys(questions).map((key, i) => {
            if (!isNaN(key)) return (
              <Textarea
                key={i}
                label={`Вопрос ${i + 1}`}
                autosize
                name={`${i + 1}`}
                value={questions?.[key]}
                onChange={handleQuestionChange}
              />
            )
          })}
        </div>
        <div className='space-y-4'>
          <Select
            label='Патологии'
            data={diseases}
          />
        </div>
      </div>
      <Button onClick={saveQuestions}>Сохранить</Button>
    </div>
  );
};

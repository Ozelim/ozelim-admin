import React from 'react'
import { Button, NumberInput, Textarea } from '@mantine/core'
import { pb } from 'shared/api'

async function getQuestions () {
  return (await pb.collection('questions').getFullList({
    filter: `question = true`
  }))[0]
}

export const Construct = () => {

  const [questions, setQuestions] = React.useState({})
  const [count, setCount] = React.useState(10)

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
    getQuestions()
    .then(res => {
      setQuestions(res)
    })
  }, [])

  return (
    <div className='w-full'>
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

        <Button
          onClick={saveQuestions}
        >
          Сохранить
        </Button>

      </div>
    </div>
  )
}



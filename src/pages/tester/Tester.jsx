import React from 'react'
import { Button, Modal, NumberInput, Table, Tabs, TextInput, Textarea } from '@mantine/core'
import { pb } from 'shared/api'
import { openConfirmModal } from '@mantine/modals'

async function getTester (name) {
  return await pb.collection('tester').getFirstListItem(`index = "${name}"`)
}

async function getTesterResults () {
  return await pb.collection('tester_results').getFullList()
}

export const Tester = () => {

  const [tab, setTab] = React.useState('1')

  const [tester, setTester] = React.useState({})
  const [changedTester, setChangedTester] = React.useState({})

  const [testerResults, setTesterResults] = React.useState([])

  async function handleTester (index) {
    return await getTester(index ?? '1')
    .then(res => {
      setChangedTester(res)
      setTester(res)
    })
  }

  React.useEffect(() => {
    handleTester()
  }, [])

  React.useEffect(() => {
    pb.collection('tester_results').subscribe('*', () => {
      getTesterResults()
      .then(res => {
        setTesterResults(res)
      })
    })
  }, [])

  async function handleTab (name) {
    setTab(name)
    if (name === 'results') {
      getTesterResults()
      .then(res => {
        setTesterResults(res)
      })
    } else {
      getTester(name)
      .then(res => {
        setTester(res)
        setChangedTester(res)
      })
    }
  }

  function addQuestion () {
    setChangedTester({
      ...changedTester,
      questions: [
        ...changedTester?.questions ?? [], 
        {
          question: '', 
          id: crypto.randomUUID(), 
          answer: null,
          answers: ['', '', '', '']
        }
      ]
    })
  }

  const [edit, setEdit] = React.useState({})

  async function saveTest () {
    const newQuestions = changedTester?.questions?.map(q => {
      return q?.id === edit?.id ? edit : q
    })

    await pb.collection('tester').update(changedTester?.id, {
      ...changedTester,
      questions: newQuestions
    })
    .then(async res => {
      await handleTester(tab)
      setEdit(null)
    })
  }

  function handleEdit (e) {
    setEdit(e)
  }

  function handleEditAnswer (index) {
    setEdit({...edit, answer: index});
  }

  function handleEditAnswersChange (answerIndex, e) {
    setEdit({...edit, answers: edit.answers.map((answer, index) =>
      index === answerIndex ? e?.target?.value : answer
    )})
  }

  function handleEditQuestionChange (e) {
    setEdit({...edit, question: e?.target?.value});
  }

  async function deleteQuestion ({id}) {
    const newQuestions = changedTester?.questions?.filter(q => {
      return q?.id !== id
    })

    await pb.collection('tester').update(changedTester?.id, {
      ...changedTester,
      questions: newQuestions
    })
    .then(async res => {
      await handleTester(tab)
    })
  }

  const [modal, setModal] = React.useState(false)
  const [results, setResults] = React.useState({})

  return (
    <>
      <Tabs
        value={`${tab}`}
        onTabChange={handleTab}
      >
        <Tabs.List grow>
          {Array(7).fill(1).map((_, i) => {
            const index = i + 1
            return (
              <Tabs.Tab value={`${index}`} key={i}>{index}</Tabs.Tab>
            )
          })}
        <Tabs.Tab value={`results`}>Результаты</Tabs.Tab>
          
        </Tabs.List>
        <Tabs.Panel value={tab} pt={20}>
          {tab !== 'results' && (
            <>
              <div>
                <TextInput
                  label='Название теста'
                  value={changedTester?.name ?? ''}
                  onChange={e => setChangedTester({...changedTester, name: e?.target?.value})}
                />
                <div className='flex gap-4 items-center mt-2'>
                  <p>Длительность теста в минутах:</p>
                  <NumberInput
                    className='w-16'
                    hideControls
                    value={changedTester?.duration ?? ''}
                    onChange={e => setChangedTester({...changedTester, duration: e})}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4 mt-4'>
                {changedTester?.questions?.map((q, ind) => {
                  return (
                    edit?.id === q?.id ? (
                      <div key={ind} className='bg-white border p-4'>
                        <div className=''>
                          <Textarea
                            label='Вопрос'
                            value={edit?.question ?? ''}
                            onChange={e => handleEditQuestionChange(e)}
                          />
                        </div>
                        <div className='grid grid-cols-2 gap-x-4'>
                          {Array(4).fill(1).map((_, i) => {
                            return (
                              <TextInput
                                label={`Ответ ${i + 1}`}
                                key={i}
                                value={edit?.answers?.[i] ?? ''}
                                onChange={(e) => handleEditAnswersChange(i, e)}
                                // onChange={(e) => handleAnswersChange(q?.id, i, e)}
                              />
                            )
                          })}
                        </div>
                        <div className='flex gap-4 mt-4'>
                          <p>Правильный ответ:</p>
                          <div className='flex gap-2'>
                            {Array(4).fill(1).map((_, i) => {
                              return (
                                <Button 
                                  key={i}
                                  onClick={() => handleEditAnswer(i)}
                                  color={edit?.answer === i ? 'green' : 'gray'}
                                  compact
                                >
                                  {i + 1}
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                        <Button 
                          onClick={saveTest}
                          variant='subtle'
                          className='mt-2'
                        >
                          Сохранить
                        </Button>
                        <Button
                          variant='subtle'
                          onClick={() => deleteQuestion(q)}
                          color='red'
                        >
                          Удалить вопрос
                        </Button>
                      </div>
                    ) : (
                      <div key={ind} className='border p-4 bg-white'>
                        <div className=' gap-4'>
                          <Textarea
                            label='Вопрос'
                            value={q?.question ?? ''}
                            readOnly
                            variant='filled'
                          />
                
                        </div>
                        <div className='grid grid-cols-2 gap-x-4'>
                          {Array(4).fill(1).map((_, i) => {
                            return (
                              <TextInput
                                label={`Ответ ${i + 1}`}
                                key={i}
                                value={q?.answers?.[i] ?? ''}
                                readOnly
                                variant='filled'
                                // onChange={(e) => handleAnswersChange(q?.id, i, e)}
                              />
                            )
                          })}
                        </div>
                        <div className='mt-4 flex items-center gap-4'>
                          <p>Правильный ответ:</p>
                          <div className='flex gap-2'>
                            {Array(4).fill(1).map((_, i) => {
                              return (
                                <Button 
                                  key={i}
                                  // onClick={() => handleAnswer(q?.id, i)}
                                  compact
                                  color={q?.answer === i ? 'green' : 'gray'}
                                >
                                  {i + 1}
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                        <div className='mt-2'>
                          <Button
                            variant='subtle'
                            onClick={() => handleEdit(q)}
                          >
                            Редактировать
                          </Button>
                          <Button
                            variant='subtle'
                            onClick={() => deleteQuestion(q)}
                            color='red'
                          >
                            Удалить вопрос
                          </Button>
                        </div>
                      </div>
                    )
                  )
                })}
              </div>
              <div className='flex justify-center gap-4 mt-5'>
                <Button 
                  onClick={addQuestion}
                >
                  Добавить вопрос
                </Button>
                <Button 
                  onClick={saveTest}
                >
                  Сохранить
                </Button>
              </div>
            </>
          )}
        </Tabs.Panel>
        <Tabs.Panel value='results'>
          <Table>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Город</th>
                <th>Организации</th>
                <th>Название теста</th>
                <th>Результаты</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {testerResults?.map((r, i) => {
                return (
                  <tr key={i}>
                    <td>{r?.name}</td>
                    <td>{r?.city}</td>
                    <td>{r?.company}</td>
                    <td>{r?.results?.name}</td>
                    <td>
                      <Button
                        variant='subtle'
                        onClick={() => {
                          setModal(true)
                          setResults(r?.results)
                        }}
                      >
                        Результаты
                      </Button>
                    </td>
                    <td>
                      <Button 
                        compact
                        color='red'
                        variant='subtle'
                        onClick={() => {
                          openConfirmModal({
                            title: 'Удалить данные результаты',
                            centered: true, 
                            labels: {confirm: 'Удалить', cancel: 'Отмена'},
                            onConfirm: async () => await pb.collection('tester_results').delete(r?.id)
                          })
                        }}
                      >
                        Удалить
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Tabs.Panel>
      </Tabs>   
      <Modal
        centered
        opened={modal}
        onClose={() => setModal(false)}
        size={'70%'}
      >
        Правильных ответов: {results?.questions?.filter(q => q?.selected === q?.answer)?.length}
        <div className='space-y-4'>
          {results?.questions?.map((q, i) => {
            return (
              <div key={i} className='border p-4 bg-white'>
                <div className=' gap-4'>
                  <Textarea
                    label='Вопрос'
                    value={q?.question ?? ''}
                    readOnly
                    variant='filled'
                  />
        
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  {Array(4).fill(1).map((_, i) => {
                    console.log(q, 'q');
                    return (
                      <Button
                        label={`Ответ ${i + 1}`}
                        key={i}
                        readOnly
                        variant={i === q?.selected ? 'filled' : 'outline'}
                      >
                        {q?.answers?.[i]}
                      </Button>
                    )
                  })}
                </div>
                <div className='mt-4 flex items-center gap-4'>
                  <p>Правильный ответ:</p>
                  <div className='flex gap-2'>
                    {Array(4).fill(1).map((_, i) => {
                      return (
                        <Button 
                          key={i}
                          // onClick={() => handleAnswer(q?.id, i)}
                          compact
                          color={q?.answer === i ? 'green' : 'gray'}
                        >
                          {i + 1}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Modal>  
    </>
  )
}

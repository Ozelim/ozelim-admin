import React from 'react'
import { ActionIcon, Button, Modal, NumberInput, Table, Tabs, Text, TextInput, Textarea } from '@mantine/core'
import { pb } from 'shared/api'
import { openConfirmModal } from '@mantine/modals'
import { useSearchParams } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { MdArrowBack, MdDeleteForever } from 'react-icons/md'
import { showNotification } from '@mantine/notifications'

async function getTests () {
  return await pb.collection('tester').getFullList()
}

async function getTestsResults () {
  return await pb.collection('tester_results').getFullList()
}

export const Tester = () => {

  const [tab, setTab] = React.useState('create')

  const [tests, setTests] = React.useState([])

  const [createTestData, setCreateTestData] = React.useState({})
  const [changeTestData, setChangeTestData] = React.useState({})

  const [questionData, setQuestionData] = React.useState({})

  const [testsResults, setTestsResults] = React.useState([])

  
  const [currentTest, setCurrentTest] = React.useState({})

  const [resultsTest, setResultsTest] = React.useState({})

  async function handleTests () {
    return await getTests()
    .then(res => {
      setTests(res)
      // setCurrentTest(res?.filter(q => q?.id === currentTest?.id)?.[0] ?? {})
    })
  }

  React.useEffect(() => {
    handleTests()
    pb.collection('tester').subscribe('*', async () => {
      await handleTests()
    })
  }, [])

  React.useEffect(() => {
    pb.collection('tester_results').subscribe('*', () => {
      getTestsResults()
      .then(res => {
        setTestsResults(res)
      })
    })
  }, [])


  async function handleTab (name) {
    setTab(name)
    if (name === 'all') {
      setCurrentTest({})
    }
    if (name === 'results') {
      setResultsTest({})
      getTestsResults()
      .then(res => {
        setTestsResults(res)
      })
    } else {
      getTests(name)
      .then(res => {
        setTests(res)
        // setChangedTester(res)
      })
    }
  }

  async function addQuestion () {
    await pb.collection('tester').update(currentTest?.id, {
      questions: [...currentTest?.questions ?? [], {
        question: '', 
        id: crypto.randomUUID(), 
        answer: null,
        answers: ['', '', '', '']
      }]
    })
  }

  React.useEffect(() => {
    if (currentTest?.id) {
      const newTest = tests?.filter(q => q?.id === currentTest?.id)?.[0] !== currentTest
      if (newTest) {
        setCurrentTest(tests?.filter(q => q?.id === currentTest?.id)?.[0])
      }
    } 
  }, [tests])

  const [edit, setEdit] = React.useState({})

  async function saveQuestion (t) {
    const newQuestions = t?.questions?.map(q => {
      return q?.id === edit?.id ? edit : q
    })

    await pb.collection('tester').update(t?.id, {
      ...t,
      questions: newQuestions
    })
    .then(async res => {
      await handleTests(tab)
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

  async function deleteQuestion (q) {
    const newQuestions = currentTest?.questions?.filter(w => {
      return w?.id !== q?.id
    })

    await pb.collection('tester').update(currentTest?.id, {
      ...currentTest,
      questions: newQuestions
    })
    .then(async res => {
      await handleTests()
    })
  }

  const [modal, setModal] = React.useState(false)
  const [results, setResults] = React.useState({})

  const [folders, setFolders] = React.useState([])

  const groupedByIndexMap = new Map();

  React.useEffect(() => {

    const q = testsResults.sort((a, b) => a?.results?.index - b?.results?.index);

    q?.forEach(item => {
      const index = item?.results?.index;
      if (!groupedByIndexMap.has(index)) {
        groupedByIndexMap.set(index, []);
      }
      groupedByIndexMap.get(index).push(item);
    });
    
    setFolders(Array.from(groupedByIndexMap))
  }, [testsResults])

  async function createTest () {
    await pb.collection('tester').create({
      ...createTestData,
      duration: createTestData?.duration ?? 30,
      index: tests?.length + 1,
    })
    .then(() => {
      setCreateTestData({})
    })
  }

  return (
    <>
      <Tabs
        value={`${tab}`}
        onTabChange={handleTab}
      >
        <Tabs.List grow>
          <Tabs.Tab value='create'>
            Создать тест
          </Tabs.Tab>
          <Tabs.Tab value='all'>
            Все тесты
          </Tabs.Tab>
          <Tabs.Tab value={`results`}>Результаты</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='all'>

          {currentTest?.id && (
            <>
              <Button leftIcon={<MdArrowBack className='text-2xl'/>} className='my-3' color='gray' onClick={() => {
                setTab('all')
                setCurrentTest({})
              }}>
                Назад
              </Button>
              <TextInput
                label='Название теста'
                value={currentTest?.name ?? ''}
                onChange={e => setCurrentTest({...currentTest, name: e?.target?.value})}
              />
              <div className='flex gap-4 items-center mt-2'>
                <p>Длительность теста в минутах:</p>
                <NumberInput
                  className='w-16'
                  hideControls
                  value={currentTest?.duration ?? ''}
                  onChange={e => setCurrentTest({...currentTest, duration: e})}
                />
              </div>
              <div className='space-x-4 mt-4'>
                <Button onClick={async () => {
                  await pb.collection('tester').update(currentTest?.id, {
                    ...currentTest,
                  })
                }}>
                  Сохранить
                </Button>
                {/* <Button color='gray' onClick={() => setCurrentTest(null)}>
                  Отмена
                </Button> */}
              </div>
              <div className='grid grid-cols-2 gap-4 mt-4'>
                {currentTest?.questions?.map((q, ind) => {
                  return (
                    edit?.id === q?.id ? (
                      <div key={ind} className='bg-white border p-4'>
                        <Textarea
                          label='Вопрос'
                          value={edit?.question ?? ''}
                          onChange={e => handleEditQuestionChange(e)}
                        />
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
                          onClick={() => saveQuestion(currentTest)}
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
              <Button
                mt={8}
                onClick={() => addQuestion()}
              >
                Добавить вопрос
              </Button>
            </>
          )}
          {!currentTest?.id && (
            <div className='flex flex-col gap-6 mt-4'>
              {tests?.map((t, i) => {
                return (
                  <div key={i} className='border p-4 bg-white grid grid-cols-[95%_auto]'>
                    <div>
                      {t?.index}. {t.name}
                    </div>
                    <div className='flex gap-2'>
                      <ActionIcon onClick={() => {
                        setCurrentTest(t)
                      }}>
                        <FaEdit className='text-2xl' color='lightgreen'/>
                      </ActionIcon>
                      <ActionIcon onClick={() => {
                        openConfirmModal({
                          title: 'Тест',
                          centered: true,
                          labels: {confirm: 'Удалить', cancel: 'Отмена'},
                          onConfirm: async () => {
                            await pb.collection('tester').delete(t?.id)
                            .then(() => {
                              showNotification({
                                title: 'Text',
                                color: 'green',
                                message: 'Тест успешно удален'
                              })
                            })
                          }
                        })
                      }}>
                        <MdDeleteForever className='text-2xl' color='red'/>
                      </ActionIcon>
                    </div>
                  </div>
              )})}
            </div>
          )}
        </Tabs.Panel>

        <Tabs.Panel value='create'>
          <TextInput
            label='Название теста'
            value={createTestData?.name ?? ''}
            onChange={e => setCreateTestData({...createTestData, name: e?.target?.value})}
            className='max-w-2xl'
          />
          <div className='flex gap-4 items-center mt-2'>
            <p>Длительность теста в минутах:</p>
            <NumberInput
              className='w-16'
              hideControls
              value={createTestData?.duration ?? 30}
              onChange={e => setCreateTestData({...createTestData, duration: e})}
            />
          </div>
          <Button
            onClick={createTest}
            disabled={!createTestData?.name && !createTestData?.duration}
          >
            Создать тест
          </Button>
        </Tabs.Panel>
        {/* {tests?.map(t => {
          return (
            <Tabs.Panel value={t?.id} key={t?.id}>
              {changeTestData?.id === t?.id ? (
                <>
                  <TextInput
                    label='Название теста'
                    value={changeTestData?.name ?? ''}
                    onChange={e => setChangeTestData({...changeTestData, name: e?.target?.value})}
                  />
                  <div className='flex gap-4 items-center mt-2'>
                    <p>Длительность теста в минутах:</p>
                    <NumberInput
                      className='w-16'
                      hideControls
                      value={changeTestData?.duration ?? ''}
                      onChange={e => setChangeTestData({...changeTestData, duration: e})}
                    />
                  </div>
                  <div className='space-x-4 mt-4'>
                    <Button onClick={async () => {
                      await pb.collection('tester').update(t?.id, {
                        ...t,
                        ...changeTestData,
                      })
                      .then(() => {
                        setChangeTestData(null)
                      })
                    }}>
                      Сохранить
                    </Button>
                    <Button color='gray' onClick={() => setChangeTestData(null)}>
                      Отмена
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <TextInput
                    label='Название теста'
                    value={t?.name ?? ''}
                    readOnly
                    variant='filled'
                  />
                  <div className='flex gap-4 items-center mt-2'>
                    <p>Длительность теста в минутах:</p>
                    <NumberInput
                      className='w-16'
                      hideControls
                      value={t?.duration ?? ''}
                      readOnly
                      variant='filled'
                    />
                  </div>
                  <Button onClick={() => setChangeTestData(t)}>
                    Редактировать
                  </Button>
                </>
              )}
                <div className='grid grid-cols-2 gap-4 mt-4'>
                  {t?.questions?.map((q, ind) => {
                    return (
                      edit?.id === q?.id ? (
                        <div key={ind} className='bg-white border p-4'>
                          <Textarea
                            label='Вопрос'
                            value={edit?.question ?? ''}
                            onChange={e => handleEditQuestionChange(e)}
                          />
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
                            onClick={() => saveQuestion(t)}
                            variant='subtle'
                            className='mt-2'
                          >
                            Сохранить
                          </Button>
                          <Button
                            variant='subtle'
                            onClick={() => deleteQuestion(t, q)}
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
                              onClick={() => deleteQuestion(t, q)}
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
                <Button
                  mt={8}
                  onClick={() => addQuestion(t)}
                >
                  Добавить вопрос
                </Button>
            </Tabs.Panel>
          )
        })} */}
        <Tabs.Panel value='results'> 
          {resultsTest?.id && (
            <>
              <Button leftIcon={<MdArrowBack className='text-2xl'/>} className='my-3' color='gray' onClick={() => {
                setTab('results')
                setResultsTest({})
              }}>
                Назад
              </Button>
              <Tabs defaultValue='res'>
                <Tabs.List>
                  <Tabs.Tab value='res'>Все</Tabs.Tab>
                  <Tabs.Tab value='sdali'>Сдали</Tabs.Tab>
                  <Tabs.Tab value='nesdali'>Не сдали</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value='res'>
                  <div className='my-4'>
                    Количество тестов: {folders.filter(q => q?.[0] === resultsTest?.index)?.[0]?.[1]?.filter(q => q?.status === 'created' || q?.status === '')?.length}
                  </div>
                  <Table>
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>ФИО</th>
                        <th>Город</th>
                        <th>Организации</th>
                        <th>Название теста</th>
                        <th>Результаты</th>
                        <th>Действие</th>
                      </tr>
                    </thead>
                    <tbody>
                      {folders.filter(q => q?.[0] === resultsTest?.index)?.[0]?.[1]?.filter(q => q?.status === 'created' || q?.status === '')?.map((r, i) => {
                        if (r?.status === 'created' || r?.status === '') return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{r?.name}</td>
                            <td>{r?.city}</td>
                            <td>{r?.company}</td>
                            <td>{r?.results?.name}</td>
                            <td>
                              <Button
                                variant='subtle'
                                onClick={() => {
                                  setModal(true)
                                  setResults(r)
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
                <Tabs.Panel value='sdali'>
                  <Table>
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>ФИО</th>
                        <th>Город</th>
                        <th>Организации</th>
                        <th>Название теста</th>
                        <th>Результаты</th>
                        <th>Действие</th>
                      </tr>
                    </thead>
                    <tbody>
                      {folders.filter(q => q?.[0] === resultsTest?.index)?.[0]?.[1]?.filter?.(q => q?.status === 'passed')?.map((r, i) => {
                        if (r?.status === 'passed')return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{r?.name}</td>
                            <td>{r?.city}</td>
                            <td>{r?.company}</td>
                            <td>{r?.results?.name}</td>
                            <td>
                              <Button
                                variant='subtle'
                                onClick={() => {
                                  setModal(true)
                                  setResults(r)
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
                <Tabs.Panel value='nesdali'>
                  <Table>
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>ФИО</th>
                        <th>Город</th>
                        <th>Организации</th>
                        <th>Название теста</th>
                        <th>Результаты</th>
                        <th>Действие</th>
                      </tr>
                    </thead>
                    <tbody>
                  {folders.filter(q => q?.[0] === resultsTest?.index)?.[0]?.[1]?.filter(q => q?.status === 'failed')?.map((r, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{r?.name}</td>
                        <td>{r?.city}</td>
                        <td>{r?.company}</td>
                        <td>{r?.results?.name}</td>
                        <td>
                          <Button
                            variant='subtle'
                            onClick={() => {
                              setModal(true)
                              setResults(r)
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
            </>
          )}
          {!resultsTest?.id && (
            <div className='flex flex-col gap-6 mt-4'>
              {tests?.map((t, i) => {
                return (
                  <div 
                    key={i} 
                    className='border p-4 bg-white' 
                    onClick={() => {
                      setResultsTest(t)
                    }}
                  >
                    <div>
                      {t?.index}. {t.name}
                    </div>
                  </div>
              )})}
            </div>
          )}
          {/* <Tabs variant='pills' mt={16}>
            <Tabs.List>
            {tests?.map((t, i) => {
              return (
                <Tabs.Tab value={String(i)}>
                  {t.name}
                </Tabs.Tab>
              )})}
            </Tabs.List>
            {folders?.map((f, i) => {
              return (
                <Tabs.Panel value={String(i)}>
                  <Tabs mt={16}>
                    <Tabs.List>
                      <Tabs.Tab value='sdali'>Сдали</Tabs.Tab>
                      <Tabs.Tab value='nesdali'>Не сдали</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value='sdali'>
                      <p className='my-3'>Сдали: {f?.filter(q => q?.passed)?.length}</p>
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
                          {f?.map((r, i) => {
                            if (r?.passed) return (
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
                                      setResults(r)
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
                    <Tabs.Panel value='nesdali'>
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
                          {f?.map((r, i) => {
                            if (!r?.passed) return (
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
                </Tabs.Panel>
              )
            })}
          </Tabs> */}
        </Tabs.Panel>
      </Tabs>   
      <Modal
        centered
        opened={modal}
        onClose={() => setModal(false)}
        size={'70%'}
      >
        Правильных ответов: {results?.rightAnswers}\{results?.totalQuestions}
        {results?.status === 'created' && (
          <div className='flex gap-4 justify-center my-4'>
            <Button
              onClick={() => {
                openConfirmModal({
                  title: 'Тест',
                  centered: true,
                  labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
                  onConfirm: async () => await pb.collection('tester_results').update(results?.id, {
                    status: 'passed'
                  })
                  .then(() => {
                    setModal(false)
                  })
                })
              }}
            >
              Сдал
            </Button>
            <Button
              onClick={() => {
                openConfirmModal({
                  title: 'Тест',
                  centered: true,
                  labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
                  onConfirm: async () => await pb.collection('tester_results').update(results?.id, {
                    status: 'failed'
                  })
                  .then(() => {
                    setModal(false)
                  })
                })
              }}
              color='gray'
            >
              Не сдал
            </Button>
          </div>
        )}
        <div className='space-y-4'>
          {results?.results?.questions?.map((q, i) => {
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
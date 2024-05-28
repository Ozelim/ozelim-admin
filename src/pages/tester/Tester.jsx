import React from 'react'
import { Button, Checkbox, SegmentedControl, Tabs, TextInput, Textarea } from '@mantine/core'
import { pb } from 'shared/api'

async function getTester (name) {
  return await pb.collection('tester').getFirstListItem(`name = '${name}'`)
}

export const Tester = () => {

  const [tab, setTab] = React.useState(`1`)

  const [tester, setTester] = React.useState({})
  const [changedTester, setChangedTester] = React.useState({})

  React.useEffect(() => {
    getTester('1')
    .then(res => {
      setChangedTester(res)
      setTester(res)
    })
  }, [])
  
  React.useEffect(() => {
    if (tester?.id) { 
      pb.collection('tester').subscribe(tester?.id, ({record}) => {
        setChangedTester(record)
        setTester(record)
      })
    }
  }, [tester])

  async function handleTab (name) {
    setTab(name)
    getTester(name)
  }

  function addQuestion () {
    setChangedTester({...changedTester, })
  }

  return (
    <div>
      <Tabs
        value={tab}
        onChange={handleTab}
      >
        <Tabs.List grow>
          {Array(7).fill(1).map((_, i) => {

            const index = i + 1
            return (
              <Tabs.Tab value={`${index}`}>{index}</Tabs.Tab>
            )
          })}
        </Tabs.List>
          {Array(7).fill(1).map((_, i) => {
            const index = i + 1
            return (
              <Tabs.Panel value={`${index}`}>
                {changedTester?.[index]?.test?.map((q, ind) => {
                  return (
                    <div key={ind}>
                      <div className='grid grid-cols-2 items-center gap-4'>
                        <Textarea
                          label='Вопрос'
                        />
                        <div>
                          {Array(4).fill(1).map((_, i) => {
                            return (
                              <Button>
                                {i + 1}
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        {Array(4).fill(1).map((_, i) => {
                          return (
                            <Textarea
                              label={`Ответ ${i + 1}`}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
                <div className='flex justify-center gap-4 mt-5'>
                  <Button>
                    Добавить вопрос
                  </Button>
                  <Button>
                    Сохранить
                  </Button>
                </div>
              </Tabs.Panel>
            )
          })}
      </Tabs>      
    </div>
  )
}

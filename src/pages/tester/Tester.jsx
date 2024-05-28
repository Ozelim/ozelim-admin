import { Button, Checkbox, SegmentedControl, Tabs, TextInput, Textarea } from '@mantine/core'
import React from 'react'
import { pb } from 'shared/api'

async function getTester () {
  return await pb.collection('tester').getFullList()
}

export const Tester = () => {

  const [tester, setTester] = React.useState({})

  React.useEffect(() => {
    getTester()
    .then(res => {
      setTester(res)
    })
  }, [])

  return (
    <div>
      <Tabs>
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
              </Tabs.Panel>
            )
          })}
      </Tabs>      
    </div>
  )
}

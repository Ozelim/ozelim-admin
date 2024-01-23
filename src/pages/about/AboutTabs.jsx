import { Tabs } from '@mantine/core'
import React from 'react'
import { About } from './About'
import { AboutKz } from './AboutKz'

export const AboutTabs = () => {
  return (
    <div>
      <Tabs>
        <Tabs.List>
          <Tabs.Tab value='rus'>
            Русский
          </Tabs.Tab>
          <Tabs.Tab value='kz'>
            Казахский
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='rus'>
          <About/>
        </Tabs.Panel>
        <Tabs.Panel value='kz'>
          <AboutKz/>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

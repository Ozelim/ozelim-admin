import { Tabs } from '@mantine/core'
import React from 'react'

export const SwitchLayout = ({ru, kz}) => {
  return (
    <Tabs
      defaultValue='ru'
    >
      <Tabs.List>
        <Tabs.Tab value='ru'>
          Русский
        </Tabs.Tab>
        <Tabs.Tab value='kz'>
          Казахский
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='ru'>
        {ru}
      </Tabs.Panel>
      <Tabs.Panel value='kz'>
        {kz}
      </Tabs.Panel>
    </Tabs>
  )
}

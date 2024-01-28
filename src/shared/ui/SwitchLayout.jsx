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
      <Tabs.Panel value='ru' pt={20}>
        {ru}
      </Tabs.Panel>
      <Tabs.Panel value='kz' pt={20}>
        {kz}
      </Tabs.Panel>
    </Tabs>
  )
}

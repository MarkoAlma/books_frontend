import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Affix, Button, Flex, Paper, Text, Title } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import Categories from './components/Categories'


function App() {
  const {height, width} = useViewportSize();

  return (
    <>
          <Flex
      mih={height}
      bg="rgba(247, 255, 223, 1)"
      gap="md"
      justify="center"
      align="center"
      direction="row"
      wrap="wrap"
    >

      <Affix position={{ top: 20 }} style={{width:width, textAlign:'center'}}>
        <Title order={3}>Válogass a könyvtárban</Title>
      </Affix>

    <Categories/>
    </Flex>
    </>
  )
}

export default App

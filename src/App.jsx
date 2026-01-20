import { Container, Title, Text, Stack, Affix } from '@mantine/core'
import { useMediaQuery, useViewportSize } from '@mantine/hooks'
import Categories from './components/Categories'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Books from './components/Books'
import BooksByCateg from './components/BooksByCateg'
import SearchResult from './components/SearchResult'
import "./app.css"
import MyMenu from './components/MyMenu'
import Dashboard from './components/Dashboard'
import { useState } from 'react'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { height } = useViewportSize()
  // const isMobile = useMediaQuery('(max-width: 500px)')
  const location = useLocation();  // Hook, amely visszaadja az aktuális helyet
  const [isAdmin, setIsAdmin] = useState(false)

  return (

<>
    <Affix position={{top: 20, right:20}}>
      <MyMenu setIsAdmin={setIsAdmin}/>
    </Affix>
    <Container
    className='cont'
      fluid
      style={{
        minHeight: height,
        backgroundColor: '#0b0e14',
        backgroundImage:
          'radial-gradient(circle at 20% 10%, rgba(99,102,241,0.12), transparent 40%)',
        paddingTop: 100,
      }}
    >
      <Stack align="center" spacing={6} mb={70}>
<Title
  order={1}
  fw={800}
  style={{
    fontFamily: "Inter, SF Pro, system-ui",
    letterSpacing: '-0.03em',
    background: 'linear-gradient(90deg, #818cf8, #22d3ee)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}
>
  Könyvtár
</Title>


        {location.pathname == "/" &&
        <Text size="md" c="#9ca3af">
          Válaszd ki a kategóriát
        </Text> }
      </Stack>

      <Routes>
        <Route path='/' element={<Categories/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/books/categ/:categId' element={<BooksByCateg/>}/>
        <Route path='/books/search/:txt' element={<SearchResult/>}/>
        <Route path='/dashboard' element={<ProtectedRoute isAdmin={isAdmin}> <Dashboard/> </ProtectedRoute>}/>
      </Routes>
    </Container>
</>



  )
}

export default App

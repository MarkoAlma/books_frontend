import React from 'react'
import { useParams } from 'react-router-dom'
import { getBooksByTitle } from '../utils'
import { Alert, Grid, Loader, Skeleton, Text } from '@mantine/core'
import MyCard from './MyCard'
import { useQuery } from '@tanstack/react-query'
import { IconInfoCircle } from '@tabler/icons-react'

const SearchResult = () => {
    const {txt} = useParams()
      const { isLoading, isError, data, error } = useQuery({
    queryKey: ['booksbytitle', txt],
    queryFn: getBooksByTitle,
  })


  if (isError) {
    return (
      <Alert
        icon={<IconInfoCircle />}
        color="red"
        radius="md"
        variant="light"
        title="Hiba"
      >
        <p style={{color:'gray'}}>{error.message}</p>
      </Alert>
    )
  }
  return (
    <>
    
    <Text size="md" c="#9ca3af" style={{paddingBottom:'20px', marginTop:'-54px', paddingBottom:'70px', textAlign:'center'}}>
             Keresett cím: {txt}
            </Text>  
    {!isLoading ? data.data.length > 0 ?
    <>
    <Grid
          gutter={32}
          justify="center"
          style={{ maxWidth: 1200, margin: '0 auto' }}
        >
            
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <Grid.Col key={i} span={{ base: 12, sm: 6, md: 4 }}>
                <Skeleton height={150} radius="lg" />
              </Grid.Col>
            ))}
        
          {data?.data.map((category) => (
            
            <Grid.Col
              key={category.id}
              span={{ base: 12, sm: 6, md: 4 }}
            >
              <MyCard {...category}/>
            </Grid.Col>
          ))}
        </Grid> </> :
              <Alert
        icon={<IconInfoCircle />}
        color="red"
        radius="md"
        variant="dark"
        title="Nincs találat!"
      >

      </Alert>
         :
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}><Loader style={{textAlign:'center'}}/></div>}
        </>
  )
}

export default SearchResult

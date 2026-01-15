import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getBooks } from '../utils'
import { Grid, Skeleton, Text } from '@mantine/core'
import MyCard from './MyCard'

const Books = () => {

        const { isLoading, isError, data, error } = useQuery({
    queryKey: ['allbooks'],
    queryFn: getBooks,
  })

  return (
    <>{data && 
        <Text size="md" c="#9ca3af" style={{paddingBottom:'20px', marginTop:'-54px', paddingBottom:'70px', textAlign:'center'}}>
          Összes könyv
        </Text>  
    
    }
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
        </Grid>
        </>
  )
}

export default Books

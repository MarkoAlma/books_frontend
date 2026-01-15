import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { IconInfoCircle } from '@tabler/icons-react'
import { getBooksByCateg } from '../utils'
import {
  Alert,
  Card,
  Center,
  Grid,
  Skeleton,
  Text,
  Title,
} from '@mantine/core'
import MyCard from './MyCard'

const BooksByCateg = () => {
        const {categId} = useParams()
      const { isLoading, isError, data, error } = useQuery({
    queryKey: ['booksbycateg', categId],
    queryFn: getBooksByCateg,
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
        {error.message}
      </Alert>
    )
  }

  return (
    <>{data && 
        <Text size="md" c="#9ca3af" style={{paddingBottom:'20px', marginTop:'-54px', paddingBottom:'70px', textAlign:'center'}}>
          {data.data[0].category}
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

export default BooksByCateg

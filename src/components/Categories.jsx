import { Alert, Box, Center, Loader, Paper, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { IconInfoCircle } from '@tabler/icons-react';
import { getCategories } from '../utils'

const Categories = () => {

  const {isLoading, isError, status, data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  data && console.log(data);
  isError && console.log(error);
  isLoading && console.log(isLoading);
  
    const icon = <IconInfoCircle />;

  return (
    <>
    {isError && <Alert variant="light" color="red" radius="xl" title="Error" icon={icon}>
      {error.message}
    </Alert>}
        {isLoading ? <Loader color="blue" /> :
        data && data.data.map(obj =>
            <Box key={obj.id}>
                <Paper shadow="md" radius="lg" p="xl" style={{width:'300px'}}>
                <Center><Title order={3}>{obj.name}</Title></Center>
                </Paper>
            </Box>
        )

    }
    </>
  )
}

export default Categories
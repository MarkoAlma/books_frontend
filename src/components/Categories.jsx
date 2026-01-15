import {
  Alert,
  Card,
  Center,
  Grid,
  Skeleton,
  Text,
  Title,
} from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { IconInfoCircle } from '@tabler/icons-react'
import { getCategories } from '../utils'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const navigate = useNavigate()

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
  if (isLoading) {
    return "alma"
  }

  return (
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
          <Card
          onClick={()=>navigate("/books/categ/"+category.id)}
          className="category-card"
            padding="xl"
            radius="lg"
            withBorder
            style={{
              background:
                'linear-gradient(180deg, #171c28 0%, #121624 100%)',
              borderColor: '#232a3a',
              boxShadow:
                '0 6px 18px rgba(0,0,0,0.45)',
              transition: 'all 0.25s ease',
              cursor:'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#6366f1'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#232a3a'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >

            <Center className='kar' style={{ height: 100 }}>
              <Title
              className='kiscim'
                order={4}
                fw={600}
                c="#e5e7eb"
                style={{ letterSpacing: '-0.01em' }}
              >
                {category.name}
              </Title>
            </Center>

            <Text size="sm" align="center" c="#9ca3af">
              Megnyitás →
            </Text>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  )
}

export default Categories

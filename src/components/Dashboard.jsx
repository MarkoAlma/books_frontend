import { Button, Flex, Modal, ScrollArea, Table, TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { createBook, readBooks } from '../utils';
import { ActionIcon, Group, Text } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({title:'',author:'',description:''});
  const [showForm, setShowForm] = useState(false)

  const handleChange = (e)=> {
    setNewBook({...newBook,[e.target.name]:e.target.value})
  }

  const handleSave = async (e)=> {
    e?.preventDefault()
    try {
        const bookToSave = {...newBook, category_id:1, cover:"borító",rating:1}
        const savedBook = await createBook(bookToSave)
        setBooks((prev)=>[...prev, savedBook])
        setShowForm(false)
        setNewBook({title:'',author:'',description:''})
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    readBooks(setBooks);
  }, []);

  const rows = books.map((obj) => (
    <Table.Tr
      key={obj.id}
      sx={{
        '&:hover': {
          backgroundColor: '#1e293b', // finom hover, nem vibráló
        },
      }}
    >
      <Table.Td>
        <Text fw={500} c="#f1f5f9">
          {obj.title}
        </Text>
      </Table.Td>
      <Table.Td c="#cbd5e1">{obj.author}</Table.Td>
      <Table.Td
        c="#94a3b8"
        sx={{
          maxWidth: 300,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {obj.description}
      </Table.Td>
      <Table.Td>
        <Group spacing="xs">
          {/* Törlés ikon */}
          <ActionIcon
            variant="filled"
            color="red"
            radius="md"
            sx={{
              '&:hover': { backgroundColor: '#ef4444' },
              transition: 'all 0.2s ease',
            }}
          >
            <IconTrash size={18} />
          </ActionIcon>
          {/* Módosítás ikon */}
          <ActionIcon
            variant="filled"
            color="indigo"
            radius="md"
            sx={{
              '&:hover': { backgroundColor: '#6366f1' },
              transition: 'all 0.2s ease',
            }}
          >
            <IconEdit size={18} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
    <ScrollArea h={600}
      sx={{
        maxHeight: '70vh',
        borderRadius: 12,
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
      }}
    >
      <Table
        stickyHeader
        verticalSpacing="sm"
        horizontalSpacing="md"
        styles={{
          table: {
            backgroundColor: '#0f172a', // alap táblázat háttér
            minWidth: '600px',
            borderRadius: 12,
          },
          thead: {
            backgroundColor: '#111827', // dark fejléc
            position: 'sticky',
            top: 0,
            zIndex: 5,
            borderBottom: '2px solid #1e293b',
          },
          th: {
            color: '#f1f5f9', // kontrasztos fejléc szöveg
            fontWeight: 600,
            textTransform: 'uppercase',
            fontSize: 13,
            letterSpacing: 0.5,
            padding: '12px 16px',
            borderBottom: '1px solid #1e293b',
          },
          td: {
            color: '#cbd5e1',
            padding: '12px 16px',
            borderBottom: '1px solid #1e293b',
          },
          tr: {
            transition: 'background-color 0.2s ease',
          },
          caption: {
            color: '#64748b',
            paddingTop: 12,
          },
        }}
      >
        
        <Table.Caption>Összesen {rows.length} könyv adata</Table.Caption>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Cím</Table.Th>
            <Table.Th>Szerző</Table.Th>
            <Table.Th>Leírás</Table.Th>
            <Table.Th>Akciók</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>

        
<Modal
  opened={showForm}
  onClose={()=>setShowForm(false)}
  title="Új könyv adatai"
  centered
  radius="lg"
  overlayProps={{
    backgroundOpacity: 0.55,
    blur: 4,
  }}
  styles={{
    header: {
      backgroundColor: '#0f172a',
      borderBottom: '1px solid #1e293b',
    },
    title: {
      color: '#e5e7eb',
      fontWeight: 600,
      fontSize: '1.1rem',
    },
    content: {
      backgroundColor: '#020617',
      boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
    },
    close: {
      color: '#94a3b8',
      '&:hover': {
        backgroundColor: '#020617',
        color: '#e5e7eb',
      },
    },
  }}
>
  <form onSubmit={handleSave}>
  <TextInput

    label="Cím"
    placeholder="Cím"
    mt="md"
    radius="md"
    name='title'
    value={newBook.title}
    onChange={handleChange}
    required
    styles={{
      label: {
        color: '#cbd5f5',
        marginBottom: 6,
      },
      input: {
        backgroundColor: '#020617',
        borderColor: '#1e293b',
        color: '#e5e7eb',
        '&::placeholder': {
          color: '#64748b',
        },
        '&:focus': {
          borderColor: '#6366f1',
        },
      },
      visibilityToggle: {
        color: '#94a3b8',
      },
    }}
        data-autofocus
  />

  <TextInput

    label="Szerző"
    placeholder="Szerző"
    mt="md"
    radius="md"
    name='author'
    value={newBook.author}
    onChange={handleChange}
    required
    styles={{
      label: {
        color: '#cbd5f5',
        marginBottom: 6,
      },
      input: {
        backgroundColor: '#020617',
        borderColor: '#1e293b',
        color: '#e5e7eb',
        '&::placeholder': {
          color: '#64748b',
        },
        '&:focus': {
          borderColor: '#6366f1',
        },
      },
      visibilityToggle: {
        color: '#94a3b8',
      },
    }}
        data-autofocus
  />

    <TextInput

    label="Leírás"
    placeholder="Leírás"
    mt="md"
    radius="md"
    name='description'
    value={newBook.description}
    onChange={handleChange}
    required
    styles={{
      label: {
        color: '#cbd5f5',
        marginBottom: 6,
      },
      input: {
        backgroundColor: '#020617',
        borderColor: '#1e293b',
        color: '#e5e7eb',
        '&::placeholder': {
          color: '#64748b',
        },
        '&:focus': {
          borderColor: '#6366f1',
        },
      },
      visibilityToggle: {
        color: '#94a3b8',
      },
    }}
        data-autofocus
  />

  <Button
    fullWidth
    mt="xl"
    radius="md"
    size="md"
    onClick={handleSave}
    styles={{
      root: {
        background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        boxShadow: '0 10px 30px rgba(79,70,229,0.35)',
        '&:hover': {
          background: 'linear-gradient(135deg, #4f46e5, #4338ca)',
        },
      },
    }}
  >
    Mentés
  </Button>
  </form>
  {/* {error && (
  <Alert
    mt="md"
    styles={{
      root: {
        backgroundColor: 'rgba(127, 29, 29, 0.25)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
      },
      message: {
        color: '#fee2e2',
        fontWeight: 500,
      },
    }}
  >
    Hibás jelszó!
  </Alert>
)} */}

</Modal>


      </Table>
    </ScrollArea>
    <div style={{display:'flex', justifyContent:'center', height:'100%', paddingTop:'45px'}}>
<Button
  onClick={() => setShowForm(true)}
  radius="md"
  size="md"
  fullWidth={false}
  styles={{
    root: {
      background: 'linear-gradient(135deg, #4f46e5, #6366f1)', // elegáns lila gradient
      color: '#f1f5f9',
      fontWeight: 600,
      boxShadow: '0 6px 15px rgba(79,70,229,0.4)',
      transition: 'all 0.2s ease',
    },
    rootHovered: {
      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
      boxShadow: '0 8px 20px rgba(79,70,229,0.6)',
      transform: 'translateY(-1px)',
    },
  }}
>
  Új könyv hozzáadása
</Button>
</div>
    </>
    
  );
}


export default Dashboard
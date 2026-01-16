import { Menu, Button, TextInput, Burger, Center, Modal, PasswordInput, Alert} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconMenu2 } from '@tabler/icons-react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { IconDashboard } from '@tabler/icons-react'
import { IconSearch, IconBooks, IconCategory } from '@tabler/icons-react'
import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyMenu = ({setIsAdmin}) => {

    const [opened, setOpened] = useState(false);
    const [error, isError] = useState(false)
    const navigate = useNavigate()
    const [value, setValue] = useState('');
    const kereso = ()=> {
        navigate("books/search/" + value)
        setOpened(false)
        setTimeout(() => {
            setValue('')
        }, 250);
    }
    const [modalOpened, { open:openModal, close:closeModal }] = useDisclosure(false);
    const [password, setPassword] = useState('')

    const handleSubmit = (e)=> {
      e?.preventDefault();

      isError(false)
      if (password == import.meta.env.VITE_ADMIN_PW) {
        setIsAdmin(true)
        closeModal()
        navigate('/dashboard')
      }else {
        isError(true)
      }
      setPassword('')
    }

    const passwordRef = useRef(null);

// amikor modalOpened változik
useEffect(() => {
  if (modalOpened) {
    // kis késleltetés a DOM render miatt
    setTimeout(() => {
      passwordRef.current?.focus();
    }, 50);
  }
}, [modalOpened]);

  return (
    <>
    <Menu
    opened={opened} onChange={setOpened}
      shadow="lg"
      position="bottom-end"
      transitionProps={{ transition: 'pop', duration: 150 }}
    >
      <Menu.Target>

          <Burger opened={opened} onClick={()=>setOpened(e=>!e)} aria-label="Toggle navigation" color='white' />
        
      </Menu.Target>

      <Menu.Dropdown className="menu-dropdown">

        <TextInput
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Keresés..."
          radius="md"
          size="sm"
          className="search-input"
          rightSection={
            <Center
              className="search-icon-container"
              onClick={() => kereso()}
            >
              <IconSearch size={18} />
            </Center>
          }
        />

        <Menu.Item
          leftSection={<IconCategory size={16} />}
          onClick={()=>navigate("/")}
        >
          Kategóriák
        </Menu.Item>

        <Menu.Item
          leftSection={<IconBooks size={16} />}
          onClick={()=>navigate("/books")}
        >
          Összes könyv
        </Menu.Item>
        <Menu.Item
          leftSection={<IconDashboard size={16} />}
          onClick={openModal}
        >
          Vezérlőpult
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>


<Modal
  opened={modalOpened}
  onClose={closeModal}
  title="Admin belépés"
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
  <form onSubmit={handleSubmit}>
  <PasswordInput
    ref={passwordRef} // ide tesszük a ref-et
    label="Admin jelszó"
    placeholder="Jelszó"
    mt="md"
    radius="md"
    
    value={password}
    onChange={(e) => setPassword(e.target.value)}
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
        
  />

  <Button
    fullWidth
    mt="xl"
    radius="md"
    size="md"
    onClick={handleSubmit}
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
    Belépés
  </Button>
  </form>
  {error && (
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
)}

</Modal>

    </>
  )
}

export default MyMenu

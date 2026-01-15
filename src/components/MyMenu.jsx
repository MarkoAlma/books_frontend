import { Menu, Button, TextInput, Burger, Center} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconMenu2 } from '@tabler/icons-react'
import { IconSearch, IconBooks, IconCategory } from '@tabler/icons-react'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyMenu = () => {

      const [opened, setOpened] = useState(false);
    const navigate = useNavigate()
    const [value, setValue] = useState('');
    const kereso = ()=> {
        navigate("books/search/" + value)
        setOpened(false)
        setTimeout(() => {
            setValue('')
        }, 250);
    }

  return (
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
      </Menu.Dropdown>
    </Menu>
  )
}

export default MyMenu

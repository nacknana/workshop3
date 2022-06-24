import React, { useState, useEffect } from 'react'
import { Menu, Input, Button, Dropdown, Icon } from 'semantic-ui-react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import '../assets/Navbar.css'
import axios from 'axios'


function Navbar() {
  const [page, setPage] = useState("home")
  const [category, setCategory] = useState([])
  const [cateLoading, setCateLoading] = useState(false)
  const [selectCat, setSelectCat] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getCategory()
  }, [])


  useEffect(() => {
    let path = location.pathname
    if (path === '/') {
      setSelectCat(0)
      return setPage('home')
    }
    else if (path.startsWith('category', 1)) {
      setSelectCat(parseInt(path.slice('/category/'.length, path.length - 1)))
      return setPage('category')
    }
    else {
      setSelectCat(0)
      setPage(path.slice(1, path.length - 1))
    }
  }, [location])

  const getCategory = async () => {
    setCateLoading(true)
    const cate = await axios.get('categories/')
    setCategory([
      { key: 0, text: 'Category', value: 0, disabled: true },
      ...cate.data.data?.map((cate) => {
        return {
          key: cate.id,
          text: cate.name[0].toUpperCase() + cate.name.slice(1).toLowerCase(),
          value: cate.id
        }
      })
    ])
    setCateLoading(false)
  }

  const handleItemClick = (e) => {
    const txt = e.target.text.toLowerCase()
    // setPage(txt)
    setSelectCat(0)
    if (txt === 'home') {
      return navigate('/')
    }
    return navigate(`${txt}/`)
  }

  const dropCateChang = (e, data) => {
    // setPage('category')
    setSelectCat(data.value)
    if (data.value === 0) {
      setPage('home')
      return navigate(`/`)
    }
    return navigate(`category/${data.value}/`)
  }


  return (
    <div >
      <Menu className='menu-navbar' tabular attached='top'>
        <Menu.Item as={Link} to="/" onClick={() => { setPage('home'); setSelectCat(0) }} >
          <span className='logo'>NShop</span>
        </Menu.Item>
        <Menu.Item
          name='Home'
          active={page === "home"}
          onClick={handleItemClick}
        />
        <Menu.Item active={page === "category"} >
          <Dropdown
            as={'dropdown'}
            loading={cateLoading}
            fluid
            inline
            item
            options={category}
            onChange={dropCateChang}
            value={selectCat} />
        </Menu.Item>
        <Menu.Item
          disabled
          name='Contact'
          active={page === "contact"}
          onClick={handleItemClick}
        />
        <Menu.Item active={page === "about"}
          name='About'
          onClick={handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item >
            <Input
              disabled={['home', 'category'].findIndex((value) => value === page) === -1 ? true : false}
              icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item>
            <Button.Group>
              <Button as={Link} to='login/' ><Icon name='user' />Login</Button>
              <Button.Or />
              <Button as={Link} to={'register/'} positive><Icon name='add user' />Regis</Button>
            </Button.Group>

          </Menu.Item>
        </Menu.Menu>
      </Menu>

    </div>
  )
}

export default Navbar
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Input, Button, Dropdown, Icon, Container, Header, Dimmer } from 'semantic-ui-react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import '../assets/Navbar.css'
import axios from 'axios'

import { SET_AUTH_REQ } from '../saga/actionsType'


function Navbar() {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const action = (type, payload) => dispatch({ type, payload })
  const [page, setPage] = useState("home")
  const [category, setCategory] = useState([])
  const [cateLoading, setCateLoading] = useState(false)
  const [selectCat, setSelectCat] = useState(0)
  const [stateLogout, setStateLogout] = useState(false)
  const [countCart, setCountCart] = useState(0)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getCategory()
    if (user) {
      getCart()
    }
  }, [])

  useEffect(() => {
    if (user) {
      getCart()
    }
  }, [user])


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

  const getCart = () => {
    axios.get('carts/',
      {
        headers: {
          Authorization: `Bearer ${user.access}`
        }
      }
    ).then((res) => {
      // console.log(res.data.data);
      setCountCart(res.data.data.length)
    }).catch((err) => {
      console.log(err.response);
    })
  }

  const handleItemClick = (e) => {
    const txt = e.target.text.toLowerCase()
    // setPage(txt)
    setSelectCat(0)

    if (txt === 'home') {
      document.title = 'NShop'
      return navigate('/')
    }
    document.title = txt
    return navigate(`${txt}/`)
  }

  const dropCateChang = (e, data) => {
    // setPage('category')
    setSelectCat(data.value)
    if (data.value === 0) {
      setPage('home')
      return navigate(`/`)
    }
    // console.log(data);
    return navigate(`category/${data.value}/`)
  }

  const logouot = (e) => {
    action(SET_AUTH_REQ, null)
    setStateLogout(false)
  }

  const clickSearch = () => {
    setSearch('')
    navigate(`/?search=${search}`)
  }
  const searchChang = (e, data) => {
    setSearch(data.value)
  }


  return (
    <div >

      <Menu
        stackable
        // vertical
        tabular='right'
        fluid
        className='menu-navbar'
      // attached='top'
      >
        <Container className=''>
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
              className='d-flex'
              // as={'dropdown'}

              // loading={cateLoading}
              // fluid
              // inline
              // item
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
        </Container>
        <Container>
          <Menu.Menu
            position='right'
          >

            <Menu.Item >
              <Input
                disabled={['home', 'category'].findIndex((value) => value === page) === -1 ? true : false}
                onChange={searchChang} value={search}
                icon={<Icon name='search' inverted circular link onClick={clickSearch} />}
                placeholder='Search...'

              />
            </Menu.Item>
            {user ?

              <Menu.Item className='d-flex justify-content-center '>
                <Button animated as={Link} to={'/cart/'}>
                  <Button.Content hidden>
                    Cart</Button.Content>
                  <Button.Content visible>
                    <Icon name='shop' /><span className="font-num position-absolute top-0 start-100 translate-middle badge rounded-pill text-danger bg-white ">{countCart}</span>
                  </Button.Content>

                </Button>
                <div style={{ width: '10px' }}></div>
                <Button
                  animated onClick={() => {
                    setStateLogout(true)
                  }}>

                  <Button.Content visible >
                    <Icon name='log out' />
                  </Button.Content>
                  <Button.Content hidden >Logout</Button.Content>
                </Button>
              </Menu.Item>

              : <Menu.Item className='d-flex justify-content-center'>
                <Button.Group >
                  <Button as={Link} to='login/' ><Icon name='user' />Login</Button>
                  <Button.Or />
                  <Button as={Link} to={'register/'} positive><Icon name='add user' />Regis</Button>
                </Button.Group>


              </Menu.Item>}
          </Menu.Menu>
          <Dimmer
            page
            active={stateLogout}
            onClickOutside={() => {

              console.log('Clicck');
              setStateLogout(false)
            }}
          >
            <Header as='h2' size='huge' icon inverted color='red'>
              <Container>
                <Header icon inverted>
                  <Icon name='log out' />
                  Do you want to Log out?
                </Header>
                <Button.Group size='huge'>
                  <Button onClick={logouot} color='youtube' >Logout</Button>
                  <Button onClick={() => { setStateLogout(false) }}>Cancle</Button>
                </Button.Group>
              </Container>
            </Header>
          </Dimmer>
        </Container>
      </Menu>


    </div>
  )
}

export default Navbar
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Icon, Button, Dropdown, Input, Container, Form, Search } from 'semantic-ui-react'
import '../assets/navbar.css'
import { SearchCategory } from '../actions/CategoryAction'
import { SEARCH_PRODUCT_REQ, BREAD_LINK_REQ } from '../saga/actionTypes'
function Navbar() {
    const { user } = useSelector(state => state.auth)
    const { cart } = useSelector((state) => state.cart)
    const [Select, setSelect] = useState('home')
    const history = useHistory();
    const dispatch = useDispatch();
    const [Searched, setSearched] = useState('')
    const action = (type, search) => dispatch({ type, search })
    const detailhistory = useHistory();
    const handleItemClick = (event) => {
        const selected = event.target.textContent;
        setSelect(selected)
        if (selected === "Home") {
            setSelect(selected)
            return history.push("/")
        }
        history.push(`/${selected}/`)

    }
    const handleSearch = (event) => {
        event.preventDefault()
        history.push(`/products/`)
        return action(SEARCH_PRODUCT_REQ, Searched)
    }
    function handleclick(category_in) {
        history.push(`/products/${category_in}/`)
    }
    const [Product, setProduct] = useState([])
    useEffect(() => {
        axios.get('http://0.0.0.0:8000/category/', {
            params: {
                is_enabled: true,
                search: Searched
            }
        })
            .then(data => {
                const res = data.data.data.results
                setProduct(res)
            })
    }, [])
    const logout = () => {
        localStorage.clear();
        window.location.href = ('/')
    }
    return (
        <div>
            <Menu className="Menu-navbar" inverted fixed='top'>
                <Container>
                    <Menu.Item as={Link} to="/">
                        <span className="logo">Mirrorless</span>
                    </Menu.Item>
                    <Menu.Item
                        name='home'
                        active={Select === 'home'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='products'
                        active={Select === 'products'}
                        onClick={handleItemClick}
                    />
                    <Dropdown text='Categories' pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Header>Categories</Dropdown.Header>
                            {Product.map(datas => (
                                <Dropdown.Item key={datas.id} onClick={() => handleclick(datas.id)}>{datas.name}</Dropdown.Item>
                            )
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input className="input-custom" type='text' placeholder='Sony a1' action value={Searched} onChange={e => setSearched(e.target.value)}><input />
                                <Button onClick={(e) => handleSearch(e)}>ค้นหา</Button>
                            </Input>
                        </Menu.Item>
                        {user &&
                            <Menu.Item onClick={() => detailhistory.push(`/Cart/`)}>
                                <Icon name="cart" color="white" />{' '}
                                <span color="black">
                                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            </Menu.Item>
                        }
                        <Menu.Item>
                            {user ?
                                <span>Welcome,{user.data.user}</span>
                                :
                                <span>Welcome</span>
                            }
                        </Menu.Item>
                        {user ?
                            <Menu.Item onClick={() => detailhistory.push(`/invoice/`)}>
                                <span>Invoice</span>
                            </Menu.Item>
                            :
                            <span></span>
                        }
                        <Menu.Item>
                            {user ?
                                <Button animated='fade' negative onClick={() => logout()}>
                                    <Button.Content visible><Icon name="sign out" /></Button.Content>
                                    <Button.Content hidden>Sign Out</Button.Content>
                                </Button>
                                :
                                <Button animated='fade' primary onClick={() => detailhistory.push(`/login`)}>
                                    <Button.Content visible><Icon name="sign in" /></Button.Content>
                                    <Button.Content hidden>Sign in</Button.Content>
                                </Button>}
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu >
        </div >
    )
}

export default Navbar;

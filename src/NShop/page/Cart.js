import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TableCart from '../item/TableCart'
import Breadcrumbs from '../layout/Breadcrumb'

export default function Cart() {
    document.title = 'cart'
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)

    const [cart, setCart] = useState([])

    useEffect(() => {
        if (!user) {
            alert('Please Login')
            navigate('/')
        } else {
            getCart()
        }
    }, [user])

    const getCart = () => {
        axios.get('carts/',
            {
                headers: {
                    Authorization: `Bearer ${user.access}`
                }
            }
        ).then((res) => {
            // console.log(res.data.data);
            const data = res.data.data
            setCart(data)
        }).catch((err) => {
            console.log(err.response);
        })
    }

    return (
        <>
            <div>
                <Breadcrumbs paths={['cart']} />
            </div>
            <div style={{ width: '100vw', minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className='container'>
                    {/* {console.log(cart)} */}
                    {/* <img src={cart.product.img.small_square_crop} style={{ width: '200px', height: '200px' }} alt={product.name} /> */}
                    {cart.length > 0 && <TableCart newData={cart} user={user} />}
                </div>
            </div>

        </>

    )
}

import React, { useEffect, useState, } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios';
import { Button, Icon, Dimmer } from 'semantic-ui-react'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Breadcrumbs from '../layout/Breadcrumb';
import { useSelector } from 'react-redux';
import Login from './Login';



export default function ProductDetail() {

    const { id } = useParams()
    const [imgs, setImgs] = useState([])
    const [prod, setProd] = useState([])
    const [cate, setCate] = useState([])
    const [dimmer, setDimmer] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        getProductDetail(id)

    }, [id])

    useEffect(() => {
        if (user) {
            setDimmer(false)
        }
    }, [user])

    const getProductDetail = async (idPro) => {
        await axios.get(`product/${idPro}/`).then((res) => {
            const prod = res.data.data
            setProd(prod)
            setImgs([{ 'url': prod.img.medium_square_crop }
                , ...prod.imgs_product.map((data) => ({ 'url': data.img.medium_square_crop }))])
            document.title = prod.name
            axios.get(`category/${prod.category}/`).then((res) => {
                setCate(res.data.data)
            })

        })
    }
    // console.log(imgs);

    const addToCart = async (e, data) => {
        if (user) {
            await axios.post('carts/', {
                'product': prod.id,
                'quantity': quantity
            },
                {
                    headers: {
                        Authorization: `Bearer ${user.access}`
                    }
                }).then((res) => {
                    alert(`เพิ่ม ${prod.name} ลงในตะกร้าเรียบร้อย`)
                    window.location.reload()
                }).catch((err) => {
                    console.log(err.response.data);
                    alert(err.response.data.msg)
                })
        }
        else {
            console.log('want Login');
            setDimmer(true)
        }

    }

    return (
        <div >
            <div>
                <Breadcrumbs paths={[`${cate.name}`, `${prod.name}`]} url={`/category/${prod.category}/`} />
            </div>

            <div className='d-flex m-3'>
                <div className='d-flex m-5 align-content-center justify-content-center'>

                    {imgs.length > 0 ?
                        <Carousel   >
                            {imgs.map((img, index) => {
                                return <div key={index}>
                                    <img src={img.url} alt={img.url} />
                                    <p className="legend">{prod.name}</p>
                                </div>
                            })}

                        </Carousel> : <div>No images</div>

                    }

                </div>
                <div className='container position-relative'>
                    <div className="text-black-75  fs-1 text-center ">{prod.name}</div>
                    <div >
                        <h3>รายละเอียด<br></br>&emsp;&emsp;-{prod.detail} </h3>
                    </div>

                    <div className='position-absolute top-50 start-0'>
                        <h1 >ราคา  <b className='font-num'>{prod.price?.toLocaleString('en-US', 2)}</b> บาท</h1>
                    </div>
                    <div className='position-absolute top-50 d-flex' style={{ marginLeft: '280px' }}>
                        <input type="number" className="font-num form-control fs-2 text-center" min={1} max={10} defaultValue={1} onChange={(e) => { setQuantity(e.target.value) }} />
                        <div style={{ marginLeft: '8px' }}>
                            <Button animated='vertical' size='huge' id={prod.id} primary onClick={addToCart} >
                                <Button.Content hidden>add Cart</Button.Content>
                                <Button.Content visible>
                                    <Icon name='add to cart' />
                                </Button.Content>

                            </Button>
                        </div>
                        <Dimmer
                            page
                            active={dimmer}
                            onClickOutside={() => {
                                setDimmer(false)
                            }}
                        >
                            <Login></Login>
                        </Dimmer>
                    </div>

                </div>
            </div>




        </div>
    )
}

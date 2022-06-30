import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { Dropdown } from 'semantic-ui-react'
import Breadcrumbs from '../layout/Breadcrumb'
import CardProd from '../item/CardProd'
import '../assets/home.css'

const Ordering = {
  '': 'Select To Sort',
  'asc': 'Low To Height',
  'desc': 'Height To Low'
}

export default function Home() {
  const { id, search } = useParams()
  const [prods, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [orderBy, setOrderBy] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getProduct()
  }, [id, location, orderBy])

  useEffect(() => {
    getCate()
  }, [])

  const getCate = async () => {
    const cate = await axios.get('categories/')
    setCategories(cate.data.data)
  }

  const getProduct = async () => {
    await axios.get(`products/`,
      {
        params: {
          sort: orderBy,
          category: id,
          search: location.search.slice('?search='.length, location.search.length)
        }
      }
    ).then((res) => {
      setProducts(res.data.data);
    }).catch((err) => {
      alert(err.response.data)
    })



  }
  const handleCateClick = (category) => {
    if (location.pathname === '/') {
      navigate(`category/${category.id}/`)
    }
    else {
      navigate(`/category/${category.id}/`)
    }
  }

  const getNameCate = (idCat) => {
    let name = 'Category'
    categories.forEach((value) => {
      if (parseInt(value.id) === parseInt(idCat)) {
        name = value.name
      }
    })
    return name.toLocaleLowerCase()
  }

  const changOrder = (e, data) => {
    setOrderBy(data.changto)
  }

  return (
    <div >
      <div className='d-flex w-100 '>
        <div className='col-6'> {id && <Breadcrumbs paths={[getNameCate(id)]} />}</div>
        <div className='d-flex col-6  justify-content-end' style={{ marginTop: '20px' }}>
          <div style={{ marginRight: '10vw' }}>
            <Dropdown
              text={Ordering[orderBy]}
              icon={orderBy === '' ? 'sort' : orderBy !== 'asc' ? 'sort ascending' : 'sort descending'}
              floating
              labeled
              button
              className='icon'
            >
              <Dropdown.Menu>
                <Dropdown.Header content='order by Price' />
                <Dropdown.Divider />
                <Dropdown.Item changto='asc' onClick={changOrder}>{Ordering.asc}</Dropdown.Item>
                <Dropdown.Item changto='desc' onClick={changOrder}>{Ordering.desc}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className='main-container  flex-lg-nowrap'>
        <div className='left-box'>
          <h1>Category</h1>
          <div className='list-cate' >
            {
              categories.length > 0 ?
                categories.map((cat, i) => {
                  return <div className="item " style={{ alignItems: 'center' }} key={i} onClick={() => { handleCateClick(cat) }} >
                    <img src={cat.img} alt={cat.name} />
                    <h1 className='text-capitalize text-center'>{cat.name}</h1>
                  </div>
                }) :
                <div style={{ textAlign: 'center', paddingTop: '20px', fontSize: '30px' }}>ไม่พบข้อมูล</div>
            }

          </div>
        </div>
        <div className='right-box'>
          {
            prods.length > 0 ?
              prods.map((prod, i) => {
                return <CardProd key={i} prod={prod} catname={getNameCate(prod.category)} />
              }) :
              <div style={{ marginTop: '50px', textAlign: 'center', paddingTop: '20px', fontSize: '30px', width: '100%' }}>ไม่พบรายการสินค้า</div>
          }
        </div>

      </div>
    </div>
  )
}

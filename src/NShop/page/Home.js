import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from "react-router-dom"
import Breadcrumbs from '../layout/Breadcrumb'
import CardProd from '../item/CardProd'
import '../assets/home.css'

export default function Home() {
  const { id } = useParams()
  const [prods, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getProduct()
  }, [id])

  useEffect(() => {
    getCate()
  }, [])

  const getCate = async () => {
    const cate = await axios.get('categories/')
    setCategories(cate.data.data)
  }

  const getProduct = async () => {
    if (id) {
      const res = await axios.get(`category/${id}/`)
      setProducts(res.data.data.products)
      document.title = getNameCate(id)
    }
    else {
      const res = await axios.get('products/')
      setProducts(res.data.data);
    }

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

  return (
    <div >
      {id && <Breadcrumbs paths={[getNameCate(id)]} />}
      <div className='main-container '>
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

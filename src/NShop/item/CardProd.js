import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import '../assets/CartProd.css'
const lengthTxt = 35;

export default function CardProd({ prod, catname }) {
    const navigate = useNavigate()
    return (
        <div style={{ marginTop: '20px', marginLeft: '20px', marginBottom: '10px' }} >
            <Card className='text-decoration-none' onClick={() => {
                navigate(`/product/${prod.id}/`)
            }} >
                <img src={prod.img} style={{ width: '100%', height: '200px' }} alt={prod.name} />
                {/* <Image fluid src={prod.img} wrapped ui={false} /> */}
                <Card.Content >
                    <Card.Header textAlign='center'>{prod.name}</Card.Header>
                    <Card.Meta >category : {catname}</Card.Meta>
                    <Card.Description className='text-wrap '  >
                        - {prod.detail.length > lengthTxt ? prod.detail.slice(0, lengthTxt).concat(' ...') : prod.detail}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra textAlign='right'>
                    <h4 className='balance font-num'  >
                        <Icon name='btc' />
                        {parseInt(prod.price).toLocaleString('en-US')}
                    </h4>
                </Card.Content>
            </Card>
        </div>
    )
}

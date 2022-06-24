import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import '../assets/CartProd.css'

export default function CardProd({ prod, catname }) {
    const navigate = useNavigate()
    return (
        <div style={{ marginTop: '20px', marginLeft: '20px' }} >
            <Card onClick={() => { }} >
                <img src={prod.img} style={{ width: '100%', height: '200px' }} alt={prod.name} />
                {/* <Image fluid src={prod.img} wrapped ui={false} /> */}
                <Card.Content>
                    <Card.Header textAlign='center'>{prod.name}</Card.Header>
                    <Card.Meta >category : {catname}</Card.Meta>
                    <Card.Description>
                        - {prod.detail}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra textAlign='right'>
                    <p>
                        <Icon name='btc' />
                        {parseInt(prod.price).toLocaleString('en-US')}
                    </p>
                </Card.Content>
            </Card>
        </div>
    )
}

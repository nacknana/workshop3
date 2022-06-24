import React, { useState } from 'react'
import { Button, Form, Grid, Header, Message, Segment, Label } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom"
import '../assets/Login.css'
import axios from 'axios'

export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState([])

    const handleChangUsername = (e, data) => {
        setUsername(data.value)
    }
    const handleChangPassword = (e, data) => {
        setPassword(data.value)
    }
    const handleLoginClicked = async () => {
        const res = await axios.post('token/', {
            'username': username,
            'password': password
        }).then((data) => {
            console.log(data);
            // setToken(res.data)
        }).catch((err) => {
            console.log(err.response.data);
        })

        // console.log(res.status);
        // console.log(res.data);
        // console.log(`username = ${username}  password = ${password}`);
    }

    return (
        <div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center'>
                        {/* <Image src='/logo.png' />  */}
                        Log-in to your account
                    </Header>
                    <Form size='large' >
                        <Segment stacked>
                            <Form.Input
                                onChange={handleChangUsername}
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Username' />
                            <Form.Input
                                onChange={handleChangPassword}
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />

                            <Button color='teal' fluid size='large' onClick={handleLoginClicked}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        No account? <Label onClick={() => { return navigate('/register/') }} >Sign Up</Label>
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
    )
}



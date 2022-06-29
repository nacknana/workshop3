import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Grid, Header, Message, Segment, Label } from 'semantic-ui-react'
import { useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'

import { SET_AUTH_ERROR_REQ, SET_AUTH_REQ } from '../saga/actionsType'

import '../assets/Login.css'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const action = (type, payload) => dispatch({ type, payload })

    const { user, error } = useSelector(state => state.auth)

    useEffect(() => {
        // console.log(location.pathname);
        if (user && location.pathname === '/login/') {
            navigate('/')
        }
    }, [user])

    useEffect(() => {
        action(SET_AUTH_ERROR_REQ, null)
    }, [])



    const handleChangUsername = (e, data) => {
        setUsername(data.value)
    }
    const handleChangPassword = (e, data) => {
        setPassword(data.value)
    }
    const handleLoginClicked = () => {
        axios.post('token/', {
            'username': username,
            'password': password
        }).then(respond => {
            action(SET_AUTH_REQ, respond.data);
            alert('Login Success')
        }).catch((err) => {
            // console.log(err.response);
            action(SET_AUTH_ERROR_REQ, err.response.data)
        })




    }

    return (
        <div className='bg-white p-4 form-control' >

            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header className='text-black' as='h2' textAlign='center' inverted>
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
                                placeholder='Username'
                                required
                            />
                            <Form.Input
                                onChange={handleChangPassword}
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                required

                            />

                            <Button color='teal' fluid size='large' onClick={handleLoginClicked}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    {error &&
                        <Message error className="msg-login">
                            {/* <Message.Header>{error.code}</Message.Header> */}
                            <p>{error.msg}</p>
                        </Message>}
                    <Message>
                        No account? <Label onClick={() => { return navigate('/register/') }} >Sign Up</Label>
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
    )
}



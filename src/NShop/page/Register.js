import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Grid, Header, Message, Segment, Label } from 'semantic-ui-react'
import axios from 'axios'

import { SET_AUTH_ERROR_REQ, SET_AUTH_REQ } from '../saga/actionsType'

export default function Register() {
    const { user, error } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [CPass, setCPass] = useState('')
    const [FName, setFName] = useState('')
    const [LName, setLName] = useState('')
    const [errorPass, setErrorPass] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const action = (type, payload) => dispatch({ type, payload })

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    useEffect(() => {
        if (password.length < 8) {
            setErrorPass('รหัสผ่านต้องมากกว่า 8 ตัว')
        }
        else if (error) {
            setErrorPass(error?.password)
            // action(SET_AUTH_ERROR_REQ, null)
        }
        else {
            setErrorPass(null)
        }
    }, [error, password])


    const SignUp = async (e, data) => {
        // console.log(e);
        console.log(data);
        if (errorPass || data.error) {
            console.log('error');
            return
        }

        console.log('data Success');
        setLoading(true)

        await axios.post('register/', {
            'username': username,
            'password': password,
            'first_name': FName,
            'last_name': LName
        }).then((res) => {
            action(SET_AUTH_REQ, res.data);
            alert('Register Success')
        }).catch((err) => {
            // console.log(err.response);
            action(SET_AUTH_ERROR_REQ, err.response.data)
            console.log(err.response.data);
            setErrorPass(err.response.data.password)
        })


        setLoading(false)
    }

    return (
        <div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center'>
                        {/* <Image src='/logo.png' />  */}
                        Log-in to your account
                    </Header>
                    <Form size='large'
                        error={!(password === CPass)}
                        onSubmit={SignUp}
                        loading={loading}

                    >
                        <Segment stacked>
                            <Form.Input
                                onChange={(e, data) => {
                                    setUsername(data.value)
                                }}
                                name='username'
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Username'
                                required
                                error={error?.username}

                            />
                            <Form.Input
                                onChange={(e, data) => {
                                    setPassword(data.value)
                                }}
                                name='password'
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                required
                                error={errorPass}

                            />
                            <Form.Input
                                onChange={(e, data) => {
                                    setCPass(data.value)

                                }}
                                name='cpass'
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Confirm Password'
                                type='password'
                                required
                                error={(CPass.length > 0 && !(password === CPass) &&
                                    'Confirm Password must equal Password')}
                            />
                            <Form.Input
                                onChange={(e, data) => {
                                    setFName(data.value)
                                }}
                                fluid
                                icon='user circle'
                                iconPosition='left'
                                placeholder='First Name'
                                required

                            />
                            <Form.Input
                                onChange={(e, data) => {
                                    setLName(data.value)
                                }}
                                fluid
                                icon='user circle outline'
                                iconPosition='left'
                                placeholder='Last Name'
                                required

                            />

                            <Button color='teal' fluid size='large'
                            // onClick={handleLoginClicked}
                            >
                                Sign Up
                            </Button>
                        </Segment>
                    </Form>
                    {/* {error &&
                        <Message error className="msg-login">
                            <Message.Header></Message.Header>
                            {error.username && <p></p>}

                        </Message>} */}
                    <Message>
                        Have an account? <Label onClick={() => { return navigate('/login/') }} >Log in</Label>
                    </Message>
                </Grid.Column>
            </Grid>
        </div >
    )
}

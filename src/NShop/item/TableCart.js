import axios from 'axios'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'semantic-ui-react'

// const tableData = [
//     { name: 'John', age: 15, gender: 'Male' },
//     { name: 'Amber', age: 40, gender: 'Female' },
//     { name: 'Leslie', age: 25, gender: 'Other' },
//     { name: 'Ben', age: 70, gender: 'Male' },
// ]



function deleteCart(e, data) {
    axios.delete(`cart/${data.id}/${data.product.id}/`,
        {
            headers: {
                Authorization: `Bearer ${data.user.access}`
            }
        }
    ).then((res) => {
        alert(res.data.msg)
        // console.log(res.data);
        window.location.reload()
    }).catch((err) => {
        alert(err.response.data.msg)
    })
}


function itemReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_SORT':
            if (state.column === action.column) {
                return {
                    ...state,
                    data: state.data.slice().reverse(),
                    direction:
                        state.direction === 'ascending' ? 'descending' : 'ascending',
                }
            }

            return {
                column: action.column,
                data: _.sortBy(state.data, [action.column]),
                direction: 'ascending',
            }
        default:
            throw new Error()
    }
}

function TableCart({ newData, user }) {
    const [counts, setCounts] = useState([])

    useEffect(() => {
        setCounts(newData.map(d => ({ 'id': d.id, 'count': d.quantity })))
    }, [])

    const [state, dispatch] = React.useReducer(itemReducer, {
        column: null,
        data: newData,
        direction: null,
    })
    const { column, data, direction } = state

    const updateCount = (e) => {
        setQuantity(parseInt(e.target.id), parseInt(e.target.value))
        // console.log(getQuantity(parseInt(e.target.id)).count);
    }

    const getQuantity = (id) => {
        const num = counts.find((d) => d.id === id).count

        return num > 0 ? num : 0
    }
    const setQuantity = (id, cout) => {
        const index = counts.findIndex((d) => d.id === id)
        counts[index] = { 'id': id, 'count': cout }
        // counts[id] = cout
        // console.log(counts);
    }
    const updateCart = (e, data) => {
        console.log(getQuantity(data.id));
        axios.put(`cart/${data.id}/`,
            { 'quantity': getQuantity(data.id) },
            {
                headers: {
                    Authorization: `Bearer ${data.user.access}`
                }
            }
        ).then((res) => {
            alert(res.data.msg)
            console.log(res.data);
            window.location.reload()
        }).catch((err) => {
            console.log(err.response);
        })
    }

    return (
        <Table sortable celled selectable textAlign='center' className='fs-2 m-4'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={column === 'name' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
                    >
                        Product
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'price' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'price' })}
                    >

                        Price
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'quantity' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'quantity' })}
                    >
                        Quantity
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'total' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'total' })}
                    >

                        Total
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Edit
                    </Table.HeaderCell>

                </Table.Row>
            </Table.Header>
            <Table.Body >
                {data.map(({ id, product, quantity, total }) => (
                    // console.log(product)
                    <Table.Row key={id} >
                        <Table.Cell verticalAlign='middle' >
                            <div>

                                <img src={axios.getUri().concat(product.img.thumbnail)} alt={product.name} />
                                <h3>{product.name}</h3>
                            </div>
                        </Table.Cell>
                        <Table.Cell verticalAlign='middle'  >
                            <div className='font-num '>
                                {product.price.toLocaleString('en-US', 2)}
                            </div>
                        </Table.Cell>
                        <Table.Cell verticalAlign='middle'  >
                            <div className='font-num '>
                                <input className='text-center' defaultValue={quantity} id={id} onChange={updateCount} type='number' max={10} min={1} />
                            </div>
                        </Table.Cell>
                        <Table.Cell verticalAlign='middle'>
                            <div className='font-num '>
                                {/* {console.log(getQuantity(id))} */}
                                {(total).toLocaleString('en-US', 2)}
                            </div>
                        </Table.Cell>
                        <Table.Cell verticalAlign='middle' >
                            <Button.Group >
                                <Button content='Update' color='green' icon='save outline' user={user} id={id} onClick={updateCart} />
                                <Button content='Delete' color='youtube' icon='remove' user={user} id={id} product={product} onClick={deleteCart} />
                            </Button.Group>
                        </Table.Cell>
                    </Table.Row>
                ))}

            </Table.Body>
            <Table.Footer>
                <Table.Row >
                    <td colSpan={5} className='fs-1' style={{ boxSizing: 'border-box', width: '100%' }}>
                        <div className='container-fluid d-flex'>
                            <div className=' w-50 '>
                                Total
                            </div>
                            <div className=' w-50'>
                                <div className=' form-control border-success fs-1 font-num'>
                                    {
                                        data.map(d => d.total).reduce((partialSum, a) => partialSum + a, 0).toLocaleString('en-US', 2)
                                    }
                                </div>
                                <div className='container btn btn-primary fs-1 mt-3'>
                                    Confirm
                                </div>
                            </div>
                        </div>
                    </td>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}

export default TableCart

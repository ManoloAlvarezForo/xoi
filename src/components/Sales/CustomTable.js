import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputTable from './InputTable';

const titlesMocks = [
    { title: 'ID', width: '15%', variant: 'id' },
    { title: 'Product', width: '30%', variant: 'product' },
    { title: 'Description', width: '45%', variant: 'description' },
    { title: 'Cant.', width: '10%', variant: 'quantity' },
    { title: 'P/U', width: '10%', variant: 'price' },
    { title: 'Sub-Total', width: '15%', variant: 'subtotal' },
]

const Titles = ({ titles }) => {
    return (
        <Paper style={{ display: 'flex', flexDirection: 'row', padding: '10px 0', margin: '5px 0' }}>
            {
                titlesMocks.map((title, index) => {
                    return (
                        <Typography
                            key={index}
                            style={{ width: title.width, borderRight: '0.5px dotted gray', justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                            variant="subtitle1"
                        >
                            {title.title}
                        </Typography>
                    )
                })
            }
        </Paper>
    )
}

const RowTable = ({ row, classes, updateRow, setProductSelected }) => {
    const rowToUpdate = row;
    const [subTotal, setSubTotal] = useState(row.quantity * row.price)
    const [quantity, setQuantity] = useState(row.quantity);

    useEffect(() => {
        rowToUpdate.quantity = quantity !== "" ? parseInt(quantity) : "";
        rowToUpdate.subTotal = subTotal;
        updateRow(rowToUpdate);
        setSubTotal(quantity * row.price);
    }, [quantity, subTotal])

    const _onChangeQuantity = e => {
        e.stopPropagation();
        setQuantity(e.target.value);
    }

    return (
        <div className="custom-table">
            <Typography
                style={{
                    color: 'white',
                    width: '15%',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    borderRight: '0.5px dotted gray',
                    paddingLeft: '5px'
                }}
                variant="subtitle1">
                {row.productId}
            </Typography>
            <Typography
                className='row-table'
                style={{
                    color: 'white',
                    width: '30%',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    borderRight: '0.5px dotted gray',
                    paddingLeft: '5px'
                }}
                variant="subtitle1">
                {row.productName}
            </Typography>
            <Typography
                style={{
                    color: 'white',
                    width: '45%',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    borderRight: '0.5px dotted gray',
                    paddingLeft: '5px'
                }}
                variant="subtitle1">
                {row.description}
            </Typography>
            <InputTable
                styles={{
                    color: 'white',
                    width: '10%',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    borderRight: '0.5px dotted gray',
                    paddingLeft: '5px'
                }}
                placeholder="Cantidad"
                value={quantity}
                classes={classes}
                onChange={_onChangeQuantity}
            />
            <Typography
                style={{
                    color: 'white',
                    width: '10%',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    borderRight: '0.5px dotted gray',
                    paddingLeft: '5px'
                }}
                variant="subtitle1">
                {row.price}
            </Typography>
            <Typography
                style={{
                    color: 'white',
                    width: '15%',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    borderRight: '0.5px dotted gray',
                    paddingLeft: '5px'
                }}
                variant="subtitle1">
                {subTotal}
            </Typography>
        </div>
    )
}

const MyTable = ({ products, setProducts, setProductSelected }) => {

    const _updateRow = rowToUpdate => {
        setProducts(products.map(p => {
            return (p.id === rowToUpdate.id) ? rowToUpdate : p;
        }));
    }

    return (
        (products.length > 0) ?
            products.map((row, index) => {
                return (
                    <RowTable
                        updateRow={_updateRow}
                        key={index}
                        row={row}
                    />
                )
            })
            :
            <div style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>No Data</div>
    )
}

const CustomTable = ({ titles, setProducts, products, setProductSelected }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Titles titles={Titles} />
            <MyTable
                setProducts={setProducts}
                products={products}
                setProductSelected={setProductSelected}
            />
        </div>
    )
}

export default CustomTable;
import React, { useState, useEffect } from 'react';
import CustomToolBar from '../CustomToolBar/CustomToolBar';
import Paper from '@material-ui/core/Paper';
import CustomTable from './CustomTable';
import SelectItemComponent from '../Select/SelectItemComponent';
import ReactSelectImplementation from '../Select/ReactSelectImplementation';
import { TextField, Typography, Avatar } from '@material-ui/core';
import CustomMenuItem from '../Select/CustomMenuItem';
import SaleSuggestions from './GraphQLSelectSuggestions';
import ClientsQueryComponent from '../Clients/ClientsQueryComponent';
import AsyncSelectComponent from '../Select/AsyncSelectComponent';
import { GET_CLIENTS_BY_FILTER } from '../Clients/ClientsQueries';
import { Query } from 'react-apollo';
import SpecialSelectComponent from '../Select/SpecialSelectComponent';

const ItemWithAvatar = ({ avatar, title = 'None' }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {
                avatar.length === 1 ?
                    <Avatar style={{ width: 35, height: 35 }}>{(avatar === "") && (title[0])}</Avatar> :
                    <Avatar src={avatar} style={{ margin: 10, width: 35, height: 35 }}></Avatar>
            }
            <Typography style={{ margin: '0px 10px' }} variant="body1">{title}</Typography>
        </div>
    )
}

const Suggestions = ({ query, properties = ['name', 'lastName', 'phone'], getItemProps, item: Item }) => {
    return <Query query={GET_CLIENTS_BY_FILTER}
        variables={{ query, properties }}
        skipe={query === ''}
        fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return `Error!: ${error}`
            return data.clientsByFilter.map((suggestion, index) => {
                return (
                    <Item
                        key={index}
                        suggestion={suggestion}
                        itemAvatar={ItemWithAvatar}
                        getItemProps={getItemProps}
                    />
                )
            })
        }}
    </Query>
}

const Sales = () => {
    let sale = {
        date: '',
        time: '',
        clientId: '',
        nit: '',
        nitName: '',
        products: [],
        totalPayed: 0
    }
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [client, setClient] = useState({});
    const [nit, setNit] = useState('');
    const [nitName, setNitName] = useState('');
    const [totalPay, setTotalPay] = useState(0)
    const [productSelected, setProductSelected] = useState({})

    const _addProduct = newProduct => {
        setProducts([...products, newProduct])
    }

    //HardCoded products
    const [products, setProducts] = useState([
        // { id: '0001', productId: '0011', productName: 'Camisa Polo', description: 'Camisa Polo Color negro talla L Varon', price: 50, quantity: 1, subTotal: 0 },
        // { id: '0002', productId: '0012', productName: 'Lonchera Acme', description: 'Lonchera Acme para ninio Disney', price: 25, quantity: 2, subTotal: 0 },
        // { id: '0003', productId: '0013', productName: 'Lonchera Acme', description: 'Lonchera Acme para ninio Disney', price: 25, quantity: 2, subTotal: 0 },
        // { id: '0004', productId: '0014', productName: 'Lonchera Acme', description: 'Lonchera Acme para ninio Disney', price: 25, quantity: 2, subTotal: 0 },
    ]);

    useEffect(() => {
        setTotalPay(products.reduce((a, b) => {
            return a + b.subTotal;
        }, 0))
        // console.log(totalPay)
    }, [products])



    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CustomToolBar title="Sales" />
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100vh' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '70%', margin: '0 5px' }}>
                    <Paper style={{ margin: '5px 0 2px 0', padding: '2px' }} elevation={1}>
                        <SelectItemComponent
                            placeHolder="Buscar Cliente por Nombre, Apellido o Telefono..."
                            label="Cliente"
                            suggestions={Suggestions}
                            item={CustomMenuItem}
                            setItems={setClient}
                        />
                    </Paper>
                    <Paper style={{ margin: '5px 0 2px 0', padding: '2px' }} elevation={1}>
                        <SpecialSelectComponent
                            addItems={_addProduct}
                            placeholder="Buscar Producto por Nombre o Codigo..."
                            label="Producto"
                        />
                    </Paper>
                    <div style={{ height: '40%', margin: '1px 0' }}>
                        <div style={{ height: '100%' }} >
                            <CustomTable
                                setProducts={setProducts}
                                products={products}
                                setProductSelected={setProductSelected}
                            />
                        </div>
                    </div>
                    <div style={{ height: '30%', margin: '5px 0' }}>
                        <Paper style={{ height: '100%' }} elevation={1}>
                            <div>
                                product detail
                            </div>
                        </Paper>
                    </div>
                </div>
                <Paper style={{ height: '100%', width: '30%', margin: '5px 2.5px', height: '100%' }} elevation={1}>
                    <Typography
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '5px',
                        }}
                        variant="h5"
                        gutterBottom>
                        Total a Pagar: {totalPay}
                    </Typography>
                </Paper>
            </div>
        </div>
    );
}
export default Sales;
import React, { useState } from 'react';
import { TextField, Paper, MenuList, MenuItem, Popper, Grow, ClickAwayListener } from '@material-ui/core';

const suggestions = [
    { id: '0001', productId: '0011', productName: 'Camisa Polo', description: 'Camisa Polo Color negro talla L Varon', price: 50, quantity: 1, subTotal: 0 },
    { id: '0002', productId: '0012', productName: 'Lonchera Acme', description: 'Lonchera Acme para ninio Disney', price: 25, quantity: 1, subTotal: 0 },
    { id: '0003', productId: '0013', productName: 'Lonchera Acme', description: 'Lonchera Acme para ninio Disney', price: 25, quantity: 1, subTotal: 0 },
    { id: '0004', productId: '0014', productName: 'Lonchera Acme', description: 'Lonchera Acme para ninio Disney', price: 25, quantity: 1, subTotal: 0 },
    { id: '0004', productId: '0014', productName: 'Lonchera Acme', description: 'Lonchera Acme para ninio Disney', price: 25, quantity: 1, subTotal: 0 },
    { id: '0004', productId: '0014', productName: 'Lonchera Acme', description: 'Lonchera Acme para ninio Disney', price: 25, quantity: 1, subTotal: 0 },
    { id: '0004', productId: '0014', productName: 'Lonchera Acme', description: 'Lonchera Acme para ninio Disney', price: 25, quantity: 1, subTotal: 0 },
    { id: '0004', productId: '0014', productName: 'Lonchera Acme', description: 'Lonchera Acme para ninio Disney', price: 25, quantity: 1, subTotal: 0 },
    { id: '0004', productId: '0014', productName: 'Lonchera Acme', description: 'Lonchera Acme para ninio Disney', price: 25, quantity: 1, subTotal: 0 },
    { id: '0004', productId: '0014', productName: 'Lonchera Acme', description: 'Lonchera Acme para ninio Disney', price: 25, quantity: 1, subTotal: 0 }
]

const SpecialSelectComponent = ({label, placeholder, addItems}) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedTextField, setSelectedTextField] = useState('');
    const anchorEl = React.useRef(null);

    const _onChangeHandle = event => {
        setSelectedTextField(event.target.value);
        event.target.value === '' ? setOpen(false) : setOpen(true);
    }

    const _handleClose = item => {
        setSelectedTextField('')
        setOpen(false);
    }

    const _clickItemHandle = item => {
        setSelectedItem(item)
        addItems(item);
        setOpen(false);
        setSelectedTextField('')
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
                onChange={_onChangeHandle}
                value={selectedTextField}
                id="outlined-full-width"
                label={label}
                style={{ margin: 5, width: 'auto' }}
                placeholder={placeholder}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Popper style={styles.menu} open={open} anchorEl={anchorEl.current} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={_handleClose}>
                                <MenuList>
                                    {
                                        suggestions.map((suggestion, index) => {
                                            return (
                                                <MenuItem key={index} onClick={() => _clickItemHandle(suggestion)}>{suggestion.productName}</MenuItem>
                                            )
                                        })
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

const styles = {
    menu: {
        position: 'absolute',
        zIndex: 3,
        marginTop: '55px',
        overflow: 'auto'
    }
}

export default SpecialSelectComponent;
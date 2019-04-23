import React from 'react';
import { Mutation } from 'react-apollo'
import { AUTH_TOKEN } from '../../Utils/Constans/Communication';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from './AuthenticationMutations';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { FiLock } from 'react-icons/fi';
import { FiMail } from 'react-icons/fi';
import { FiFacebook } from 'react-icons/fi';
import { FiTwitter } from 'react-icons/fi';
import { IoLogoGoogle } from "react-icons/io";

//Styles
import './Authentication.css';
import { Typography } from '@material-ui/core';


class Authentication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: true, // switch between Login and SignUp
            email: '',
            password: '',
            repeatPassword: '',
            name: ''
        }
    }

    render() {

        const {
            login,
            email,
            password,
            name
        } = this.state;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className="title-logo">
                        <Typography style={{ fontFamily: 'Pacifico', fontSize: '7rem', fontWeight: 'normal' }} component="h4" variant="h4" gutterBottom>Xoi</Typography>
                    </div>
                    <div className="auth-container" style={{ height: '100%' }}>
                        <div className="form-container" style={{ flexDirection: 'column', display: 'flex' }}>
                            <div>
                                <div style={{ textAlign: 'center', fontSize: '2rem', margin: '60px 0' }} className="mv3">
                                    <Typography component="h4" variant="h4" gutterBottom>Welcome</Typography>
                                </div>
                                <div className="space custom-input" style={{ display: 'flex', flexDirection: 'column', margin: '20px 0' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div style={{ margin: '0 12px', display: 'flex', alignItems: 'center' }}>
                                            <FiMail style={{ fontSize: '24px', color: 'gray' }} />
                                        </div>
                                        <TextField style={{ margin: '10px 0', width: '100%' }}
                                            value={email}
                                            onChange={e => this.setState({ email: e.target.value })}
                                            label="Email"
                                            variant="outlined"
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div style={{ margin: '0 12px', display: 'flex', alignItems: 'center' }}>
                                            <FiLock style={{ fontSize: '24px', color: 'gray' }} />
                                        </div>
                                        <TextField style={{ margin: '10px 0', width: '100%', borderRadius: '5px' }}
                                            value={password}
                                            onChange={e => this.setState({ password: e.target.value })}
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Mutation
                                        mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                                        variables={{ email, password, name }}
                                        onCompleted={data => this._confirm(data)}

                                    >
                                        {mutation => (
                                            <Button variant="contained" color="secondary" size="large" style={{ marginLeft: 'auto', color: 'white' }} onClick={mutation}>
                                                LOGIN
                                            </Button>
                                        )}
                                    </Mutation>

                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <IconButton onClick={() => console.log('Authentication with other account pressed.')} style={{ color: '#3A589E' }} aria-label="Register with Facebook">
                                        <FiFacebook />
                                    </IconButton>
                                    <IconButton onClick={() => console.log('Authentication with other account pressed.')} style={{ color: '#55ACEE' }} aria-label="Register With Twitter">
                                        <FiTwitter />
                                    </IconButton>
                                    <IconButton onClick={() => console.log('Authentication with other account pressefd.')} style={{ color: '#ea4335' }} aria-label="Register with Google">
                                        <IoLogoGoogle />
                                    </IconButton>
                                </div>
                                <div onClick={() => console.log('Term of use. Privacy policy pressedss.')} style={{ marginTop: '30px', textAlign: 'center', cursor: 'pointer' }}>
                                    <Typography variant="caption">Term of use. Privacy policy</Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _confirm = async data => {
        const { token } = this.state.login ? data.login : data.signup;
        this._saveUserData(token);
        this.props.history.push('/');
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}


export default Authentication;
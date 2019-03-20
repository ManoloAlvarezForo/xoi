import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { FiChevronLeft } from 'react-icons/fi';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import UserProfileItem from './UserProfileItem';
import DrawerList from './DrawerList';

const DRAWER_WIDTH = 220;

class MiniDrawer extends React.Component {
    state = {
        open: true
    };

    handleDrawer = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        const { classes } = this.props;
        return (
            <Drawer
                variant="permanent"
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: this.state.open,
                    [classes.drawerClose]: !this.state.open,
                })}
                classes={{
                    paper: classNames({
                        [classes.paper]: 'relative',
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open
                    }),
                }}
                open={this.state.open}
            >
                <div className={classes.toolbar} style={{ display: 'flex', justifyContent: 'center' }}>
                    <AppBar style={{ backgroundColor: 'inherit' }} position="static">
                        <Toolbar style={{ padding: '0', backgroundColor: 'rebeccapurple' }} >
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                {
                                    this.state.open ?
                                        (<div style={{ justifyContent: 'center', width: '100%', display: 'flex', alignItems: 'center' }}>
                                            <Typography style={{ fontFamily: 'Pacifico Regular', fontSize: '1.8rem', fontWeight: 'normal' }} component="h4" variant="h4">{this.state.open ? 'Tessty' : 'Te'}</Typography>
                                        </div>) :
                                        (<div style={{ cursor: 'pointer' }} onClick={this.handleDrawer}>
                                            <div style={{ textAlign: 'center' }}>
                                                <Typography style={{ fontFamily: 'Pacifico Regular', fontSize: '1.5rem', fontWeight: 'normal' }} variant="h4">Te</Typography>
                                            </div>
                                        </div>)
                                }
                                {
                                    this.state.open && (
                                        <IconButton style={{ marginLeft: 'auto' }}
                                            color="inherit"
                                            aria-label="Open drawer"
                                            onClick={this.handleDrawer}
                                            className={classNames({
                                                [classes.hide]: !this.state.open,
                                            })}
                                        >
                                            <FiChevronLeft color="gray" />
                                        </IconButton>
                                    )
                                }
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
                <Divider />
                <DrawerList changeTitle={this.props.changeTitle} />
            </Drawer>
        )
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: DRAWER_WIDTH,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 7 + 1,
        },
    },
    paper: {
        position: 'relative'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // padding: '0 8px',
        ...theme.mixins.toolbar
    }
});


MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
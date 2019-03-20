import React from 'react'
//Icons
import { FiGrid } from 'react-icons/fi';
import { FiUserCheck } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { FiClipboard } from 'react-icons/fi';
import { FiList } from 'react-icons/fi';
import ListItemWithIcon from './ListItemWithIcon';

const styles = {
    fontSize: {
        fontSize: '22px'
    }
}

const iconList = {
    dashboard: FiGrid,
    applicants: FiUserCheck,
    settings: FiSettings,
    template: FiClipboard,
    topics: FiList
}

const options = [
    {
        name: 'Dashboard',
        variant: 'dashboard',
        path: '/'
    },
    {
        name: 'Applicants',
        variant: 'applicants',
        path: '/applicants'
    },
    {
        name: 'Settings',
        variant: 'settings',
        path: '/settings'
    }
    // {
    //     name: 'Template',
    //     variant: 'template',
    //     path: '/template'
    // },
    // {
    //     name: 'Topics',
    //     variant: 'topics',
    //     path: '/topics'
    // }
]

class AppDrawerList extends React.Component {
    _handleClick = option => {
        this.props.handleListItemClick(option)
    }
    render () {
        return (
            <React.Fragment>
                {options.map((option, index) => (
                        <ListItemWithIcon
                            iconStyles={styles.fontSize}
                            iconList={iconList}
                            key={index} 
                            name={option.name} 
                            variant={option.variant} 
                            selectedItem={this.props.selectedItem} 
                            path={option.path}
                            handleListItemClick={() => this._handleClick(option)}
                        />
                    ))}
            </React.Fragment>
        )
    }
}

export default AppDrawerList
import React, { useState, useEffect, Suspense } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import CustomToolBar from '../CustomToolBar/CustomToolBar';
import MonthOptions from './MonthOptions';
import DialogForm from './DialogForm';
import AddEventComponent from './AddEventComponent';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {getWeekOptionsLabel} from './CalendarTools';

// TODO: Replace the way to add Components types.
// const calendars = {
//     month: MonthCalendar,
//     week: WeekCalendar,
//     day: DayCalendar
// }

// const options = {
//     month: MonthOptions,
//     week: WeekCalendar,
//     day: DayCalendar
// }

const CalendarOptions = ({ setCalendarType, options }) => {
    const [value, setValue] = useState(2);
    const [locale] = useState(moment().locale());
    const [type, setType] = useState('month');

    const _handleChange = value => {
        setType(value);
        setCalendarType(value);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '30%', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography style={{ margin: 0 }} variant="subtitle1" gutterBottom>
                        {moment().locale(locale).format('LL')}
                    </Typography>
                </div>
            </div>
            <FormControl style={{display: 'flex', alignSelf: 'center'}}>
                <Select
                    value={type}
                    onChange={e => _handleChange(e.target.value)}
                    displayEmpty
                    name="type"
                >
                    <MenuItem value={'day'}>Day</MenuItem>
                    <MenuItem value={'week'}>Week</MenuItem>
                    <MenuItem value={'month'}>Month</MenuItem>
                </Select>
            </FormControl>
            {options}
        </div>
    )
}

const Scheduler = () => {
    const mainDate = moment();
    mainDate.startOf(mainDate.year()); 
    const [selectedCalendar, setSelectedCalendar] = useState('month')
    const [data, setData] = useState(mainDate);

    const _next = type => {
        setData(_getNewData(type, 'add'))
    }

    const _previous = type => {
        setData(_getNewData(type, 'subtract'))
    }

    // TODO: Priority we need to get data including the Year.
    const _getNewData = (type, action) => {
        let response = {};
        switch (type) {
            case 'month': response = data.clone()[action](1, 'month')
                break;
            case 'week': response = data.clone()[action](1, 'week')
                break;
            case 'day': response = data.clone()[action](1, 'days')
                break;
            default:
                break;
        }

        return response;
    }

    //Note: Downgraded to "webpack": "^4.28.4" with others version it throw exception to dynimic import.
    const _getCalendar = type => {
        let response = {};

        switch (type) {
            case 'day': response = React.lazy(() => import('./DayCalendar'));
                break;
            case 'week': response = React.lazy(() => import('./WeekCalendar'));
                break;
            case 'month': response = React.lazy(() => import('./MonthCalendar'));
                break;
            default:
                break;
        }

        return response;
    }

    const _calculateWeekLabel = () => {
        const {startDate, endDate} = getWeekOptionsLabel(data);
        return `${startDate.format('MMMM DD YYYY')} - ${endDate.format('MMMM DD YYYY')}`;
    }

    const _getOptionLabel = () => {
        let response = '';
        switch (selectedCalendar) {
            case 'day': response = data.format('MMMM DD YYYY');
                break;
            case 'week':response = _calculateWeekLabel();
                break;
            case 'month':response = data.format('MMMM YYYY');
                break;
            default:
                break;
        }
        
        return response;
    }

    const Calendar = _getCalendar(selectedCalendar);
    const optionLabel = _getOptionLabel();

    return (
        <div>
            <CustomToolBar
                title="Scheduler"
                additional={<CalendarOptions setCalendarType={setSelectedCalendar}
                options={<MonthOptions label={optionLabel} next={_next} previous={_previous} />}
                previous={_previous}
                label={`${data.format('MMMM')} ${data.format('YYYY')}`} />}
            />
            <div style={styles.main}>
                <Paper elevation={1} style={styles.paper}>
                    <div style={styles.calendarContainer}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Calendar
                                data={data}
                                dialogForm={DialogForm}
                                dialogContent={AddEventComponent}
                            />
                        </Suspense>
                    </div>
                </Paper>
            </div>
        </div>
    )
}

const styles = {
    main: {
        padding: '5px',
        width: '100%',
        height: 'calc(100vh - 90px)',
        overflow: 'hidden'
    },
    paper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    calendarContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%'
    },
    defaultMargin: {
        margin: '0 5px'
    },
    buttonNavigation: {
        border: '1px solid rgb(106, 115, 138)',
        borderRadius: '0 5px 5px 0'
    }

}

export default Scheduler;
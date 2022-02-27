import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import React from 'react'
import DateFnsUtils from '@date-io/date-fns';

export default function DatePicker(props) {

    const { name, label, value, onChange } = props

    const converToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <KeyboardDatePicker 
            disableToolbar 
            variant="inline"
            inputVariant="outlined"
            label={label}
            formate="MMM/dd/yyy"
            name={name}
            value={value}
            onChange={date => onChange(converToDefEventPara(name, date ))}
        />
        </MuiPickersUtilsProvider>
    )
}

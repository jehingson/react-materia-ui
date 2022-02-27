import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup } from '@material-ui/core'
import React from 'react'

export default function RadioGroup(props) {

    const { name, label, value, onChange, items } = props

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
                name={name}
                label={value}
                onChange={onChange}
            >
                {
                    items.map((itm) => (
                        <FormControlLabel
                            key={itm.id}
                            value={itm.id}
                            control={<Radio />}
                            label={itm.title}
                        />
                    ))
                }

            </MuiRadioGroup>
        </FormControl>

    )
}

import { Grid } from '@material-ui/core'
import React from 'react'
import Controls from '../../components/controls'
import { useForm, Form } from '../../components/useForm'
import * as employeesServices from '../../services/employeeService'


const initialFValues = {
  id: 0,
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  gender: 'male',
  departmenId: '',
  hireDate: new Date(),
  isPermanent: false,
}

const genderitems = [
  {
    id: 'male',
    title: 'Male',
  },
  {
    id: 'famale',
    title: 'Famale'
  },
  {
    id: 'other',
    title: 'Other'
  }
]

export default function EmployeeForm() {
  const { values, handleInputChange } = useForm(initialFValues)


  if (!values) return null

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}

          />
          <Controls.Input
            label="Email"
            variant="outlined"
            name="email"
            value={values.email}
            onChange={handleInputChange}

          />
          <Controls.Input
            label="mobile"
            variant="outlined"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="city"
            variant="outlined"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup row
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderitems}
          >
          </Controls.RadioGroup>
          <Controls.Select
            name="departmenId"
            label="Department"
            value={values.departmenId}
            onChange={handleInputChange}
            options={employeesServices.getDepartmentCollection()}
          />
          <Controls.DatePicker
            name="hireDate"
            label="hire Date"
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            name="isPermanent"
            label="Permanent Employee"
            value={values.isPermanent}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button
              text="Submit"
              type="submit"
            />
             <Controls.Button
              text="Reset"
              type="submit"
              color="default"
            />
          </div>
          <br />
        </Grid>
      </Grid>
    </Form>
  )
}

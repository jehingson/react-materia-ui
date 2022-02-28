import { Grid } from '@material-ui/core'
import te from 'date-fns/esm/locale/te/index.js'
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
  const validate = (fieldValues = values) => {
    let temp = {...errors}
    if ('fullName' in fieldValues)
    temp.fullName = fieldValues.fullName ? "" : "El dato es requerido."
    if ('email' in fieldValues)
    temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "": "El correo no es valido."
    if ('mobile' in fieldValues)
    temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimo 10 numeros requeridos."
    if ('city' in fieldValues)
    temp.city = fieldValues.city ? "" : "El dato es requerido."
    if ('departmenId' in fieldValues)
    temp.departmenId = fieldValues.departmenId.length != 0 ? "" : "El dato es requerido."
    setErrors({
      ...temp
    })
    if(fieldValues == values)
    return Object.values(temp).every(x => x == "")
  }

  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate)

  if (!values) return null


  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) { 
      employeesServices.insertEmployee(values)
      resetForm()
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            label="Email"
            variant="outlined"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label="mobile"
            variant="outlined"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            label="city"
            variant="outlined"
            name="city"
            value={values.city}
            onChange={handleInputChange}
            error={errors.city}
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
            error={errors.departmenId}
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
              onClick={resetForm}
            />
          </div>
          <br />
        </Grid>
      </Grid>
    </Form>
  )
}

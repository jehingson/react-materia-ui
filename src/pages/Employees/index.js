import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import EmployeeForm from './EmployeeForm'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { makeStyles } from '@material-ui/styles';
import { InputAdornment, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import useTable from '../../components/useTable';
import * as employeesServices from '../../services/employeeService'
import Controls from '../../components/controls';
import { Search } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    margin: theme.spacing(3)
  },
  searchInput: {
    width: '75%'
  }
}))

const headCells = [
  { id: 'fullName', label: 'Nombre' },
  { id: 'email', label: 'Correo Electronico' },
  { id: 'mobile', label: 'Numero de telefono' },
  { id: 'department', label: 'Department', disableSorting: true },
]

export default function Employees() {

  const classes = useStyles()
  const [records, setRecords] = useState(employeesServices.getAllEmployees())
  const [filterFn, setFilterFn] = useState({ fn: items => { return items } })

  const {
    TblContainer,
    TblHeader,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, headCells, filterFn)

  const handleSearch = e => {
    let target = e.target
    setFilterFn({
      fn: items => {
        if (target.value === "")
          return items;
        else return items.filter(x => x.fullName.includes(target.value))
      }
    })
  }

  if (!records || !records.length) return null

  return (
    <>
      <PageHeader
        title="New Employees"
        subTitle="Form design with validation"
        icon={<PeopleOutlineIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          {
            <Controls.Input
              label="Search Employees"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (<InputAdornment position="start">
                  <Search />
                </InputAdornment>)
              }}
              onChange={ handleSearch }
            />
          }
        </Toolbar>
        <TblContainer>
          <TblHeader />
          <TableBody>
            {
              recordsAfterPagingAndSorting().map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.department}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  )
}

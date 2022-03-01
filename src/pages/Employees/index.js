import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import EmployeeForm from './EmployeeForm'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { makeStyles } from '@material-ui/styles';
import { InputAdornment, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import useTable from '../../components/useTable';
import * as employeesServices from '../../services/employeeService'
import Controls from '../../components/controls';
import { Close, EditOutlined, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../components/controls/Popup';



const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    margin: theme.spacing(3)
  },
  searchInput: {
    width: '40%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }
}))

const headCells = [
  { id: 'fullName', label: 'Nombre' },
  { id: 'email', label: 'Correo Electronico' },
  { id: 'mobile', label: 'Numero de telefono' },
  { id: 'department', label: 'Department' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Employees() {

  const classes = useStyles()
  const [records, setRecords] = useState(employeesServices.getAllEmployees())
  const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)

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

  const addOrEdit = (employee, resetForm) => {
    if(employee.id == 0){
      employeesServices.insertEmployee(employee)
    }else{
      employeesServices.updateEmployee(employee)
    }
    resetForm()
    setOpenPopup(false)
    setRecords(employeesServices.getAllEmployees())
  }

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
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
              onChange={handleSearch}
            />
          }
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => setOpenPopup(true)}
          />
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
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => { openInPopup(item) }}
                    >
                      <EditOutlined fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                    >
                      <Close fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="Employee Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
        />
      </Popup>
    </>
  )
}

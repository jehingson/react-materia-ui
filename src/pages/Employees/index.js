import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import EmployeeForm from './EmployeeForm'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { makeStyles } from '@material-ui/styles';
import { Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import useTable from '../../components/useTable';
import * as employeesServices from '../../services/employeeService'


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        margin: theme.spacing(3)
    }
}))

const headCells = [
    {id: 'fullName', label: 'Nombre'},
    {id: 'email', label: 'Correo Electronico'},
    {id: 'mobile', label: 'Numero de telefono'},
    {id: 'department', label: 'Department'},

]

export default function Employees() {

    const classes = useStyles()
    const [records, setRecords] = useState(employeesServices.getAllEmployees())
    const { 
        TblContainer, 
        TblHeader, 
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells)

    console.log('ee', recordsAfterPagingAndSorting())
    if(!records || !records.length) return null

    return (
        <>
            <PageHeader
                title="New Employees"
                subTitle="Form design with validation"
                icon={<PeopleOutlineIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                {/* <EmployeeForm /> */}
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

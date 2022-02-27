import React from 'react'
import PageHeader from '../../components/PageHeader'
import EmployeeForm from './EmployeeForm'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        margin: theme.spacing(3)
    }
}))

export default function Employees() {

    const classes = useStyles()


    return (
        <>
            <PageHeader
                title="New Employees"
                subTitle="Form design with validation"
                icon={<PeopleOutlineIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <EmployeeForm />
            </Paper>
        </>
    )
}

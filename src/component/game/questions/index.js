import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

const useStyles = makeStyles({
    root: {
        width: 200,
    },
})

const Questions = () => {
    const classes = useStyles()
    const [value, setValue] = React.useState(30)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div className={classes.root}>
            <h2>Questions</h2>
            <div>Value: {value}</div>
            <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
        </div>
    )
}

export { Questions }

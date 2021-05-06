import React from 'react'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { updateQuerySetting, addQuerySetting } from '../../../redux/reducers/questions'
import { difficulty, categories } from './constants'

const useStyles = makeStyles({
    root: {
        width: 600,
        display: 'flex',
    },
    selectCategory: {
        flex: '0 40%',
        textAlign: 'center',
    },
    selectDifficulty: {
        flex: '0 10%',
        textAlign: 'center',
    },
    slider: {
        flex: '0 40%',
    },
    button: {
        flex: '0 10%',
        textAlign: 'center',
    },
})

const QuestionSettingsItem = ({ index, values, isLatest, gameId }) => {
    const styles = useStyles()
    const dispatch = useDispatch()

    const onChange = (e, i, v) => {
        const newValues = [...values]
        if (v) {
            newValues[i] = v
        } else {
            newValues[i] = e.target.value
        }
        dispatch(updateQuerySetting({ values: newValues, index, gameId }))
    }

    const onClick = (e) => {
        // e.preventDefault()
        dispatch(addQuerySetting({ gameId }))
    }

    return (
        <div className={styles.root}>
            <div className={styles.selectCategory}>
                <select defaultValue={values[0]} onChange={(e) => onChange(e, 0)}>
                    <option value="-1">Select one</option>
                    {Object.keys(categories)
                        .sort((a, b) => a - b)
                        .map((k, i) => (
                            <option key={i} value={k}>
                                {categories[k]}
                            </option>
                        ))}
                </select>
            </div>
            <div className={styles.selectDifficulty}>
                <select defaultValue={values[1]} onChange={(e) => onChange(e, 1)}>
                    {difficulty.map((v, i) => (
                        <option key={i} value={v.toLowerCase()}>
                            {v}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.slider}>
                <Slider
                    value={values[2]}
                    onChange={(e, v) => onChange(e, 2, v)}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={20}
                />
            </div>
            <div className={styles.button}>{isLatest && <button onClick={onClick}>+</button>}</div>
        </div>
    )
}

export { QuestionSettingsItem }

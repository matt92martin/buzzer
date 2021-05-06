import React from 'react'
import { QuestionSettingsItem } from './questionSettingsItem'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { categories } from './constants'

const questionSettingSelector = createSelector(
    (state) => state.question.querySettings,
    (querySettings) => querySettings
)
const questionPlayerSettingSelector = createSelector(
    (state) => state.question.playerQuerySettings,
    (querySettings) => querySettings
)
const gameIdSelector = createSelector(
    (state) => state.game.gameId,
    (gameId) => gameId
)

const QuestionSettingsMod = () => {
    const qSettings = useSelector(questionSettingSelector)
    const gameId = useSelector(gameIdSelector)

    const onSubmit = () => {}
    return (
        <form onSubmit={onSubmit}>
            <button>Generate questions</button>
            {qSettings.map((values, i) => (
                <QuestionSettingsItem
                    key={i}
                    index={i}
                    gameId={gameId}
                    values={values}
                    isLatest={qSettings.length === i + 1}
                />
            ))}
        </form>
    )
}
const QuestionSettingsPlayer = () => {
    const qSettings = useSelector(questionPlayerSettingSelector)
    return (
        <div>
            Player question settings
            {qSettings.map((values, i) => (
                <div key={i}>
                    <div>Category: {categories[values[0]]}</div>
                    <div>Difficulty: {values[1]}</div>
                    <div>Amount: {values[2]}</div>
                </div>
            ))}
        </div>
    )
}

const QuestionSettings = ({ isMod }) => {
    return <>{isMod ? <QuestionSettingsMod /> : <QuestionSettingsPlayer />}</>
}
export { QuestionSettings }

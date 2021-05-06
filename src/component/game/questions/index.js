import React from 'react'
import { QuestionSettings } from './questionSettings'
import { QuestionWindow } from './questionWindow'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const questionSelector = createSelector(
    (state) => state.question.questions,
    (questions) => questions
)
const isModSelector = createSelector(
    (state) => state.game,
    (game) => game.color === 'mod'
)

const Questions = () => {
    const questions = useSelector(questionSelector)
    const isMod = useSelector(isModSelector)

    return (
        <>
            {questions.length ? (
                <QuestionWindow questions={questions} isMod={isMod} />
            ) : (
                <QuestionSettings isMod={isMod} />
            )}
        </>
    )
}

export { Questions }

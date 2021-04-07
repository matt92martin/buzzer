import React from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const userSelector = createSelector(
    (state) => state.game.users,
    (_, filter) => filter,
    (users, filter) =>
        users.filter(({ color }) => {
            if (Array.isArray(filter)) {
                return filter.indexOf(color) !== -1
            }
            return color === filter
        })
)

const Players = ({ title, team }) => {
    const players = useSelector((state) => userSelector(state, team))

    return (
        <div>
            <h2>{title}</h2>
            {players.length === 0 ? (
                <div>No players</div>
            ) : (
                <ul>
                    {players.map((player, i) => {
                        if (!player.username) {
                            return <li key={i}>New player</li>
                        }
                        return <li key={i}>{player.username}</li>
                    })}
                </ul>
            )}
        </div>
    )
}

export { Players }

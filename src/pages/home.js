import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Game } from './game'
import { JoinGame } from '../component/joinGame'
import { StartGame } from './startGame'
import { Nav } from '../component/nav'

const Home = () => {
    return (
        <>
            <Nav />
            <Switch>
                <Route path={['/game/join/:id', '/game/join']}>
                    <JoinGame />
                </Route>
                <Route path="/game/:id">
                    <Game />
                </Route>
                <Route>
                    <StartGame />
                </Route>
            </Switch>
        </>
    )
}

export { Home }

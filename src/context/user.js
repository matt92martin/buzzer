import React from 'react'
import axios from 'axios'
import { useGet } from '../hooks/useGet'

const UserContext = React.createContext({})

export const UserProvider = (props) => {
    const [userObj, setUserObj] = useGet('/api/user/name')

    const createUserName = async ({ username, color }) => {
        if (username) {
            const { data } = await axios.post('/api/user/name', { username, color })
            if (data.error) {
                return { error: true }
            }
            setUserObj(data.user)
            return data.user
        }

        return { error: true }
    }

    const setUsername = () => {
        setUserObj()
    }
    const logout = async () => {
        const { data } = await axios.post('/api/user/logout')
        setUserObj({})
    }

    const value = {
        createUserName,
        userObj,
        setUsername,
        logout,
    }

    return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
    return React.useContext(UserContext)
}

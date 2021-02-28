import React from 'react'
import axios from 'axios'

export const useGet = (path) => {
    const [value, setValue] = React.useState(null)

    React.useEffect(() => {
        axios.get(path).then((res) => {
            setValue({ ...res.data })
        })
    }, [path])

    return [value, setValue]
}

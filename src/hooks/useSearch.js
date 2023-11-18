import { useEffect, useRef, useState } from "react";

export function useSearch () {
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstSearch = useRef(true)

    useEffect(()=>{
        if(isFirstSearch.current){
            isFirstSearch.current = search === ''
            return
        }

        if (search === ''){
            setError('You cant search whithout typing anything')
            return
        }

        if(search.length < 2){
            setError('The search need almost two letters')
            return
        }
        setError(null)
    },[search])

    return {search, setSearch, error}
}
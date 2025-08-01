import {Input} from "@/components/ui/input";
import {ChangeEvent, KeyboardEventHandler, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {getQuestionSearchQuery} from "@/services/adm";

interface ISearch {
    onEnterPress?: (query: string) => void
    placeholder?: string
    handleQueryChange?: (newQuery: string) => void
}


export const Search = ({placeholder, onEnterPress, handleQueryChange}: ISearch) => {
    const [query, setQuery] = useState<string>(getQuestionSearchQuery())


    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && onEnterPress)
            onEnterPress(query)

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (handleQueryChange)
            handleQueryChange(e.target.value)
    }

    return (
        <div className={"flex overflow-hidden"}>
            <Input
                value={query}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                onChange={handleChange}
                className={"pr-10 overflow-hidden selection:bg-highlight/90 " +
                    "text-text border-text/20 placeholder:text-text/60"}
            />
            <button
                onClick={() => onEnterPress && onEnterPress(query)}
                className={"-ml-10"}
            >

                <FontAwesomeIcon icon={faSearch} className={"size-12 stroke-3"}/>
            </button>
        </div>
    )
}

import React, {useState} from 'react'
import {SearchIcon} from '../assets/SearchIcon'

const ChannelSearch = () => {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)

    const getChannels= async (text)=>{
        try {
            // TODO: Fetch channels
            
        } catch (error) {
            setQuery=('')
            
        }
    }

    const onSearch = (e) =>{
        e.preventDefault()
        setLoading=true
        setQuery(e.event.value)
        getChannels(e.event.value)
        
    }


    return (
        <div className='channel-search__container'>
            <div className='channel-search__input__wrapper'>
                <div className='channel-search__input__icon'>
                    <SearchIcon/>
                </div>
                <input 
                    className='channel-search__input__text'
                    placeholder= 'Search'
                    type='text'
                    value={query}
                    onChange={onSearch}
                />
               
            </div>
            
        </div>
    )
}

export default ChannelSearch

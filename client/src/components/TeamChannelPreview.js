import React from 'react'
import {Avatar, ChannelPreview, useChatContext} from 'stream-chat-react'

const TeamChannelPreview = ({channel, type}) => {
    const {channel: activeChannel, client}= useChatContext()

    const channelPreview= () => (
        <p>
            # {channel?.data?.name || channel?.data?.id}
        </p>
    )

    const DirectPreview= ()=>{
        const members= Object.values (channel.state.members).filter(({user})=>user.id !==userID)

        return (
            <div className='channel-preview-item single'>
                <Avatar
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName}
                    size={24}
                />

            </div>
        )

    }

    return (
        <div className={
                channel?.id===activeChannel?.id
                ? 'channel-preview__wrapper__selected'
                : 'channel-preview__wrapper'
            }
            onClick={()=>{
                console.log(channel)
             }}
        
        >
            {type ==='team'? <ChannelPreview/> : <DirectPreview/>}
            
        </div>
    )
}

export default TeamChannelPreview

import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export interface Props {
    inverted?: boolean
    content?: string
}

const LoadingComponent: React.FC<Props> = ({ inverted, content }) => {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}

export default LoadingComponent

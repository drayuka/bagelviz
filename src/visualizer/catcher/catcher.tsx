import React from 'react'
import { ErrorBlock } from './styles';

export class Catcher extends React.Component<any> {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false };
    }
    state: Readonly<{
        hasError: boolean
    }>;

    static getDerivedStateFromError() {    
        // Update state so the next render will show the fallback UI.    
        return { hasError: true };  
    }
    render() {
        if (this.state.hasError) {      // You can render any custom fallback UI      
            return <ErrorBlock>Could not render this metadata file!</ErrorBlock>;    
        }
        return this.props.children; 
    }
}
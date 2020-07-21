import * as React from 'react';

interface IErrorBoundaryState {
    hasError: boolean;
    message: string | null;
}

export class ErrorBoundary extends React.Component<{}, IErrorBoundaryState> {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            message: null
        };
    }

    componentDidCatch(error) {

        // TODO: Send to analytics or something

        this.setState({
            hasError: true,
            message: error.message
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ backgroundColor: '#ffaa00', padding: 10 }}>
                    <h4>There was an unexpected error</h4>
                    {
                        this.state.message.split('\n').map(line => (
                           <><samp>{line}</samp><br /></>
                        ))
                    }
                </div>
            );
        }

        return this.props.children;
    }
}

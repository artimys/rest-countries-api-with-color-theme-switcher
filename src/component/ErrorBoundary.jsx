import React from 'react'

class ErrorBoundary extends React.Component {
    state = { hasError: false }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }


    componentDidCatch(error, info) {
        console.log("ARTY", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <p>Ptag: {this.props.fallback}</p>
        }
        return this.props.children
    }
}


export default ErrorBoundary;
import React, { Component } from 'react'
import PrimarySearchAppBar from 'components/SearchAppBar'

class BaseLayout extends Component {
    render () {
        return (
            <React.Fragment>
                <PrimarySearchAppBar/>
                {this.props.children}
            </React.Fragment>
        )
    }
}

export default BaseLayout
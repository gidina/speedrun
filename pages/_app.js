import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore from '../commons/with-redux-store';
import { initializeStore } from '../store';

import { Provider } from 'react-redux';

class MyApp extends App {
    render () {
        const { Component, pageProps, reduxStore } = this.props
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
};

export default withReduxStore(initializeStore)(MyApp);
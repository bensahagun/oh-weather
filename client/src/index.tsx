import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ColorModeScript } from '@chakra-ui/react';
import theme from './theme';

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URL,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

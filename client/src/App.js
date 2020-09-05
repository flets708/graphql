import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

import { Header } from './componentes/Header';
import { Container, Row, Col } from 'reactstrap';
import { SideNav } from './componentes/SideNav';
import { MovieList } from './componentes/MovieList';

const client = new ApolloClient({
  uri: 'http://akiravm:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <Header />
      <ApolloProvider client={client}>
        <Container>
          <Row>
            <Col xs={12} sm={4}>
              <SideNav />
            </Col>
            <Col xs={12} sm={8}>
              <MovieList />
            </Col>
          </Row>
        </Container>
      </ApolloProvider>  
    </div>
  );
}

export default App;

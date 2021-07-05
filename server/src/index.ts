import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { dataSources } from './dataSources';

const server = new ApolloServer({ schema, dataSources });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

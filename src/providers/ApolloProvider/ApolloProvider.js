import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider as ApolloClientProvider,
  ApolloLink,
  concat,
} from '@apollo/client'
import { getLocalStorageData } from 'utils/helperFuncs'

const apolloUri =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_APOLLO_URI_DEV
    : process.env.REACT_APP_APOLLO_URI

const httpLink = new HttpLink({ uri: apolloUri })

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getLocalStorageData('token')
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token || null,
    },
  }))
  return forward(operation)
})
const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})

const ApolloProvider = ({ children }) => {
  return <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
}

export default ApolloProvider

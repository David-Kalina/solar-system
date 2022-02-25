import { ChakraProvider, Flex, theme } from '@chakra-ui/react'
import * as React from 'react'
import Space from './Space'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex h="100vh" w="100vw" bg="black">
      <Space />
    </Flex>
  </ChakraProvider>
)

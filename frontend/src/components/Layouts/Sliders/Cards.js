import React from 'react';
import {Heading, Avatar, Box, Center, Image, Flex, Text, Button,Stack} from '@chakra-ui/react';
import {StarIcon} from '@chakra-ui/icons';
const Cards = () => {
    return (
        <Center
        py={6}
        >
            <Box
            maxW={'270px'}
            w='full'
            bg='white'
            boxShadow='2xl'
            rounded='2xl'
            overflow='hidden'
            >
                <Image
                h='150px'
                w='full'
                src='https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80'
                objectFit='cover'
                />
                <Flex
                justify='center'
                mt='-12px'
                >
                    <Avatar
                    size='xl'
                    src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                    alt='author'
                    css={{
                        border: '2px solid white',
                      }}
                    />
                </Flex>
                <Box px={6} py={3}>
                    <Stack
                    spacing={0}
                    align='center'
                    mb='3'
                    >
                    <Heading
                     fontSize={{base:'md',md:'2xl'}}
                     lineHeight='base'
                     letterSpacing='wide'
                     fontWeight='semibold'
                     color='gray.800'
                    >Store Name</Heading>
                    </Stack>
                    <Text
                     color='gray.700'
                    >
                        Description of the store why it is the best store so force etc...
                    </Text>
                    <Box
                    display='flex'
                    alignItems='center'
                    mt={2}
                    >
                    {
                        Array(5).fill("").map((_,i)=>(
                            <StarIcon key={i} color={i<4?"#ffa600":"gray.300"}/>
                        ))
                    }
                        <Box as="span" ml="2" color="gray.600" fontSize="sm">
                            34 reviews
                        </Box>
                    </Box>

                    <Stack pb={3} mt={3} direction='row' spacing={4}>
                    <Button
                    flex={1}
                    fontSize='sm'
                    rounded='full'
                    bg='blue.400'
                    color='white'
                    boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _focus={{blue:'blue.500'}}
                      _hover={{blue:'blue.500'}}
                    >
                        Follow
                    </Button>
                    </Stack>
                </Box>
            </Box>
        </Center>
    )
}

export default Cards;

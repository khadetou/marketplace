import React from 'react';
import {chakra, Box, Flex, Button, HStack, IconButton,InputRightElement, InputGroup, Input, Avatar, Tabs, TabList, Tab, Spacer, useColorModeValue, VisuallyHidden, useDisclosure, Link as CLink,  Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,} from '@chakra-ui/react';
import {Link as RLink} from 'react-router-dom';
import {AiOutlineMenu, AiFillHome, AiTwotoneShop, AiOutlineSearch, AiOutlineUser} from 'react-icons/ai';
import { HiShoppingCart } from "react-icons/hi"
const Navbar = () => {
    const bg = useColorModeValue('white', 'gray.800');
    const {isOpen, onOpen, onClose} = useDisclosure();



    return (
        <Box>
            <chakra.header
            bg={bg}
            borderColor= 'gray.600'
            borderBottomWidth= {1}
            borderBottomColor='gray.300'
            display={'flex'}
            flexDirection={'column'}
            alignItems="space-between"
            w='full'
            px={{base:2, sm: 4}}
            py={4}
             >
                <Flex
                alignItems='center'
                justifyContent='space-between'
                >
                    <HStack
                    spacing={4}
                    display='flex'
                    alignItems= 'center'
                    >
                        <Box
                        display={{base:"inline-flex", md:"none"}}
                        >
                            <IconButton
                            display={{base:'flex', md:'none'}}
                            aria-label='Open menu'
                            fontSize='20px'
                            color={useColorModeValue('gray.800', 'inherit')}
                            variant='ghost'
                            icon={<AiOutlineMenu/>}
                            onClick={onOpen}
                            />
                           <Drawer
                           isOpen={isOpen}
                           placement='left'
                           onClose={onClose}
                           >
                               <DrawerOverlay/>
                               <DrawerContent>
                                   <DrawerCloseButton />
                                   <DrawerHeader
                                    borderBottomWidth= {1}
                                    borderBottomColor='gray.300'
                                   >Hello</DrawerHeader>
                                   <DrawerBody>
                                    <Button
                                        w="full"
                                        variant='outline'
                                        leftIcon={<AiTwotoneShop/>}
                                        colorScheme='blue'
                                        >
                                        Open shop 
                                    </Button>
                                   </DrawerBody>
                               </DrawerContent>
                           </Drawer>
                        </Box>

                        <CLink
                        as={RLink}
                        to='/'
                        display='flex'
                        alignItems='center'
                        _hover={{textDecor:'none'}}
                        fontWeight={700}
                        color='black'
                        >
                            MarketPlace
                            <VisuallyHidden>choc</VisuallyHidden>
                        </CLink>
                    </HStack>

                    <HStack alignItems="center" w={['100%', '100%', '100%', '45%']} mx={2}>
                        <InputGroup display={{base:'none', md:"block"}} >
                            <InputRightElement
                            children={<AiOutlineSearch/>}
                            cursor='pointer'
                            />
                            <Input
                            type="tel" 
                            placeholder='Search...'
                            w="100%"
                            />
                        </InputGroup>
                    </HStack>

                    <HStack
                    spacing={3}
                    alignItems='center'
                    >
                        <HStack
                        spacing={3}
                        display={{base:"none", md:"inline-flex"}}
                        >
                            <Button
                                variant='ghost'
                                leftIcon={<AiFillHome/>}
                                color='blackAlpha.600'
                                _focus={{color:"black"}}
                                display='none'
                                >
                                Dashboard
                                </Button>
                                
                                <Button
                                variant='outline'
                                leftIcon={<AiTwotoneShop/>}
                                colorScheme='blue'
                                >
                                Open shop 
                                </Button>

                                <Button
                                variant='solid'
                                colorScheme='blue'
                                >
                                Sign In
                                </Button>

                                <IconButton
                                icon={<HiShoppingCart/>}
                                />
                        </HStack>

                        <HStack alignItems='center'   display={{base:"flex", md:"none"}}>
                        <IconButton
                        colorScheme='blue'
                        icon={<AiOutlineUser/>}
                        />
                        <IconButton
                        icon={<HiShoppingCart/>}
                        />
                        </HStack>
                         <Avatar
                        size="sm"
                        name="khadetou"
                        src="https://bit.ly/dan-abramov"
                        display='none'
                        />
                    </HStack>
                </Flex>
                <HStack alignSelf="center" alignItems="center" w={['100%', '100%', '100%', '45%']} mt={5} mx={2} display={{base:'block', md:"none"}}>
                        <InputGroup >
                            <InputRightElement
                            children={<AiOutlineSearch/>}
                            cursor='pointer'
                            />
                            <Input
                            type="tel" 
                            placeholder='Search...'
                            w="100%"
                            />
                        </InputGroup>
                </HStack>
            </chakra.header>
            <Flex
                alignItems="center"
                justifyContent='space-between'
                mx={2}
                borderWidth={0}
                overflowX='auto'
            >

            </Flex>
        </Box>
    )
}

export default Navbar

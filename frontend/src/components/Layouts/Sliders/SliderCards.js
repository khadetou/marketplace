import React from 'react';
import {Box, chakra, Link} from "@chakra-ui/react";

const SliderCards = () => {
    return (
            <Box
            bg='whiteAlpha.300'
            shadow="2xl"
            borderTop='1px'
            borderLeft='1px'
            borderColor='whiteAlpha.500'
            backdropBlur='5px'
            display={{lg:"flex"}}
            w={{base:'90%',md:'70%', lg:'80%'}}
            maxW={{lg:'5xl'}}
            rounded='2xl'
            >
                <Box 
                py={12}
                px={{base:3, md:6}}
                maxW={{base:'2xl', md:'5xl'}}
                w={{lg:'50%'}}
                >
                    <chakra.h2
                    fontSize={{base:'2xl', md:'5xl'}}
                    fontWeight='Bold'
                    color='gray.700'
                    lineHeight='base'
                    letterSpacing='wide'
                    >
                        Welcome To MarketPlace
                    </chakra.h2>
                    <chakra.p
                    fontSize={{base:'md',md:'2xl'}}
                    lineHeight='base'
                    mt={{base:'5px',md:'20px'}}
                    mb={{base:'10px',md:'40px'}}
                    letterSpacing='wide'
                    fontWeight='semibold'
                    color='gray.800'
                    >
                        Open your Store, Put your products, sell your Products, Done, Everything is handled on simple clicks 
                    </chakra.p>

                    <Box
                    mt={8}
                    >
                        <Link
                         bg="gray.200"
                         color='gray.800'
                         fontWeight='semibold'
                         px={5}
                         py={3}
                         rounded='lg'
                        >
                            Start Now
                        </Link>
                    </Box>
                </Box>

                <Box
                w={{lg:'50%'}}
                >
                    <Box
                    h={{base:64, lg:'full'}}
                    rounded={{lg:'lg'}}
                    bgSize='cover'
                    style={{
                        backgroundImage:"url('https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')"
                    }}
                    >

                    </Box>
                </Box>
            </Box>
        
    )
}

export default SliderCards;

/**
 * background-color: #4158D0;
background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
background-color: #0023cb;
background-image: linear-gradient(0deg, #0023cb 0%, #C850C0 30%, #FFCC70 66%, #ffffff 100%);

background-color: #b500a5;
background-image: linear-gradient(45deg, #b500a5 0%, #0019de 22%, #2493e8 49%, #ffffff 75%, #ffa600 100%);


 */
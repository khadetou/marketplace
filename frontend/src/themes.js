import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
    fonts:{
        heading: 'Poppins',
        body:'Poppins'
    },
    colors:{
        brand:{
            100: "#4481eb",
            200:"#720979"
        }
    }
})

export default theme;
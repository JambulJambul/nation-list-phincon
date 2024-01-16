import { AppBar, Toolbar, Typography, Stack, Box, Button, colors } from '@mui/material'

import classes from './style.module.scss';

const Navbar = () => {
    return (
        <>
            <AppBar>
                <Toolbar sx={{ py: 1 }}>
                    <Stack direction="row" width={1} alignItems="center" justifyContent="space-between">
                        <Box>
                            <Typography variant="h6"
                                fontFamily={"'Nunito Sans',sans-serif"}
                                fontWeight={600}
                                fontSize={16}
                                component="div">
                                Where in the world?
                            </Typography>
                        </Box>
                        <Box>
                            <Button variant="text" sx={"color: white;"}>
                                Dark Mode
                                </Button>
                        </Box>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
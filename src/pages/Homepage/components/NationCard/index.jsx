import { Card, CardContent, CardActionArea, CardMedia, Typography, Box } from "@mui/material"

import classes from './style.module.scss'

const NationCard = ({ data }) => {
    return (
        <>
            <Box className={classes["card"]}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200"
                            image={data.flags.png}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {data.name.common}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Population: {data.population}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Region: {data.region}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Capital: {data.capital}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </>)
}

export default NationCard
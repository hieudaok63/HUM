import { Grid, Box, useMediaQuery, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ReactComponent as Alberca } from "../../assets/icons/Alberca.svg";
import { ReactComponent as Fitness } from "../../assets/icons/Fitness.svg";
import { ReactComponent as DogPark } from "../../assets/icons/DogPark.svg";
import { ReactComponent as Asadores } from "../../assets/icons/Asadores.svg";
import { ReactComponent as CoffeeBar } from "../../assets/icons/CoffeeBar.svg";
import { ReactComponent as SocialBar } from "../../assets/icons/SocialBar.svg";
import { ReactComponent as CoWorking } from "../../assets/icons/CoWorking.svg";
import { ReactComponent as GameRoom } from "../../assets/icons/GameRoom.svg";
import { ReactComponent as ReplayIcon } from "../../assets/icons/ReplayIcon.svg";

import { ButtonStratto, HomeIcon, UtilitiesStratto } from "../ComponentsUtilities";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AmenitiesAreaModal from "./AmenitiesAreaModal";


export default function AmenitiesArea() {
    const mobile = useMediaQuery("(max-width:601px)");
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate(); 
    
    const buttonArray = [
        {
            id:1,
            icon: <Alberca/>,
            name:'Alberica',
            clickFunc: ()=>{
                console.log('Alberica !')
                handleOpen();
            }
        },
        {
            id:2,
            icon: <Fitness/>,
            name:'Fitness Center',
            clickFunc: ()=>{
                console.log('Fitness Center !')
            }
        },
        {
            id:3,
            icon: <DogPark/>,
            name:'Dog Park',
            clickFunc: ()=>{
                console.log('Dog Park !')
            }
        },
        {
            id:4,
            icon: <Asadores/>,
            name:'Asadores',
            clickFunc: ()=>{
                console.log('Asadores !')
            }
        },
        {
            id:5,
            icon: <CoffeeBar/>,
            name:'Coffee Bar',
            clickFunc: ()=>{
                console.log('Coffee Bar !')
            }
        },
        {
            id:6,
            icon: <SocialBar/>,
            name:'Social Bar',
            clickFunc: ()=>{
                console.log('Social Bar !')
            }
        },
        {
            id:7,
            icon: <CoWorking/>,
            name:'Co-working',
            clickFunc: ()=>{
                console.log('Co-working !')
            }
        },
        {
            id:8,
            icon: <GameRoom/>,
            name:'Game room', 
            clickFunc: ()=>{
                console.log('Game room !')
            }
        },
    ]
    
  return (
    <div
        style={{
            backgroundColor:'rgba(0, 0, 0, 0.9)',
            width:'100%',
            height: mobile ? 'unset' : '100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flexDirection: 'column',
            position:'relative'
        }}
    >   
        {!mobile && <HomeIcon/>}
        <div style={{padding:'0 70px'}}>
            <div>
                <p style={{color: 'rgba(255, 255, 255, 1)', textAlign: mobile ?'center' : 'unset'}}>AMENIDADES</p>
            </div>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        buttonArray.map((item)=>{
                            return (
                                <Grid item xs={12} sm={6} md={3}>
                                    <div style={{backgroundColor: 'rgba(242, 242, 242, 1)', height:'88px', borderRadius:'7px', display:'flex', justifyContent:'flex-start',alignItems:'center', cursor:'pointer'}}
                                        onClick={item.clickFunc}
                                    >
                                        <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                                            <div style={{margin:'0 22px'}}>
                                                {item.icon}
                                            </div>
                                            <p style={{fontWeight:"700", fontSize:'16px'}}>
                                                {item.name}
                                            </p>
                                        </div>
                                    </div>
                                </Grid>
                            )
                        }) 
                    }
                </Grid>
            </Box>
        </div>
        {
            mobile ? (
            <div style={{position: mobile? 'unset' : 'absolute', bottom:'24px', padding:'30px 0px'}}>
                <Stack direction="row" spacing={2}>
                    <ButtonStratto name="Depas" path=""/>
                    <ButtonStratto name="Amenidades" path="stratto"/>
                </Stack>
            </div> ) : (
            <div style={{position:'absolute', bottom:'24px'}}>
                <ButtonStratto name="Depas" path=""/>
            </div> )
        }
        <div style={{position:'absolute', bottom:'24px', left:'30px', cursor:'pointer'}} onClick={()=> navigate('/b-roll')}>
            {!mobile && <ReplayIcon />}
        </div>
        <div style={{position:'absolute', bottom: mobile ? '97px' : '20px', right:'0'}}>
            <UtilitiesStratto/>
        </div>
        <AmenitiesAreaModal onClose={handleClose} open={open}/>
    </div>
  )
}

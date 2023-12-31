import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import Modal from '@mui/material/Modal';
import { ReactComponent as Alberca } from "../../assets/icons/Alberca.svg";
import CloseIcon from '@mui/icons-material/Close';
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useState } from 'react';
import { UtilitiesStratto } from '../ComponentsUtilities';

interface AmenitiesAreaModalProps {
    onClose: any;
    open?: any;
  }

const InfoMobileView = () => {
    const mobileMini = useMediaQuery("(max-width:320px)");
    const mobile = useMediaQuery("(max-width:601px)");
    const tabletMini = useMediaQuery("(max-width:820px)");
    const setWidthText = () => {
        if(mobileMini){
            return '235px'
        }
        if(mobile) {
            return '270px'
        }
        return '390px'
    }
    return (
        <Box width={'100%'} height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Box width={'100%'} textAlign={'left'} padding={tabletMini? '0 80px': '0 40px'}>
                <div>
                    <Typography fontWeight={300} fontSize={'16px'} color={'rgba(0, 0, 0, 1)'} >AMENIDADES</Typography>
                </div>
                <Box marginTop={'20px'} >
                    <Alberca/>
                </Box>
                <Box marginTop={'20px'}>
                    <Typography fontWeight={900} fontSize={'28px'} color={'rgba(0, 0, 0, 1)'}>Alberca</Typography>
                </Box>
                <Box marginTop={'15px'} display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
                    <Typography fontSize={'20px'} fontWeight={300} color={'rgba(0, 0, 0, 1)'}>Nivel:</Typography>
                    <Typography marginLeft={'6px'} fontSize={'20px'} fontWeight={700} color={'rgba(0, 0, 0, 1)'}>40</Typography> 
                </Box>
                <Box marginTop={'20px'} width={setWidthText()}>
                    <Typography fontSize={'14px'} fontWeight={400} color={'rgba(0, 0, 0, 1)'}>
                        Admira la ciudad desde las alturas disfrutando un día soleado al aire libre compartiendo una deliciosa comida y buenos momentos.
                    </Typography>
                </Box>
                <Box marginTop={'20px'}>
                    <ul style={{fontSize:'14px', fontWeight:'400', color:'rgba(0, 0, 0, 1)'}}>
                        <li style={{marginTop:'20px'}}>Asadores y mesas</li>
                        <li style={{marginTop:'20px'}}>Wellness area</li>
                        <li style={{marginTop:'20px'}}>Lounge area para tus reuniones</li>
                        <li style={{marginTop:'20px'}}>Terraza de 300 m2</li>
                    </ul>
                </Box>              
            </Box>
        </Box>
    )
}

export default function AmenitiesAreaModal({onClose, open}:AmenitiesAreaModalProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const desktop = useMediaQuery("(max-width:1870px)");
    const tablet = useMediaQuery("(max-width:1180px)");
    const tabletSmall = useMediaQuery("(max-width:1024px)")
    const tabletMini = useMediaQuery("(max-width:820px)");
    const mobile = useMediaQuery("(max-width:601px)");
    const mobileMini = useMediaQuery("(max-width:320px)");
    const setWidthImg = () => {
        if(tabletMini){
            return '100%'
        }
        if(tabletSmall){
            return '400px'
        }
        if(tablet) {
            return '565px'
        }
        if(desktop) { 
            return '785px'
        }
        return '1176px'
    }
    const setHeightImg = () => {
        if(tabletMini){
            return '100%'
        }
        if(tablet) {
            return '535px'
        }
        if(desktop) {
            return '555px'
        }
        return '768px'
    }
    const setButtonWidth = () => {
        if(mobile){
            return '100%'
        }
        if(tabletMini) {
            return '177px'
        }
        if(tablet) {
            return '150px'
        }
        return '220px'
    }
    const setButtonHeight = () => {
        if(tabletMini) {
            return '46px'
        }
    }
    const fontSizeButton = () => {
        if(tablet) {
            return '15px'
        }
        return '20px'
    }
    const slidesPerView = () => {
        if(tabletSmall){
            return 3
        }
        if(tablet){
            return 4
        }
        if(desktop) {
            return 5
        }
        return 8
    }
    const closeButtonRight = () => {
        if(tabletMini) { 
            return '1%'
        }
        if(desktop){
            return '-63px'
        }
        return '-70px'
    }
    const marginSpace = () =>{
        if(tabletMini) {
            return '0px'
        }
        if(desktop){
            return '50px'
        }
        return '55px'
    }
    const setFontSizeIcon = () => {
        if(mobile){
            return '19px'
        }
        if(tabletMini) {
            return '40px'
        }
        return 
    }
    const setUtilitiesStrattoRight = () => {
        if (mobileMini) {
            return 'unset'
        }
        if(tabletMini){
            return '-2px';
        }
        return '-79px'
    }

    const setUtilitiesStrattoBottom =() =>{
        if(mobileMini){
            return '311px'
        }
        if(tabletMini){
            return '58px'
        }
        return '32px'
    }

    const images = [
        {
            id:1,
            src:'https://swiperjs.com/demos/images/nature-1.jpg'
        },
        {
            id:2,
            src:'https://swiperjs.com/demos/images/nature-2.jpg'
        },
        {
            id:3,
            src:'https://swiperjs.com/demos/images/nature-3.jpg'
        },
        {
            id:4,
            src:'https://swiperjs.com/demos/images/nature-4.jpg'
        },
        {
            id:5,
            src:'https://swiperjs.com/demos/images/nature-5.jpg'
        },
        {
            id:6,
            src:'https://swiperjs.com/demos/images/nature-6.jpg'
        },
        {
            id:7,
            src:'https://swiperjs.com/demos/images/nature-7.jpg'
        },
        {
            id:8,
            src:'https://swiperjs.com/demos/images/nature-8.jpg'
        },
        {
            id:9,
            src:'https://swiperjs.com/demos/images/nature-9.jpg'
        },
        {
            id:10,
            src:'https://swiperjs.com/demos/images/nature-10.jpg'
        }
    ]

  return (
    <div 
        // style={{width:'100%', height:'100%'}}
    >
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box width={'100%'} height={'100%'}>
                <Box bgcolor={tabletMini? '':'rgba(255, 255, 255, 1)'} position={'absolute'}
                    top={tabletMini?'unset' : '50%'}
                    left={tabletMini?'unset' : '49%'} 
                    sx={{transform: tabletMini ? 'unset' : 'translate(-50%, -50%)', outline:'none'}} borderRadius={'15px'} padding={tabletMini ? '0px':'25px'}
                    width={tabletMini ? '100%': 'unset'}
                    height={tabletMini ? '100%': 'unset'}
                >
                    <Box display={'flex'} alignItems={'center'} justifyContent={tabletMini? 'center' : 'unset'} height={tabletMini ? '100%':'unset'}>
                        <Box width={tabletMini ? '100%':'unset'} height={tabletMini ? '100%':'unset'}>
                            <Box width={setWidthImg()} height={setHeightImg()} borderRadius={tabletMini ? '' : '15px'} overflow={'hidden'}>
                                <Swiper
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                >

                                    {images.map((item) => {
                                        return(
                                            <>
                                                <SwiperSlide>
                                                    <img width={'100%'} 
                                                    src={item.src} alt='nature'/>
                                                </SwiperSlide>

                                            </>
                                        )
                                    })}
                                    {
                                        tabletMini && 
                                        <SwiperSlide>
                                            <InfoMobileView/>
                                        </SwiperSlide>
                                    }
                                </Swiper>
                            </Box>
                        </Box>
                        {
                            !tabletMini &&
                            <Box marginLeft={marginSpace()} >
                                <div>
                                    <Typography fontWeight={300} fontSize={'16px'} color={'rgba(0, 0, 0, 1)'}>AMENIDADES</Typography>
                                </div>
                                <Box marginTop={'20px'}>
                                    <Alberca/>
                                </Box>
                                <Box marginTop={'20px'}>
                                    <Typography fontWeight={900} fontSize={'28px'} color={'rgba(0, 0, 0, 1)'}>Alberca</Typography>
                                </Box>
                                <Box marginTop={'15px'} display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
                                    <Typography fontSize={'20px'} fontWeight={300} color={'rgba(0, 0, 0, 1)'}>Nivel:</Typography>
                                    <Typography marginLeft={'6px'} fontSize={'20px'} fontWeight={700} color={'rgba(0, 0, 0, 1)'}>40</Typography> 
                                </Box>
                                <Box marginTop={'20px'} width={'390px'}>
                                    <Typography fontSize={'14px'} fontWeight={400} color={'rgba(0, 0, 0, 1)'}>
                                        Admira la ciudad desde las alturas disfrutando un día soleado al aire libre compartiendo una deliciosa comida y buenos momentos.
                                    </Typography>
                                </Box>
                                <Box marginTop={'20px'}>
                                    <ul style={{fontSize:'14px', fontWeight:'400', color:'rgba(0, 0, 0, 1)'}}>
                                        <li style={{marginTop:'20px'}}>Asadores y mesas</li>
                                        <li style={{marginTop:'20px'}}>Wellness area</li>
                                        <li style={{marginTop:'20px'}}>Lounge area para tus reuniones</li>
                                        <li style={{marginTop:'20px'}}>Terraza de 300 m2</li>
                                    </ul>
                                </Box>
                                
                            </Box>
                        }
                    </Box>
                    <Box display={'flex'} alignItems={'center'} justifyContent={tabletMini ? 'center' : 'unset'} marginTop={'19px'}>
                        {
                            !tabletMini && 
                            <Box width={setWidthImg()} height={'89px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={slidesPerView()}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    style={{width:'100%', height:'100%'}}
                                >
                                    {images.map((item)=>{
                                        return(
                                            <SwiperSlide>
                                                <div className='swiperWrapper'>
                                                    <img width={'100%'} height={'100%'} src={item.src} alt='nature'/>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </Box>
                        }
                        <Box display={'flex'} alignItems={'center'} marginLeft={marginSpace()} position={tabletMini? 'absolute' : 'unset'} zIndex={tabletMini? '999' : '0'} bottom={tabletMini ?'15px' : ''}
                            justifyContent={tabletMini?'center':'unset'}
                            width={tabletMini? '100%' : 'unset'}
                        >
                                <button style={{backgroundColor:'rgba(86, 176, 192, 1)', padding: '20px 0', fontSize:fontSizeButton(), fontWeight:'700', borderRadius:'15px', color:'rgba(255, 255, 255, 1)', cursor:'pointer',
                                    height:setButtonHeight(),
                                    width:setButtonWidth(), 
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    border:'2px solid rgba(86, 176, 192, 1)',
                                    marginLeft: mobile? '10px' : '0px'
                                }}>
                                    Depas
                                </button>
                                <button style={{backgroundColor:'rgba(255, 255, 255, 1)', padding: '20px 0', fontSize:fontSizeButton(), fontWeight:'700', borderRadius:'15px', cursor:'pointer',
                                    marginLeft:'15px',
                                    height:setButtonHeight(),
                                    width:setButtonWidth(),
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    border:'2px solid rgba(86, 176, 192, 1)',
                                    color:'rgba(86, 176, 192, 1)',
                                    marginRight: mobile? '10px' : '0px'
                                }}>
                                    Agenda tu visita
                                </button>
                        </Box>
                    </Box>
                    <div onClick={onClose} >
                        <Box position={'absolute'} width={'48px'} height={'48px'} bgcolor={tabletMini? '' : 'rgba(255, 255, 255, 1)'} top={tabletMini?'1%': '0'} right={closeButtonRight()} sx={{cursor:'pointer'}} borderRadius={'50%'}
                            display={'flex'} 
                            justifyContent={'center'}
                            alignItems={'center'}
                            zIndex={100}
                        >
                            <CloseIcon sx={{fontSize: setFontSizeIcon()}}/>
                        </Box>
                    </div>
                    <Box position={'absolute'} right={setUtilitiesStrattoRight()} bottom={setUtilitiesStrattoBottom()} left={mobileMini? '64px':'unset'} zIndex={999}>
                        <UtilitiesStratto/>
                    </Box>
                </Box>
            </Box>
        </Modal>
    </div>
  )
}

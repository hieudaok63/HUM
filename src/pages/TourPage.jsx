/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useParams } from 'react-router-dom';
import { arrayOf, func, shape, bool, string, number } from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import Viewer from '../components/Viewer';
import VideoPlayer from '../components/VideoPlayer';
import TourAction from '../stores/tour/actions';
// import ThreeSixtyAction from '../stores/threeSixty/actions';
import LoadingAction from '../stores/loading/actions';
import {
  floorplansSelector,
  levelsSelector,
  logoSelector,
  typeSelector,
  sectionsSelector,
  imageGallerySelector,
  videoGallerySelector,
  builderIdSelector,
  scheduleAMeetingSelector,
  canScheduleSelector,
  selectedFloorplanSelector
} from '../selectors/Tour';
import { amenitySelector } from '../selectors/Amenities';
import { loadingSelector } from '../selectors/loading';
import ThreeSixtyAction from '../stores/threeSixty/actions';
// import SocketAction from '../stores/socket/actions';
// import { SOCKET } from '../config/endpoints';
import LeftMenu from '../components/NewMenus/LeftMenu';
import ActionsMenu from '../components/NewMenus/ActionsMenu';
import InfoPage from '../components/InfoPage/InfoPage';
import PanoViewer from '../components/PanoViewer';
import './Test.scss';
import LanguageAction from '../stores/language/actions';
import ImageWithHotspots from '../components/ImageWithHotspots';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import VideoGallery from '../components/VideoGallery/VideoGallery';
import ScehduleAMeeting from '../components/ScheduleAMeeting';
import AmenityNav from '../components/AmenityNav';
import ThreeSixtyAmenityNav from '../components/ThreeSixtyAmenityNav';
import AmenitiesActions from '../stores/amenities/actions';

const TourPage = ({
  floorplans,
  dispatch,
  loader,
  levels,
  logo,
  amenity,
  type,
  sections,
  imageGallery,
  videoGallery,
  builderId: stateBuilderId,
  scheduleActive,
  canSchedule,
  selectedFloorplan
}) => {
  const { builderId, projectId } = useParams();
  const [galleryIndex, setGalleryIndex] = React.useState(0);
  const [infoPage, setInfoPage] = React.useState(null);

  React.useEffect(() => {
    async function getData() {
      await dispatch(LoadingAction.setLoader(true));
      await dispatch(TourAction.getData(builderId, projectId));
      await dispatch(LanguageAction.setLanguageFromTour());
      await dispatch(TourAction.selectFloorplan(0));
      await dispatch(ThreeSixtyAction.setThreeSixtyData());
      await dispatch(TourAction.getCustomPage());
    }
    getData();
  }, []);

  const moveCarouselLeft = () => {
    if (galleryIndex === 0) {
      setGalleryIndex(amenity.length - 1);
    } else {
      setGalleryIndex(galleryIndex - 1);
    }
  };

  const moveCarouselRight = () => {
    if (galleryIndex === amenity.length - 1) {
      setGalleryIndex(0);
    } else {
      setGalleryIndex(galleryIndex + 1);
    }
  };

  const getAmenityType = () => {
    if (amenity.length > 1 && levels.length > 0 && galleryIndex > 0)
      return amenity[galleryIndex - 1].type;

    return amenity[galleryIndex].type;
  };

  const getAmenityImage = () => {
    if (amenity.length > 1 && levels.length > 0 && galleryIndex > 0)
      return amenity[galleryIndex - 1].image;

    return amenity[galleryIndex].image;
  };

  const getSpots = () => {
    if (amenity.length > 1 && levels.length > 0 && galleryIndex > 0)
      return amenity[galleryIndex - 1].spots;

    return amenity[galleryIndex].spots;
  };

  const getUrl = () => {
    if (amenity.length > 1 && levels.length > 0 && galleryIndex > 0)
      return amenity[galleryIndex - 1].url;

    return amenity[galleryIndex].url;
  };

  React.useEffect(() => {
    setGalleryIndex(0);
  }, [amenity]);

  React.useEffect(() => {
    const setAmenity = async () => {
      await dispatch(
        AmenitiesActions.setAmenity(floorplans[selectedFloorplan].media)
      );
    };

    if (selectedFloorplan === 0 && floorplans.length > 0) setAmenity();
  }, [floorplans]);

  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
      <Loader loading={loader} />
      {levels.length > 0 && <Viewer type={type} />}
      {amenity.length > 0 && (
        <>
          {amenity.length > 1 && levels.length === 0 && (
            <AmenityNav
              amenity={amenity}
              galleryIndex={galleryIndex}
              moveCarouselLeft={moveCarouselLeft}
              moveCarouselRight={moveCarouselRight}
            />
          )}
          {amenity.length > 1 && levels.length > 0 && (
            <ThreeSixtyAmenityNav
              amenity={amenity}
              galleryIndex={galleryIndex}
              moveCarouselLeft={async () => {
                if (galleryIndex === 0) {
                  setGalleryIndex(amenity.length + 1 - 1);
                } else {
                  setGalleryIndex(galleryIndex - 1);
                }

                if (galleryIndex - 1 === 0)
                  await dispatch(TourAction.selectType('three-sixty'));
              }}
              moveCarouselRight={async () => {
                if (galleryIndex + 1 === amenity.length + 1) {
                  setGalleryIndex(0);
                  await dispatch(TourAction.selectType('three-sixty'));
                } else {
                  setGalleryIndex(galleryIndex + 1);
                  await dispatch(
                    TourAction.selectType(amenity[galleryIndex].type)
                  );
                }
              }}
            />
          )}
          {getAmenityType() === '2d' && type !== 'three-sixty' && (
            <ImageWithHotspots
              src={getAmenityImage()}
              spots={getSpots()}
              alt="Amenity"
              className="image-full"
            />
          )}
          {getAmenityType() === 'video' && type !== 'three-sixty' && (
            <div className="video-full-container video-full-container-with-background">
              <VideoPlayer src={getUrl()} />
            </div>
          )}
          {getAmenityType() === 'pano' && type !== 'three-sixty' && (
            <PanoViewer
              type={amenity[galleryIndex].type}
              image={amenity[galleryIndex].image}
              spots={amenity[galleryIndex].spots}
            />
          )}
        </>
      )}
      {!loader && (
        <>
          {stateBuilderId && canSchedule && <ScehduleAMeeting />}
          {!scheduleActive && (
            <LeftMenu
              {...logo}
              floorplans={floorplans}
              setGalleryIndex={setGalleryIndex}
              sections={sections}
              infoPage={infoPage}
            />
          )}
          {!scheduleActive && (
            <ActionsMenu
              infoPage={infoPage}
              setInfoPage={setInfoPage}
              type={type}
              amenity={amenity}
              galleryIndex={galleryIndex}
            />
          )}
        </>
      )}
      {infoPage && (
        <InfoPage infoPage={infoPage} setInfoPage={setInfoPage} {...logo} />
      )}
      {imageGallery && <ImageGallery />}
      {videoGallery && <VideoGallery />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  floorplans: floorplansSelector(state),
  loader: loadingSelector(state),
  levels: levelsSelector(state),
  logo: logoSelector(state),
  type: typeSelector(state),
  amenity: amenitySelector(state),
  sections: sectionsSelector(state),
  imageGallery: imageGallerySelector(state),
  videoGallery: videoGallerySelector(state),
  builderId: builderIdSelector(state),
  scheduleActive: scheduleAMeetingSelector(state),
  canSchedule: canScheduleSelector(state),
  selectedFloorplan: selectedFloorplanSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

TourPage.propTypes = {
  dispatch: func.isRequired,
  floorplans: arrayOf(shape({})).isRequired,
  loader: bool.isRequired,
  levels: arrayOf(shape({})).isRequired,
  logo: shape({}).isRequired,
  amenity: arrayOf(shape({})).isRequired,
  type: string.isRequired,
  sections: arrayOf(shape({})).isRequired,
  imageGallery: bool.isRequired,
  videoGallery: bool.isRequired,
  builderId: string.isRequired,
  scheduleActive: bool.isRequired,
  canSchedule: bool.isRequired,
  selectedFloorplan: number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TourPage);

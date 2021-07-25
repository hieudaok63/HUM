/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useParams } from 'react-router-dom';
import { arrayOf, func, shape, bool, string } from 'prop-types';
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
  sectionsSelector
} from '../selectors/Tour';
import { amenitySelector } from '../selectors/Amenities';
import { loadingSelector } from '../selectors/loading';
import ThreeSixtyAction from '../stores/threeSixty/actions';
// import SocketAction from '../stores/socket/actions';
// import { SOCKET } from '../config/endpoints';
import LeftMenu from '../components/NewMenus/LeftMenu';
import ActionsMenu from '../components/NewMenus/ActionsMenu';
import { stylesSelector } from '../selectors/ThreeSixty';
import InfoPage from '../components/InfoPage/InfoPage';
import PanoViewer from '../components/PanoViewer';
import { ReactComponent as DropdownIcon } from '../assets/Icons/icon_dropdown.svg';
import { ReactComponent as PanoIcon } from '../assets/Icons/icon_360.svg';
import { ReactComponent as ImageIcon } from '../assets/Icons/icon_image.svg';
import { ReactComponent as VideoIcon } from '../assets/Icons/icon-play.svg';
import { ReactComponent as EllipseIcon } from '../assets/Icons/icon_ellipse.svg';
import './Test.scss';
import LanguageAction from '../stores/language/actions';

const ThreeSixtyPage = ({
  floorplans,
  dispatch,
  loader,
  levels,
  logo,
  styles,
  amenity,
  type,
  sections
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

  const galleryIcon = {
    '2d': <ImageIcon className="icon-type" />,
    video: <VideoIcon className="icon-type-md" />,
    pano: <PanoIcon className="icon-type-md" />
  };

  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
      <Loader loading={loader} />
      {levels.length > 0 && <Viewer type={type} />}
      {amenity.length > 0 && (
        <>
          {amenity.length > 1 && (
            <div className="gallery-carousel-controls">
              {amenity[galleryIndex - 1] ? (
                <DropdownIcon
                  className="left-arrow"
                  onClick={moveCarouselLeft}
                />
              ) : (
                <div className="placeholder placeholder-left" />
              )}
              {amenity[galleryIndex - 1] && (
                <EllipseIcon
                  className="ellipsis-icon"
                  onClick={moveCarouselLeft}
                />
              )}
              {amenity[galleryIndex] && galleryIcon[amenity[galleryIndex].type]}
              {amenity[galleryIndex + 1] && (
                <EllipseIcon
                  className="ellipsis-icon"
                  onClick={moveCarouselRight}
                />
              )}
              {!amenity[galleryIndex - 1] && amenity[galleryIndex + 2] && (
                <EllipseIcon
                  className="ellipsis-icon"
                  onClick={moveCarouselRight}
                />
              )}
              {amenity[galleryIndex + 1] ? (
                <DropdownIcon
                  className="right-arrow"
                  onClick={moveCarouselRight}
                />
              ) : (
                <div className="placeholder placeholder-right" />
              )}
            </div>
          )}
          {amenity[galleryIndex].type === '2d' && (
            <img
              src={amenity[galleryIndex].image}
              alt="Amenity"
              className="image-full"
            />
          )}
          {amenity[galleryIndex].type === 'video' && (
            <div className="video-full-container">
              <VideoPlayer src={amenity[galleryIndex].url} />
            </div>
          )}
          {amenity[galleryIndex].type === 'pano' && (
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
          <LeftMenu
            {...logo}
            floorplans={floorplans}
            setGalleryIndex={setGalleryIndex}
            sections={sections}
            infoPage={infoPage}
          />
          <ActionsMenu
            styles={styles}
            infoPage={infoPage}
            setInfoPage={setInfoPage}
            type={type}
            amenity={amenity}
            galleryIndex={galleryIndex}
          />
        </>
      )}
      {infoPage && <InfoPage infoPage={infoPage} setInfoPage={setInfoPage} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  floorplans: floorplansSelector(state),
  loader: loadingSelector(state),
  levels: levelsSelector(state),
  logo: logoSelector(state),
  styles: stylesSelector(state),
  type: typeSelector(state),
  amenity: amenitySelector(state),
  sections: sectionsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

ThreeSixtyPage.propTypes = {
  dispatch: func.isRequired,
  floorplans: arrayOf(shape({})).isRequired,
  loader: bool.isRequired,
  levels: arrayOf(shape({})).isRequired,
  logo: shape({}).isRequired,
  styles: arrayOf(shape({})).isRequired,
  amenity: arrayOf(shape({})).isRequired,
  type: string.isRequired,
  sections: arrayOf(shape({})).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreeSixtyPage);

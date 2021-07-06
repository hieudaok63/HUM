/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useParams } from 'react-router-dom';
import { arrayOf, func, shape, bool, string } from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import Viewer from '../components/Viewer';
import TourAction from '../stores/tour/actions';
// import ThreeSixtyAction from '../stores/threeSixty/actions';
import LoadingAction from '../stores/loading/actions';
import {
  floorplansSelector,
  levelsSelector,
  logoSelector,
  amenitiesSelector,
  typeSelector
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
import './Test.scss';

const ThreeSixtyPage = ({
  floorplans,
  dispatch,
  loader,
  levels,
  logo,
  styles,
  amenities,
  amenity,
  type
}) => {
  const { builderId, projectId } = useParams();
  const [galleryIndex, setGalleryIndex] = React.useState(0);
  const [infoPage, setInfoPage] = React.useState(null);

  React.useEffect(() => {
    async function getData() {
      await dispatch(LoadingAction.setLoader(true));
      // await dispatch(SocketAction.initSocket(SOCKET));
      await dispatch(TourAction.getData(builderId, projectId));
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

  console.log('amenity', amenity);

  return (
    <>
      <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
        <Loader loading={loader} />
        {levels.length > 0 && <Viewer type={type} />}
        {amenity.length > 0 && (
          <>
            {amenity.length > 1 && (
              <div className="gallery-carousel-controls">
                <DropdownIcon
                  className="left-arrow"
                  onClick={moveCarouselLeft}
                />
                {`${galleryIndex + 1} / ${amenity.length}`}
                <DropdownIcon
                  className="right-arrow"
                  onClick={moveCarouselRight}
                />
              </div>
            )}
            {amenity[galleryIndex].type === '2d' ? (
              <>
                <ImageIcon className="icon-type" />
                <img
                  src={amenity[galleryIndex].image}
                  alt="Amenity"
                  className="image-full"
                />
              </>
            ) : (
              <>
                <PanoIcon className="icon-type" />
                <PanoViewer
                  type={amenity[galleryIndex].type}
                  image={amenity[galleryIndex].image}
                />
              </>
            )}
          </>
        )}
        {!loader && (
          <>
            <LeftMenu
              {...logo}
              floorplans={floorplans}
              amenities={amenities.content}
              // exterior={exterior.content}
              setGalleryIndex={setGalleryIndex}
            />
            <ActionsMenu
              styles={styles}
              infoPage={infoPage}
              setInfoPage={setInfoPage}
              type={type}
            />
          </>
        )}
        {infoPage && <InfoPage infoPage={infoPage} setInfoPage={setInfoPage} />}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  floorplans: floorplansSelector(state),
  loader: loadingSelector(state),
  levels: levelsSelector(state),
  logo: logoSelector(state),
  styles: stylesSelector(state),
  amenities: amenitiesSelector(state),
  type: typeSelector(state),
  amenity: amenitySelector(state)
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
  amenities: shape({}).isRequired,
  amenity: arrayOf(shape({})).isRequired,
  type: string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreeSixtyPage);

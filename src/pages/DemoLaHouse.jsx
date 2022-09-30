/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { arrayOf, func, shape, bool, number } from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../components/Loader';

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
import {
  amenitySelector,
  selectedAmenitySelector,
  selectedContentSelector
} from '../selectors/Amenities';
import { loadingSelector } from '../selectors/loading';
import ThreeSixtyAction from '../stores/threeSixty/actions';
import './Test.scss';
import LanguageAction from '../stores/language/actions';
import AmenitiesActions from '../stores/amenities/actions';
import { getSelectedScene } from '../selectors/menu';
import InteractiveFloorplan from '../components/InteractiveFloorplanThreeD';
import '../components/NewMenus/LeftMenu.scss';

const TourPage = ({
  floorplans,
  dispatch,
  loader,
  selectedFloorplan,
  sections
}) => {
  const { builderId, projectId } = useParams();

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

  React.useEffect(() => {
    const setAmenity = async () => {
      await dispatch(
        AmenitiesActions.setAmenity(floorplans[selectedFloorplan].media)
      );
    };

    if (selectedFloorplan === 0 && floorplans.length > 0) setAmenity();
  }, [floorplans]);

  const content = useMemo(
    () =>
      sections.filter((section) => section.key === 'price-availability')?.[0]
        ?.content?.[0],
    [sections]
  );
  console.log(content);
  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
      {content?.svgImage ? (
        <InteractiveFloorplan content={content} />
      ) : (
        <Loader loading />
      )}
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
  selectedFloorplan: selectedFloorplanSelector(state),
  selectedScene: getSelectedScene(state),
  selectedAmenity: selectedAmenitySelector(state),
  content: selectedContentSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

TourPage.propTypes = {
  dispatch: func.isRequired,
  floorplans: arrayOf(shape({})).isRequired,
  loader: bool.isRequired,
  selectedFloorplan: number.isRequired,
  sections: arrayOf(shape({})).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TourPage);

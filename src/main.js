import { render, RenderPosition } from './render';
import TripInfoView from './view/trip-info-view';
import TripFiltersView from './view/trip-filters-view';
import TripPresenter from './presenter/trip-presenter';


const siteHeaderWrapper = document.querySelector('.trip-main');
const siteFilterWrapper = siteHeaderWrapper.querySelector('.trip-controls__filters');
const eventsListWrapper = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({ listContainer: eventsListWrapper });

render(new TripInfoView(), siteHeaderWrapper, RenderPosition.AFTERBEGIN);
render(new TripFiltersView(), siteFilterWrapper);

tripPresenter.init();

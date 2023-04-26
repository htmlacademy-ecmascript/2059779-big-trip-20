import TripFiltersView from './view/trip-filters-view';
import TripSortView from './view/trip-sort-view';
import { render } from './render';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteFilterWrapper = siteHeaderElement.querySelector('.trip-controls__filters');
const siteSortWrapper = siteMainElement.querySelector('.trip-events');

render(new TripFiltersView(), siteFilterWrapper);
render(new TripSortView(), siteSortWrapper);

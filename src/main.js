import { render } from './framework/render.js';
import TripFiltersView from './view/trip-filters-view';
import TripPresenter from './presenter/trip-presenter';
import MockService from './service/mock-service';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import EventsModel from './model/events-model';

const siteHeaderWrapper = document.querySelector('.page-header__container');
const eventsListWrapper = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const eventsModel = new EventsModel(mockService);

const tripPresenter = new TripPresenter({
  headerContainer: siteHeaderWrapper,
  listContainer: eventsListWrapper,
  destinationsModel,
  offersModel,
  eventsModel
});

tripPresenter.init();
const siteFilterWrapper = siteHeaderWrapper.querySelector('.trip-controls__filters');
render(new TripFiltersView(), siteFilterWrapper);

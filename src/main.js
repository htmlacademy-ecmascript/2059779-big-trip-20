import { render, RenderPosition } from './render';
import TripInfoView from './view/trip-info-view';
import TripFiltersView from './view/trip-filters-view';
import TripPresenter from './presenter/trip-presenter';
import MockService from './service/mock-service';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import EventsModel from './model/events-model';

const siteHeaderWrapper = document.querySelector('.trip-main');
const siteFilterWrapper = siteHeaderWrapper.querySelector('.trip-controls__filters');
const eventsListWrapper = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const eventsModel = new EventsModel(mockService);

const tripPresenter = new TripPresenter({
  listContainer: eventsListWrapper,
  destinationsModel,
  offersModel,
  eventsModel
});

render(new TripInfoView(), siteHeaderWrapper, RenderPosition.AFTERBEGIN);
render(new TripFiltersView(), siteFilterWrapper);

tripPresenter.init();

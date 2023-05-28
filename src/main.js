import TripPresenter from './presenter/trip-presenter';
import HeaderPresenter from './presenter/header-presenter.js';
import MockService from './service/mock-service';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import EventsModel from './model/events-model';

const siteHeaderWrapper = document.querySelector('.trip-main');
const eventsListWrapper = document.querySelector('.trip-events');

const mockService = new MockService();
const offersModel = new OffersModel(mockService);
const eventsModel = new EventsModel(mockService);
const destinationsModel = new DestinationsModel(mockService);

const headerPresenter = new HeaderPresenter({
  headerContainer: siteHeaderWrapper,
  destinationsModel,
  offersModel,
  eventsModel
});

const tripPresenter = new TripPresenter({
  listContainer: eventsListWrapper,
  destinationsModel,
  offersModel,
  eventsModel
});

headerPresenter.init();
tripPresenter.init();

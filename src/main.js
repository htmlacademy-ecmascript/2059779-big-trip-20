import TripPresenter from './presenter/trip-presenter';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import EventsModel from './model/events-model';
import FiltersModel from './model/filters-model';
import TripApiService from './service/trip-api-service';
import { AUTHORIZATION, END_POINT } from './const';

const siteHeaderWrapper = document.querySelector('.trip-main');
const eventsListWrapper = document.querySelector('.trip-events');

const tripApiService = new TripApiService(END_POINT, AUTHORIZATION);
const offersModel = new OffersModel(tripApiService);
const destinationsModel = new DestinationsModel(tripApiService);
const eventsModel = new EventsModel({
  service: tripApiService,
  offersModel,
  destinationsModel
});
const filtersModel = new FiltersModel();

const tripPresenter = new TripPresenter({
  headerContainer: siteHeaderWrapper,
  listContainer: eventsListWrapper,
  eventsModel,
  offersModel,
  destinationsModel,
  filtersModel
});

tripPresenter.init();
eventsModel.init();

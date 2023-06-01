import { render } from '../framework/render.js';
import TripSortView from '../view/trip-sort-view';
import EmptyListView from '../view/empty-list-view.js';
import EventPresenter from './event-presenter.js';
import HeaderPresenter from './header-presenter.js';
import EventListView from '../view/event-list-view.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { compareEventPrice, compareEventDuration } from '../utils/sort.js';

export default class TripPresenter {
  #listContainer = null;
  #headerContainer = null;
  #eventsModel = null;

  #events = null;
  #destinations = null;
  #offers = null;

  #sortComponent = null;
  #emptyListComponent = new EmptyListView();
  #listComponent = new EventListView();

  #currentSortType = SortType.DEFAULT;
  #initialEvents = [];

  #eventPresenters = new Map();

  constructor({ listContainer, headerContainer, destinationsModel, offersModel, eventsModel }) {
    this.#listContainer = listContainer;
    this.#headerContainer = headerContainer;
    this.#events = [...eventsModel.events];
    this.#eventsModel = eventsModel;
    this.#destinations = [...destinationsModel.destinations];
    this.#offers = [...offersModel.offers];
  }

  init() {
    this.#initialEvents = [...this.#eventsModel.events];
    this.#renderTripInfo();
    this.#renderSort();
    this.#renderTrip();
  }

  get events() {
    return this.#eventsModel.events;
  }

  #renderTrip() {
    if (this.#events.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderList();
      this.#events.forEach((event) => {
        this.#renderEvent(event);
      });
    }
  }

  #renderTripInfo() {
    //Каша какая-то, но ничего более приятного и читаемого я не придумал.
    const getTripTitle = () => {
      let firstDestinationTitle = 'Задайте первую точку маршрута.';
      let middleDestinationTitle = 'Задайте вторую точку маршрута.';
      let endDestinationTitle = '';
      let tripTitle = 'Маршрут не составлен.';
      switch (this.#eventsModel.events.length) {
        case 0:
          break;
        case 1:
          firstDestinationTitle = this.#destinations.find((point) => point.id === this.#eventsModel.events[0].destination).name;

          tripTitle = `${firstDestinationTitle} — Добавьте конечную точку`;
          break;
        case 2:
          firstDestinationTitle = this.#destinations.find((point) => point.id === this.#eventsModel.events[0].destination).name;
          middleDestinationTitle = this.#destinations.find((point) => point.id === this.#eventsModel.events[1].destination).name;

          tripTitle = `${firstDestinationTitle} — ${middleDestinationTitle}`;
          break;
        case 3:
          firstDestinationTitle = this.#destinations.find((point) => point.id === this.#eventsModel.events[0].destination).name;
          middleDestinationTitle = this.#destinations.find((point) => point.id === this.#eventsModel.events[1].destination).name;
          endDestinationTitle = this.#destinations.find((point) => point.id === this.#eventsModel.events[2].destination).name;

          tripTitle = `${firstDestinationTitle} — ${middleDestinationTitle} — ${endDestinationTitle}`;
          break;
        default:
          firstDestinationTitle = this.#destinations.find((point) => point.id === this.#eventsModel.events[0].destination).name;
          endDestinationTitle = this.#destinations.find((point) => point.id === this.#eventsModel.events[this.#events.length - 1].destination).name;

          tripTitle = `${firstDestinationTitle} — … — ${endDestinationTitle}`;
      }
      return tripTitle;
    };

    const headerPresenter = new HeaderPresenter({
      headerContainer: this.#headerContainer,
      tripTitle: getTripTitle(),
      tripDates: this.#eventsModel.getTripDates(),
      tripPrice: this.#eventsModel.getTotalPrice(),
      events: this.#eventsModel.events,
    });

    headerPresenter.init();
  }

  #renderSort() {
    this.#sortComponent = new TripSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#listContainer);
  }

  #renderList() {
    render(this.#listComponent, this.#listContainer);
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#listContainer);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      listComponent: this.#listComponent.element,
      destinations: this.#destinations,
      options: this.#offers,
      onDataUpdate: this.#handleEventUpdate,
      onModeChange: this.#handleModeChange,
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME_DOWN:
        this.#events.sort(compareEventDuration);
        break;
      case SortType.PRICE_DOWN:
        this.#events.sort(compareEventPrice);
        break;
      default:
        this.#events = [...this.#initialEvents];
    }

    this.#currentSortType = sortType;
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventUpdate = (updatedEvent) => {
  /*     this.#events = updateItem(this.#events, updatedEvent);
    this.#initialEvents = updateItem(this.#initialEvents, updatedEvent); */
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderTrip();
  };
}

import { render } from '../framework/render.js';
import TripSortView from '../view/trip-sort-view';
import EmptyListView from '../view/empty-list-view.js';
import EventPresenter from './event-presenter.js';
import EventListView from '../view/event-list-view.js';
import { updateItem } from '../utils/common.js';

export default class TripPresenter {
  #listContainer = null;

  #events = null;
  #destinations = null;
  #offers = null;

  #sortComponent = new TripSortView();
  #emptyListComponent = new EmptyListView();
  #listComponent = new EventListView();

  #eventPresenters = new Map();

  constructor({ listContainer, destinationsModel, offersModel, eventsModel }) {
    this.#listContainer = listContainer;
    this.#events = [...eventsModel.events];
    this.#destinations = [...destinationsModel.destinations];
    this.#offers = [...offersModel.offers];
  }

  init() {
    this.#renderTrip();
  }

  #renderTrip() {
    if (this.#events.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderSort();
      this.#renderList();
      this.#events.forEach((event) => {
        this.#renderEvent(event);
      });
    }
  }

  #handleEventUpdate = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #renderSort() {
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

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };
}

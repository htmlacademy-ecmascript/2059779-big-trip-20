import { render } from '../framework/render.js';
import TripSortView from '../view/trip-sort-view';
import EmptyListView from '../view/empty-list-view.js';
import EventPresenter from './event-presenter.js';
import EventListView from '../view/event-list-view.js';

export default class TripPresenter {
  #listContainer = null;

  #events = null;
  #destinations = null;
  #offers = null;

  #sortComponent = new TripSortView();
  #emptyListComponent = new EmptyListView();
  #listComponent = new EventListView();

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
      options: this.#offers
    });

    eventPresenter.init(event);
  }
}

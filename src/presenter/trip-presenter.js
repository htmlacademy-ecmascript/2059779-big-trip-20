import { render, remove, RenderPosition } from '../framework/render.js';
import TripSortView from '../view/trip-sort-view';
import EmptyListView from '../view/empty-list-view.js';
import EventPresenter from './event-presenter.js';
import EventListView from '../view/event-list-view.js';
import AddNewEventView from '../view/add-new-event-view';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { compareEventPrice, compareEventDuration } from '../utils/sort.js';

export default class TripPresenter {
  #listContainer = null;

  #events = null;
  #destinations = null;
  #offers = null;

  #sortComponent = null;
  #emptyListComponent = new EmptyListView();
  #listComponent = new EventListView();

  #currentSortType = SortType.DEFAULT;
  #initialEvents = [];

  #eventPresenters = new Map();

  constructor({ listContainer, destinationsModel, offersModel, eventsModel }) {
    this.#listContainer = listContainer;
    this.#events = [...eventsModel.events];
    this.#destinations = [...destinationsModel.destinations];
    this.#offers = [...offersModel.offers];
  }

  init() {
    this.#initialEvents = [...this.#events];
    this.#renderSort();
    this.#renderTrip();
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

  #handleEventUpdate = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#initialEvents = updateItem(this.#initialEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

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

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderTrip();
  };

  #renderNewEventForm() {
    const newEventComponent = new AddNewEventView({
      event: this.#events[0],
      destinations: this.#destinations,
      options: this.#offers,
      onFormSubmit: () => {
        removeNewEventComponent.apply(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCancelClick: () => {
        document.removeEventListener('keydown', escKeyDownHandler);
        removeNewEventComponent.apply(this);
      },
    });

    function renderNewEventComponent() {
      render(newEventComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
    }

    function removeNewEventComponent() {
      remove(newEventComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
    }

    render(newEventComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }
}

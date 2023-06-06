import { render } from '../framework/render.js';
import TripSortView from '../view/trip-sort-view';
import EmptyListView from '../view/empty-list-view.js';
import EventPresenter from './event-presenter.js';
import HeaderPresenter from './header-presenter.js';
import EventListView from '../view/event-list-view.js';
import { getTripTitle } from '../utils/common.js';
import { SortType, UserAction, UpdateType } from '../const.js';
import { compareEventPrice, compareEventDuration } from '../utils/sort.js';

export default class TripPresenter {
  #listContainer = null;
  #headerContainer = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #sortComponent = null;
  #emptyListComponent = new EmptyListView();
  #listComponent = new EventListView();

  #currentSortType = SortType.DEFAULT;

  #eventPresenters = new Map();

  constructor({ listContainer, headerContainer, destinationsModel, offersModel, eventsModel }) {
    this.#listContainer = listContainer;
    this.#headerContainer = headerContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventsModel.addObserver(this.#handleModelUpdate);
  }

  init() {
    this.#renderTripInfo();
    this.#renderSort();
    this.#renderTrip();
  }

  get events() {
    switch (this.#currentSortType) {
      case SortType.TIME_DOWN:
        return [...this.#eventsModel.events].sort(compareEventDuration);
      case SortType.PRICE_DOWN:
        return [...this.#eventsModel.events].sort(compareEventPrice);
    }

    return this.#eventsModel.events;
  }

  #renderTrip() {
    if (this.events.length === 0) {
      this.#renderEmptyList();
    } else {
      render(this.#listComponent, this.#listContainer);
      this.events.forEach((event) => {
        this.#renderEvent(event);
      });
    }
  }

  #clearEventList({ resetSortType = false } = {}) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    //Не уверен пока, что мне здесь нужно удалять что-то ещё типа сортировки. Тем более она у меня рисуется не в методе render. Я вообще пока не понял, зачем её удаляют

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderTripInfo() {
    const headerPresenter = new HeaderPresenter({
      headerContainer: this.#headerContainer,
      tripTitle: getTripTitle(this.#eventsModel, this.#destinationsModel.destinations),
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

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#listContainer);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      listComponent: this.#listComponent.element,
      destinations: this.#destinationsModel.destinations,
      options: this.#offersModel.offers,
      onDataUpdate: this.#handleModelUpdate,
      onModeChange: this.#handleModeChange,
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  //И вот в этом месте я понял, что лучше было называть всё point, а не event ;-D
  #handleModelUpdate = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearEventList();
        this.#renderTrip({ resetSortType: true });
        break;
    }
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventList();
    this.#renderTrip();
  };
}

import { remove, render } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { SortType, UserAction, UpdateType, FilterType, TimeLimit } from '../const.js';
import { compareEventPrice, compareEventDuration, compareEventDate } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
import LoadingView from '../view/loading-view.js';
import TripSortView from '../view/trip-sort-view';
import EmptyListView from '../view/empty-list-view.js';
import EventListView from '../view/event-list-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import EventPresenter from './event-presenter.js';
import HeaderPresenter from './header-presenter.js';
import FilterPresenter from './filter-presenter.js';
import NewEventPresenter from './new-event-presenter.js';

export default class TripPresenter {
  #listContainer = null;
  #headerContainer = null;

  #offersModel = null;
  #eventsModel = null;
  #destinationsModel = null;
  #filtersModel = null;

  #sortComponent = null;
  #emptyListComponent = null;
  #listComponent = new EventListView();
  #newEventButtonComponent = new EventListView();
  #loadingComponent = new LoadingView();

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  #eventPresenters = new Map();
  #newEventPresenter = null;

  #isCreating = false;
  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ listContainer, headerContainer, eventsModel, offersModel, destinationsModel, filtersModel }) {
    this.#listContainer = listContainer;
    this.#headerContainer = headerContainer;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filtersModel = filtersModel;
    this.#eventsModel.addObserver(this.#modelUpdateHandler);
    this.#eventsModel.addObserver(this.#createNewPresenter);
    this.#eventsModel.addObserver(this.#createHeaderPresenter);
    this.#filtersModel.addObserver(this.#modelUpdateHandler);
  }

  get events() {
    this.#filterType = this.#filtersModel.filters;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredEvents.sort(compareEventDate);
      case SortType.TIME_DOWN:
        return filteredEvents.sort(compareEventDuration);
      case SortType.PRICE_DOWN:
        return filteredEvents.sort(compareEventPrice);
    }

    return filteredEvents;
  }

  init() {
    //this.#renderTripListInfo();
    this.#renderFilters();
    this.#renderNewEventButton();
    this.#renderTripList();
  }

  createEvent() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init();
  }

  #createNewPresenter = (updateType) => {
    if (updateType === UpdateType.INIT) {
      this.#newEventPresenter = new NewEventPresenter({
        destinations: this.#destinationsModel.destinations,
        options: this.#offersModel.offers,
        listComponent: this.#listComponent.element,
        onDataChange: this.#viewActionHandler,
        onDestroy: this.#newEventFormCloseHandler
      });
    }
  };

  #createHeaderPresenter = (updateType) => {
    if (updateType === UpdateType.INIT) {
      const headerPresenter = new HeaderPresenter({
        headerContainer: this.#headerContainer,
        tripTitle: this.#eventsModel.getTripTitle(),
        tripDates: this.#eventsModel.getTripDates(),
        tripPrice: this.#eventsModel.getTotalPrice(),
      });
      headerPresenter.init();
    }
  };

  #renderTripList() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.events.length === 0 && !this.#isCreating) {
      this.#renderEmptyList();
    } else {
      this.#renderSort();
      render(this.#listComponent, this.#listContainer);
      this.events.forEach((event) => {
        this.#renderEvent(event);
      });
    }
  }

  #clearEventList({ resetSortType = false } = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
  }

  /*   #renderTripListInfo() {
    if (updateType === UpdateType.INIT) {
      const headerPresenter = new HeaderPresenter({
        headerContainer: this.#headerContainer,
        tripTitle: this.#eventsModel.getTripTitle(),
        tripDates: this.#eventsModel.getTripDates(),
        tripPrice: this.#eventsModel.getTotalPrice(),
      });
      headerPresenter.init();
    }
  } */

  #renderEmptyList() {
    this.#emptyListComponent = new EmptyListView({
      filterType: this.#filterType
    });

    render(this.#emptyListComponent, this.#listContainer);
  }

  #renderSort() {
    this.#sortComponent = new TripSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#sortTypeChangeHandler
    });

    render(this.#sortComponent, this.#listContainer);
  }

  #renderFilters() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#headerContainer,
      filtersModel: this.#filtersModel,
      eventsModel: this.#eventsModel,
    });

    filterPresenter.init();
  }

  #renderNewEventButton() {
    this.#newEventButtonComponent = new NewEventButtonView({
      onClick: this.#newEventButtonClickHandler
    });

    render(this.#newEventButtonComponent, this.#headerContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#listContainer);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      listComponent: this.#listComponent.element,
      destinations: this.#destinationsModel.destinations,
      options: this.#offersModel.offers,
      onDataUpdate: this.#viewActionHandler,
      onModeChange: this.#modeChangeHandler,
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #viewActionHandler = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
        } catch {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #modelUpdateHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#renderTripList();
        break;
      case UpdateType.MAJOR:
        this.#clearEventList({ resetSortType: true });
        this.#renderTripList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTripList();
        break;
    }
  };

  #modeChangeHandler = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventList();
    this.#renderTripList();
  };

  #newEventButtonClickHandler = () => {
    this.#isCreating = true;
    this.createEvent();
    this.#newEventButtonComponent.element.disabled = true;
  };

  #newEventFormCloseHandler = () => {
    this.#isCreating = false;
    this.#newEventButtonComponent.element.disabled = false;
  };
}

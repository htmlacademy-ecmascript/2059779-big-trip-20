import { render, replace, remove } from '../framework/render.js';
import TripSortView from '../view/trip-sort-view';
import TripListView from '../view/trip-list-view';
import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import EmptyListView from '../view/empty-list-view.js';

export default class TripPresenter {
  #listContainer = null;

  #events = null;
  #destinations = null;
  #offers = null;

  #sortComponent = new TripSortView();
  #listComponent = new TripListView();

  constructor({ listContainer, destinationsModel, offersModel, eventsModel }) {
    this.#listContainer = listContainer;
    this.#events = [...eventsModel.events];
    this.#destinations = [...destinationsModel.destinations];
    this.#offers = [...offersModel.offers];
  }

  init() {
    this.#renderEventsList();
  }

  #renderEventsList() {
    if (this.#events.length === 0) {
      render(new EmptyListView(), this.#listContainer);
    } else {
      render(this.#sortComponent, this.#listContainer);
    }

    render(this.#listComponent, this.#listContainer);
    this.#events.forEach((event) => {
      this.#renderEvent(event);
    });
  }

  #renderEvent(event) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFromFormToItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventView({
      event,
      onEditClick: () => {
        replaceFromItemToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editEventComponent = new EditEventView(
      {
        event,
        onFormSubmit: () => {
          replaceFromFormToItem();
          document.removeEventListener('keydown', escKeyDownHandler);
        },
        onToggleClick: () => {
          replaceFromFormToItem();
          document.removeEventListener('keydown', escKeyDownHandler);
        },
        onDeleteClick: () => {
          document.removeEventListener('keydown', escKeyDownHandler);
          removeForm();
        },
        destinations: this.#destinations,
        options: this.#offers
      }
    );

    function replaceFromItemToForm() {
      replace(editEventComponent, eventComponent);
    }

    function replaceFromFormToItem() {
      replace(eventComponent, editEventComponent);
    }

    function removeForm() {
      remove(editEventComponent);
    }

    render(eventComponent, this.#listComponent.element);
  }
}

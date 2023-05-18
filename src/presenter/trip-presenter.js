import { render, replace, RenderPosition } from '../framework/render.js';
import TripSortView from '../view/trip-sort-view';
import TripListView from '../view/trip-list-view';
import TripInfoView from '../view/trip-info-view.js';
import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import AddNewEventView from '../view/add-new-event-view';
import AddEventButtonView from '../view/add-new-event-button-view.js';

export default class TripPresenter {
  #headerContainer = null;
  #listContainer = null;
  #events = null;
  #destinations = null;
  #offers = null;
  #addEventButtonComponent = null;

  #sortComponent = new TripSortView();
  #listComponent = new TripListView();
  #headerComponent = new TripInfoView();


  constructor({ headerContainer, listContainer, destinationsModel, offersModel, eventsModel }) {
    this.#headerContainer = headerContainer;
    this.#listContainer = listContainer;
    this.#events = [...eventsModel.events];
    this.#destinations = [...destinationsModel.destinations];
    this.#offers = [...offersModel.offers];
  }

  init() {
    render(this.#headerComponent, this.#headerContainer);
    render(this.#sortComponent, this.#listContainer);
    render(this.#listComponent, this.#listContainer);

    this.#addEventButtonComponent = new AddEventButtonView({
      onClick: this.#handleAddEventButtonClick
    });
    render(this.#addEventButtonComponent, this.#headerComponent.element);

    this.#events.forEach((event) => {
      this.#renderEvent(event);
    });
  }

  #handleAddEventButtonClick = () => {
    render(new AddNewEventView(
      { event: this.#events[0] },
      this.#destinations,
      this.#offers,
    ), this.#listComponent.element, RenderPosition.AFTERBEGIN);
  };

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
        }
      },
      this.#destinations,
      this.#offers,
    );

    function replaceFromItemToForm() {
      replace(editEventComponent, eventComponent);
    }

    function replaceFromFormToItem() {
      replace(eventComponent, editEventComponent);
    }

    render(eventComponent, this.#listComponent.element);
  }
}

import TripInfoView from '../view/trip-info-view.js';
import TripFiltersView from '../view/trip-filters-view';
import { generateFilter } from '../mock/filters';
import { render, remove, RenderPosition } from '../framework/render';
import AddNewEventView from '../view/add-new-event-view';
import AddEventButtonView from '../view/add-new-event-button-view.js';
import TripListView from '../view/trip-list-view';

export default class HeaderPresenter {
  #headerContainer = null;
  #filters = [];

  #events = null;
  #destinations = null;
  #offers = null;
  #totalPrice = null;
  #listComponent = new TripListView();

  constructor({ headerContainer, eventsModel, offersModel, destinationsModel }) {
    this.#headerContainer = headerContainer;
    this.#events = [...eventsModel.events];
    this.#destinations = [...destinationsModel.destinations];
    this.#filters = generateFilter(this.#events);
    this.#offers = [...offersModel.offers];
    this.#totalPrice = eventsModel.getTotalPrice();
  }

  init() {
    render(new TripInfoView({ events: this.#events, totalPrice: this.#totalPrice }), this.#headerContainer);
    render(new TripFiltersView({ filters: this.#filters }), this.#headerContainer);
    this.#renderAddEventButton();
  }

  #renderAddEventButton() {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        document.removeEventListener('keydown', escKeyDownHandler);
        removeNewEventComponent.apply(this);
      }
    };
    //Это всё сломалось и не работает, но я так понимаю, что в следующем блоке научат управлять.
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

    const addEventButtonComponent = new AddEventButtonView({
      onClick: () => {
        renderNewEventComponent.apply(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    render(addEventButtonComponent, this.#headerContainer);
  }
}

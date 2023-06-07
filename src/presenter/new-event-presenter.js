import { remove, render, RenderPosition } from '../framework/render.js';
import NewEventView from '../view/new-event-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewEventPresenter {
  #listContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #events = null;
  #destinations = null;
  #options = null;

  #newEventComponent = null;

  constructor({ listContainer, events, destinations, options, onDataChange, onDestroy }) {
    this.#listContainer = listContainer;
    this.#events = events;
    this.#destinations = destinations;
    this.#options = options;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#newEventComponent !== null) {
      return;
    }

    this.#newEventComponent = new NewEventView({
      event: this.#events,
      destinations: this.#destinations,
      options: this.#options,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#newEventComponent, this.#listContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newEventComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newEventComponent);
    this.#newEventComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (task) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      { id: crypto.randomUUID(), ...task },
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}

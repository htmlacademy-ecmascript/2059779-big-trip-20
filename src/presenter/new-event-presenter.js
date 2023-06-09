import { remove, render, RenderPosition } from '../framework/render.js';
import NewEventView from '../view/new-event-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewEventPresenter {
  #listComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #destinations = null;
  #options = null;

  #newEventComponent = null;

  constructor({ listComponent, destinations, options, onDataChange, onDestroy }) {
    this.#listComponent = listComponent;
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
      destinations: this.#destinations,
      options: this.#options,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onToggleClick: this.#handleDeleteClick
    });

    render(this.#newEventComponent, this.#listComponent, RenderPosition.AFTERBEGIN);

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

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      { id: crypto.randomUUID(), ...event },
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

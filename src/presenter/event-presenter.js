import { render, remove, replace } from '../framework/render.js';
import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';

export default class EventPresenter {
  #listComponent = null;

  #event = null;
  #destinations = null;
  #options = null;

  #eventComponent = null;
  #editEventComponent = null;

  constructor({ listComponent, destinations, options }) {
    this.#listComponent = listComponent;
    this.#destinations = destinations;
    this.#options = options;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#editEventComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      onEditClick: this.#handleToggleClick,
    });

    this.#editEventComponent = new EditEventView(
      {
        event: this.#event,
        onFormSubmit: this.#handleFormSubmit,
        onToggleClick: this.#handleFormSubmit,
        onDeleteClick: this.#handleDeleteClick,
        destinations: this.#destinations,
        options: this.#options,
      }
    );

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#listComponent);
      return;
    }

    if (this.#listComponent.contains(prevEventComponent)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#listComponent.contains(prevEventEditComponent)) {
      replace(this.#editEventComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  #replaceItemToForm() {
    replace(this.#editEventComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToItem() {
    replace(this.#eventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #removeForm() {
    remove(this.#editEventComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToItem();
    }
  };

  #handleFormSubmit = () => {
    this.#replaceFormToItem();
  };

  #handleToggleClick = () => {
    this.#replaceItemToForm();
  };

  #handleDeleteClick = () => {
    this.#removeForm();
  };
}

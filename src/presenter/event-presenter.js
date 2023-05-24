import { render, remove, replace } from '../framework/render.js';
import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';

export default class EventPresenter {
  #listContainer = null;

  #event = null;
  #destinations = null;
  #options = null;

  #eventComponent = null;
  #editEventComponent = null;

  constructor({ listContainer, destinations, options }) {
    this.#listContainer = listContainer;
    this.#destinations = destinations;
    this.#options = options;
  }

  init(event) {
    this.#event = event;

    this.#eventComponent = new EventView({
      event: this.#event,
      onEditClick: this.#handleToggleClick,
    });

    this.#editEventComponent = new EditEventView(
      {
        event: this.#event,
        onFormSubmit: this.#handleFormSubmit,
        onToggleClick: this.#handleToggleClick,
        onDeleteClick: this.#handleDeleteClick,
        destinations: this.#destinations,
        options: this.#options,
      }
    );

    render(this.#eventComponent, this.#listContainer);
  }

  #replaceFromItemToForm() {
    replace(this.#editEventComponent, this.#eventComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFromFormToItem() {
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
      this.#replaceFromFormToItem();
    }
  };

  #handleFormSubmit() {
    this.#replaceFromFormToItem();
  }

  #handleToggleClick() {
    this.#replaceFromItemToForm();
  }

  #handleDeleteClick() {
    this.#removeForm();
  }
}

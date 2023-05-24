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

  #handleDataUpdate = null;

  constructor({ listComponent, destinations, options, onDataUpdate }) {
    this.#listComponent = listComponent;
    this.#destinations = destinations;
    this.#options = options;
    this.#handleDataUpdate = onDataUpdate;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#editEventComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      onEditClick: this.#handleToggleOpen,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editEventComponent = new EditEventView(
      {
        event: this.#event,
        onFormSubmit: this.#handleFormSubmit,
        onToggleClick: this.#handleToggleClose,
        onDeleteClick: this.#handleDeleteClick,
        destinations: this.#destinations,
        options: this.#options,
      }
    );

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#listComponent);
      return;
    }

    if (this.#listComponent.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#listComponent.contains(prevEventEditComponent.element)) {
      replace(this.#editEventComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#editEventComponent);
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

  #handleFormSubmit = (event) => {
    this.#replaceFormToItem();
    this.#handleDataUpdate(event);
  };

  #handleToggleClose = () => {
    this.#replaceFormToItem();
  };

  #handleToggleOpen = () => {
    this.#replaceItemToForm();
  };

  #handleDeleteClick = () => {
    this.#removeForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataUpdate({ ...this.#event, isFavorite: !this.#event.isFavorite });
  };
}

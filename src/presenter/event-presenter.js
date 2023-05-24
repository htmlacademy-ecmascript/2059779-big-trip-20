import { render, remove, replace } from '../framework/render.js';
import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class EventPresenter {
  #listComponent = null;

  #event = null;
  #destinations = null;
  #options = null;
  #mode = Mode.DEFAULT;

  #eventComponent = null;
  #editEventComponent = null;

  #handleDataUpdate = null;
  #handleModeChange = null;

  constructor({ listComponent, destinations, options, onDataUpdate, onModeChange }) {
    this.#listComponent = listComponent;
    this.#destinations = destinations;
    this.#options = options;
    this.#handleDataUpdate = onDataUpdate;
    this.#handleModeChange = onModeChange;
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#editEventComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToItem();
    }
  }

  #replaceItemToForm() {
    replace(this.#editEventComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToItem() {
    replace(this.#eventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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
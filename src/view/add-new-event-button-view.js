import AbstractView from '../framework/view/abstract-view.js';

function createNewEventButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class AddEventButtonView extends AbstractView {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;

    this.element.addEventListener('click', this.#clickHandler, { once: true}); //Временное решение, чтобы не создавать бесконечно много пунктов
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
    this.element.setAttribute('disabled', 'true');
  };
}

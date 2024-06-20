import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerCLick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );

    // Page 1 and there are other pages
    if (this._currentPage === 1 && numPages > 1) {
      return `
        ${this._generateNextButton()}
      `;
    }
    // Last page
    if (this._currentPage === numPages && numPages > 1) {
      return `
        ${this._generatePrevButton()}
      `;
    }
    //Other page
    if (this._currentPage < numPages) {
      return `
        ${this._generatePrevButton()}
        ${this._generateNextButton()}
      `;
    }
    // Page 1 and there NO other pages
    if (this._currentPage === 1 && numPages === 1) {
      return;
    }
  }

  _generateNextButton() {
    return `
      <button class="btn--inline pagination__btn--next"
      data-goto="${this._currentPage + 1}">
        <span>Page ${this._currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
  _generatePrevButton() {
    return `
      <button class="btn--inline pagination__btn--prev" 
      data-goto="${this._currentPage - 1}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._currentPage - 1}</span>
      </button>
    `;
  }
}

export default new PaginationView();

import { getObjects } from "./load-objects.js";
import { createObjectList } from "./createObjectList.js";
import {loadMap, createMarkerList, deleteMarkerList, markerList} from './map.js';

export class Pagination {
    /**
     * @param {HTMLElement} tableWrapper - the wrapper in which the content should be listed
     * @param {HTMLElement} paginationWrapper - the wrapper where the page numbering is inserted
     * @param {Number} firstSite - which page should be displayed first, default "1"
     * @param {Number} rowsPerPage - how many rows to display per page, default "10"
     */
    constructor(deal, tableWrapper, paginationWrapper, firstSite = 1, rowsPerPage = 10) {
        this.table = tableWrapper;
        this.paginationWrapper = paginationWrapper;
        this.firstSiteIndex = Number(firstSite) - 1;
        this.rowsPerPage = rowsPerPage;
        this.pageArray = [];
        this.objects = [];
        this.currentSiteNumberIndex;
        this.deal = deal;

        this.startPagination();
    }

    startPagination() {
        this.pageArray = this.getPageArray();
        if (this.pageArray.length === 0) return;

        this.paginationWrapper.classList.add('pagination-number-wrapper');

        this.buildPagination();
        this.setSite(this.firstSiteIndex, this.objects);
    }

    getPageArray() {
        this.objects = getObjects(this.deal, this.firstSiteIndex, this.rowsPerPage);
        let pageArray = [];
        let site = 0;
        for (let i = 0; i < this.objects.count; i += this.rowsPerPage) {
          if(this.objects.count >= (site + 1) * this.rowsPerPage) {
            pageArray[site] = this.rowsPerPage;
          } else {
            pageArray[site] = this.objects.count - (site * this.rowsPerPage);
          }
          site++;
        }
        return pageArray;
    }

    buildPagination() {
        const previousPageButton = document.createElement('button');
        previousPageButton.innerHTML = '<';
        this.setOpenPreviousPageEvent(previousPageButton);
        previousPageButton.classList.add('prev-button');
        if(this.firstSiteIndex === 0) {
          previousPageButton.classList.add('prev-button--disabled');
        }
        this.paginationWrapper.append(previousPageButton);

        const numberWrapper = document.createElement('div');
        numberWrapper.classList.add('pagination-site-number-wrapper');
        for (let key of this.pageArray.keys()) {
            const siteNumber = key + 1;
            const siteButton = document.createElement('button');
            siteButton.innerHTML = siteNumber;
            siteButton.setAttribute('data-array-index', key);
            siteButton.classList.add(`site-button-${key}`);
            const firstSiteNumberIndex = this.firstSiteIndex;
            if (firstSiteNumberIndex === key) siteButton.classList.add('active');
            this.setOpenSiteEvent(siteButton);

            if (key === this.pageArray.length - 1 && this.pageArray.length >= 4)
                this.buildPaginationPlaceholder(numberWrapper, 'second-pagination-placeholder');
            numberWrapper.append(siteButton);
            if (key === 0 && this.pageArray.length >= 4)
                this.buildPaginationPlaceholder(numberWrapper, 'first-pagination-placeholder');
        }
        this.paginationWrapper.append(numberWrapper);

        const nextPageButton = document.createElement('button');
        nextPageButton.innerHTML = '>';
        this.setOpenNextPageEvent(nextPageButton);
        nextPageButton.classList.add('next-button');
        this.paginationWrapper.append(nextPageButton);
    }

    buildPaginationPlaceholder(numberWrapper, className) {
        const pointsPlaceholderElement = document.createElement('div');
        pointsPlaceholderElement.innerHTML = '\u2026';
        pointsPlaceholderElement.classList.add('pagination-placeholder', className);
        numberWrapper.append(pointsPlaceholderElement);
    }

    setOpenSiteEvent(button) {
        button.addEventListener('pointerdown', () => {
            this.setSite(button.getAttribute('data-array-index'), null);
            this.setButtonStatus();
        });
    }

    setOpenPreviousPageEvent(button) {
        button.addEventListener('pointerdown', () => {
            if (this.currentSiteNumberIndex === 0) return;

            const siteNumberIndex = this.currentSiteNumberIndex - 1;

            this.setSite(siteNumberIndex, null);
            this.setButtonStatus();
        });
    }

    setOpenNextPageEvent(button) {
        button.addEventListener('pointerdown', () => {
            if (this.currentSiteNumberIndex === this.pageArray.length - 1) return;

            const siteNumberIndex = this.currentSiteNumberIndex + 1;
            this.setSite(siteNumberIndex, null);
            this.setButtonStatus();
        });
    }

    setSite(siteNumberIndex, objects) {
        this.currentSiteNumberIndex = Number(siteNumberIndex);
        if(objects && objects.data.length) {
          createObjectList(this.deal, objects.data, this.table);
          if(loadMap && !markerList.length) {
            deleteMarkerList(loadMap);
            createMarkerList(objects.data, loadMap);
          }
        } else {
          this.objects = getObjects(this.deal, this.currentSiteNumberIndex, this.pageArray[this.currentSiteNumberIndex]);
          createObjectList(this.deal, this.objects.data, this.table);
          if(loadMap) {
            deleteMarkerList(loadMap);
            createMarkerList(this.objects.data, loadMap);
          }
        }
        this.displayPaginations();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setButtonStatus() {
        const buttons = this.paginationWrapper.querySelector('.pagination-site-number-wrapper').getElementsByTagName('button');

        Array.from(buttons).forEach((button) => {
            if (Number(button.getAttribute('data-array-index')) === Number(this.currentSiteNumberIndex)) {
                button.classList.add('active');
                return;
            }
            button.classList.remove('active');
        });
        const prevButton = document.querySelector('.prev-button');
        if(Number(this.currentSiteNumberIndex) === 0) {
          prevButton.classList.add('prev-button--disabled');
        } else {
          prevButton.classList.remove('prev-button--disabled');
        }
        const nextButton = document.querySelector('.next-button');
        if(Number(this.currentSiteNumberIndex) === this.pageArray.length - 1) {
          nextButton.classList.add('next-button--disabled');
        } else {
          nextButton.classList.remove('next-button--disabled');
        }
    }

    displayPaginations() {
        const lastPageIndex = this.pageArray.length - 1;
        const buttons = this.paginationWrapper.querySelector('.pagination-site-number-wrapper').getElementsByTagName('button');

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.add('pagination-button-not-displayed');
            if (i === 0 || i === lastPageIndex) buttons[i].classList.remove('pagination-button-not-displayed');
        }

        if (this.paginationWrapper.querySelector(`.site-button-${this.currentSiteNumberIndex - 1}`))
            this.paginationWrapper
                .querySelector(`.site-button-${this.currentSiteNumberIndex - 1}`)
                .classList.remove('pagination-button-not-displayed');
        if (this.currentSiteNumberIndex === lastPageIndex) {
            if (this.paginationWrapper.querySelector(`.site-button-${this.currentSiteNumberIndex - 2}`))
                this.paginationWrapper
                    .querySelector(`.site-button-${this.currentSiteNumberIndex - 2}`)
                    .classList.remove('pagination-button-not-displayed');
            if (this.paginationWrapper.querySelector(`.site-button-${this.currentSiteNumberIndex - 3}`))
                this.paginationWrapper
                    .querySelector(`.site-button-${this.currentSiteNumberIndex - 3}`)
                    .classList.remove('pagination-button-not-displayed');
        }
        if (this.currentSiteNumberIndex === lastPageIndex - 1) {
            if (this.paginationWrapper.querySelector(`.site-button-${this.currentSiteNumberIndex - 2}`))
                this.paginationWrapper
                    .querySelector(`.site-button-${this.currentSiteNumberIndex - 2}`)
                    .classList.remove('pagination-button-not-displayed');
        }

        if (this.paginationWrapper.querySelector(`.site-button-${this.currentSiteNumberIndex}`))
            this.paginationWrapper
                .querySelector(`.site-button-${this.currentSiteNumberIndex}`)
                .classList.remove('pagination-button-not-displayed');

        if (this.paginationWrapper.querySelector(`.site-button-${this.currentSiteNumberIndex + 1}`))
            this.paginationWrapper
                .querySelector(`.site-button-${this.currentSiteNumberIndex + 1}`)
                .classList.remove('pagination-button-not-displayed');
        if (this.currentSiteNumberIndex === 0) {
            if (this.paginationWrapper.querySelector(`.site-button-${this.currentSiteNumberIndex + 2}`))
                this.paginationWrapper
                    .querySelector(`.site-button-${this.currentSiteNumberIndex + 2}`)
                    .classList.remove('pagination-button-not-displayed');
            if (this.paginationWrapper.querySelector(`.site-button-${this.currentSiteNumberIndex + 3}`))
                this.paginationWrapper
                    .querySelector(`.site-button-${this.currentSiteNumberIndex + 3}`)
                    .classList.remove('pagination-button-not-displayed');
        }
        if (this.currentSiteNumberIndex === 1) {
            if (this.paginationWrapper.querySelector(`.site-button-${this.currentSiteNumberIndex + 2}`))
                this.paginationWrapper
                    .querySelector(`.site-button-${this.currentSiteNumberIndex + 2}`)
                    .classList.remove('pagination-button-not-displayed');
        }

        this.setPlaceholder();
    }

    setPlaceholder() {
        if (this.pageArray.length >= 6 && this.currentSiteNumberIndex >= 3 && this.paginationWrapper.querySelector('.first-pagination-placeholder')) {
            this.paginationWrapper.querySelector('.first-pagination-placeholder').classList.add('active');
        } else if (this.paginationWrapper.querySelector('.first-pagination-placeholder')) {
            this.paginationWrapper.querySelector('.first-pagination-placeholder').classList.remove('active');
        }

        const siteNumber = this.currentSiteNumberIndex + 1;
        let currentToLastDifference;
        if (this.pageArray.length >= 6) currentToLastDifference = this.pageArray.length - siteNumber;
        if (
            currentToLastDifference &&
            currentToLastDifference >= 3 &&
            this.paginationWrapper.querySelector('.second-pagination-placeholder')
        ) {
            this.paginationWrapper.querySelector('.second-pagination-placeholder').classList.add('active');
        } else if (this.paginationWrapper.querySelector('.second-pagination-placeholder')) {
            this.paginationWrapper.querySelector('.second-pagination-placeholder').classList.remove('active');
        }
    }
}

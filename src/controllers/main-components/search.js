import $ from 'jquery';
import buildFilter from '../../controllers/filter-block';
import elasticlunr from 'elasticlunr';
import filterGrid from '../../controllers/main-components/filter-grid';
import template from '../../view/templates/index.ejs';
import {getCars} from '../../service/api';
import {getCarById} from '../../service/api';
import '../../../node_modules/@progress/kendo-ui/js/kendo.all';

export default function(params) {
    let foundCars = [];
    let searchInfo = Object.getOwnPropertyNames(params)[0];
    let allCars = getCars();
    const content = template();
    $('#app').html(content);
    buildFilter();

    let index = elasticlunr(function () {
        this.addField('brand');
        this.addField('model');
        this.addField('year');
        this.setRef('id');
    });
    allCars.forEach(function (car) {
        index.addDoc(car);
    });
    const searchResult = index.search(searchInfo);
    searchResult.forEach(function (element, i) {
        let id = element.ref;
        foundCars[i] = getCarById(id);
    });

    filterGrid (foundCars);

    $('#searchInput').on('change', function () {
        let searchValue = $('#searchInput').val();
        document.location.href = `#/search?${searchValue}`;
    });
}
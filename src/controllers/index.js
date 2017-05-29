import $ from 'jquery';
import buildFilter from '../controllers/filter-block';
import template from '../view/templates/index.ejs';
import {getCars} from '../service/api';
import '../../node_modules/@progress/kendo-ui/js/kendo.all';

export default function() {
    const content = template();
    $('#app').html(content);
    buildFilter();
    const allCars = getCars();
    let carsArray;
    allCars.sort(function (current, next) {
        return next.views - current.views;
    });
    if (allCars.length > 20) {
        carsArray = allCars.slice(0, 20);
    }
    else {
        carsArray = allCars;
    }
    carsArray.forEach(function (car) {
       car.price = car.price / 1.8;
    });
    let viewModel = kendo.observable({
        cars: carsArray
    });
    kendo.bind($("#listView"), viewModel);

    $('#searchInput').on('change', function () {
        let searchValue = $('#searchInput').val();
        document.location.href = `#/search?${searchValue}`;
    });
}

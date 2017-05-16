import $ from 'jquery';
import buildFilter from '../controllers/filter-block';
import filtration from '../controllers/filtration';
import template from '../view/templates/index.ejs';
import searchTemplate from '../view/templates/search-results.ejs';
import {getCars} from '../service/api';
import '../../node_modules/@progress/kendo-ui/js/kendo.all';

export default function() {
    const content = template();
    $('#app').html(content);
    buildFilter();
    if (!document.location.search) {
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

        let viewModel = kendo.observable({
            cars: carsArray
        });
        kendo.bind($("#listView"), viewModel);
    }
    else {
        let foundCars = filtration();
        const searchList = searchTemplate({
            cars: foundCars,
            carAmount: foundCars.length
        });
        $('#listView').html(searchList);
        $('.carTr').on('click', function () {
            const id = $(this).attr('id');
            document.location.href = `/car#${id}`;
        });
    }
    $('#searchInput').on('change', function () {
        let searchValue = $('#searchInput').val();
        document.location.href = `/search?${searchValue}`;
    });
}

import $ from 'jquery';
import 'jquery-ui-browserify';
import '../../node_modules/@progress/kendo-ui/js/kendo.all';
import {getCars} from '../service/api';
import filtrate from '../controllers/filtration';
import filterGrid from '../controllers/main-components/filter-grid';
import filtertemplate from '../view/templates/filter.ejs';

export default function() {
    let filterInfo = {};
    let foundCars = [];
    const carsArray = getCars();
    const filter = filtertemplate();
    const filterBlock = $('.filterBlock');
    filterBlock.html(filter);
    let viewModel = kendo.observable({
        cars: carsArray,
        brandValue: "",
        modelValue: "",
        yearValue: [],
        mileageValue: [],
        capacityValue: "",
        transmissionValue: "",
        priceValue: [],
        create: function(e) {
            filterInfo.brand = this.get("brandValue");
            filterInfo.model = this.get("modelValue");
            filterInfo.capacity = this.get("capacityValue");
            filterInfo.transmission = this.get("transmissionValue");
            filterInfo.minMileage = this.get("mileageValue[0]");
            filterInfo.maxMileage = this.get("mileageValue[1]");
            let price = this.get("priceValue");
            filterInfo.minPrice = price[0];
            filterInfo.maxPrice = price[1];
            let year = this.get("yearValue");
            filterInfo.minYear = year[0];
            filterInfo.maxYear = year[1];
            foundCars = filtrate(filterInfo);
            filterGrid (foundCars);
            e.preventDefault();
        },
    });
    kendo.bind($("#filter-block"), viewModel);
}
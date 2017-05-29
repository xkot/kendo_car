import $ from 'jquery';
import {getCars} from '../service/api';

export default function(filterInfo) {
    const filterBlock = $('.filterBlock');
    let foundCars =  getCars();

    console.log(filterInfo);
    if (filterInfo.brand) {
        foundCars = foundCars.filter(function (car) {
            return car.brand.toUpperCase() === filterInfo.brand.toUpperCase();
        });
    }
    if (filterInfo.model) {
        foundCars = foundCars.filter(function (car) {
            return car.model.toUpperCase() === filterInfo.model.toUpperCase();
        });
    }
    if (filterInfo.minPrice) {
        foundCars = foundCars.filter(function (car) {
            return Number(car.price) >= Number(filterInfo.minPrice);
        });
    }
    if (filterInfo.maxPrice) {
        foundCars = foundCars.filter(function (car) {
            return Number(car.price) <= Number(filterInfo.maxPrice);
        });
    }
    if (filterInfo.minYear) {
        foundCars = foundCars.filter(function (car) {
            return Number(car.year) >= Number(filterInfo.minYear);
        });
    }
    if (filterInfo.maxYear) {
        foundCars = foundCars.filter(function (car) {
            return Number(car.year) <= Number(filterInfo.maxYear);
        });
    }

    if (filterInfo.minMileage) {
        foundCars = foundCars.filter(function (car) {
            return Number(car.mileage) >= Number(filterInfo.minMileage);
        });
    }
    if (filterInfo.maxMileage) {
        foundCars = foundCars.filter(function (car) {
            return Number(car.mileage) <= Number(filterInfo.maxMileage);
        });
    }
    if (filterInfo.transmission === true) {
        foundCars = foundCars.filter(function (car) {
            return car.transmission === 'Автомат';
        });
    }
    else if (filterInfo.transmission === false){
        foundCars = foundCars.filter(function (car) {
            return car.transmission === 'Механика';
        });
    }
    return foundCars;
}


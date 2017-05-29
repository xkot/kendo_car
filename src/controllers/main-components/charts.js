import $ from 'jquery';
import template from '../../view/templates/main-components/charts.ejs';
import {getCars} from '../../service/api';

export default function () {
    const content = template();
    $('#app').html(content);
    const cars = getCars();
    const less1995 = cars.filter(function (car) {
        return car.year < 1995;
    });
    const less2000 = cars.filter(function (car) {
        return (car.year >= 1995)&&(car.year < 2000);
    });
    const less2005 = cars.filter(function (car) {
        return (car.year >= 2000)&&(car.year < 2005);
    });
    const less2010 = cars.filter(function (car) {
        return (car.year >= 2005)&&(car.year < 2010);
    });
    const more2010 = cars.filter(function (car) {
        return (car.year >= 2010);
    });
    const carAge = [less1995.length, less2000.length, less2005.length, less2010.length, more2010.length];
    $('#chart1').kendoChart({
        title: {
            text: "Распределение машин по годам выпуска"
        },
        legend: {
            position: "bottom"
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            type: "line",
            style: "smooth"
        },
        series: [{
            name: "Количество машин",
            data: carAge
        }],
        categoryAxis: {
            categories: ["до 1995", "2000", "2005", "2010", "после 2010"],
            majorGridLines: {
                visible: false
            },
            labels: {
                rotation: "auto"
            }
        },
        tooltip: {
            visible: true,
            format: "{0}%",
            template: "#= series.name #: #= value #"
        }
    });
    let popularCars = getCars();
    let popularity = [];
    popularCars.sort(function (a, b) {
        return b.views - a.views;
    });
    popularCars.length = 5;
    popularCars.forEach(function (car) {
        popularity.push({category: car.brand, value: car.views});
    });
    $('#chart2').kendoChart({
        title: {
            text: "ТОП-5 моделей на сайте"
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            labels: {
                visible: true,
                format: "{0}%",
                template: "Просмотры: #= value #"
            }
        },
        series: [{
            type: "pie",
            data: popularity
        }]
    });
    let averagePrice1 = 0;
    let averagePrice2 = 0;
    let averagePrice3 = 0;
    let averagePrice4 = 0;
    let averagePrice5 = 0;
    less1995.forEach(function (car) {
        averagePrice1 += car.price;
    });
    averagePrice1 /= less1995.length;
    less2000.forEach(function (car) {
        averagePrice2 += car.price;
    });
    averagePrice2 /= less2000.length;
    less2005.forEach(function (car) {
        averagePrice3 += car.price;
    });
    averagePrice3 /= less2005.length;
    less2010.forEach(function (car) {
        averagePrice4 += car.price;
    });
    averagePrice4 /= less2010.length;
    more2010.forEach(function (car) {
        averagePrice5 += car.price;
    });
    averagePrice5 /= more2010.length;
    $('#chart3').kendoChart({
        title: {
            text: "Средняя цена по годам выпуска"
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            type: "bar"
        },
        series: [{
            data: [averagePrice1, averagePrice2, averagePrice3, averagePrice4, averagePrice5]
        }],
        valueAxis: {
            max: 45000,
            line: {
                visible: false
            },
            minorGridLines: {
                visible: true
            }
        },
        categoryAxis: {
            categories: ["до 1995", "2000", "2005", "2010", "после 2010"]
        }
    });
}
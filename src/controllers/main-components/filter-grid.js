import $ from 'jquery';
import '../../../node_modules/@progress/kendo-ui/js/kendo.all';

export default function(foundCars) {
    let gridPlace = $('#listView');
    gridPlace.empty();
    gridPlace.css("width", "72%");
    gridPlace.kendoGrid({
        dataSource: foundCars,
        height: 500,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [
            {
                field: "id",
                title: "id",
                visible: false
            },
            {
                field: "brand",
                title: "Марка",
                width: 200
            },
            {
                field: "model",
                title: "Модель",
                width: 150
            },
            {
                field: "mileage",
                title: "Пробег",
                width: 150
            },
            {
                field: "year",
                title: "Год"
            },
            {
                field: "price",
                title: "Цена",
                width: 150
            },
            {
                field: "about",
                title: "Описание",
                width: 150
            },
            {
                field: "photo",
                title: "Фото",
                width: 150,
                sortable: false,
                filterable: false,
                template: "<img width='100px' src='#: photo #'>"
            }
        ]
    });
    gridPlace.on('click', 'tr', function (e) {
        let id = e.currentTarget.firstChild.innerText;
        document.location.href = `#/car/${id}`;
    })
}
import $ from 'jquery';
import template from '../view/templates/admin-main.ejs';
import {findCars} from '../service/api';
import {getCars} from '../service/api';
import {setCars} from '../service/api';
import {setRandom} from '../service/api';
import '../../node_modules/@progress/kendo-ui/js/kendo.grid';
import '../../node_modules/@progress/kendo-ui/js/kendo.all';

export default function() {
    const content = template();
    $('#app').html(content);
    showList();
}

function showList() {
    const contentPlace = $('#grid');
    let carsArray;
    if (findCars()) {
        carsArray = getCars();
        addGrid(carsArray);
    }
    else {
        contentPlace.html('<h4>База машин отсутствует.</h4>');
        contentPlace.append('<button>Заполнить случайными</button>');
        $(document).ready(function () {
            $('button').on('click', setRandom);
        });
    }
}

function addGrid(carsArray) {
    let carNextID = carsArray.length + 1;
    function getIndexById(id) {
        let l = carsArray.length;
        for (let j=0; j < l; j++) {
            if (carsArray[j].carID == id) {
                return j;
            }
        }
        return null;
    }

    $(document).ready(function () {
        let dataSource = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(carsArray);
                    console.log (dataSource);
                },
                create: function (e) {
                    e.data.carID = carNextID++;
                    dataSource.push(e.data);
                    e.success(e.data);
                },
                update: function (e) {
                    carsArray[getIndexById(e.data.carID)] = e.data;
                    e.success();
                },
                destroy: function (e) {
                    carsArray.splice(getIndexById(e.data.carID), 1);
                    e.success();
                }
            },
            error: function (e) {
                alert("Status: " + e.status + "; Error message: " + e.errorThrown);
            },
            pageSize: 10,
            batch: false,
            schema: {
                model: {
                    id: "carID",
                    fields: {
                        carID: { editable: false, nullable: true },
                        brand: { validation: { required: true } },
                        model: { validation: { required: true } },
                        mileage: { type: "number"  },
                        year: { type: "number" },
                        gasoline: { validation: { required: true } },
                        transmission: { validation: { required: true } },
                        capacity: { validation: { required: true } },
                        price: { validation: { required: true } },
                        about: { validation: { required: true } },
                        photo: { validation: { required: true } },
                    }
                }
            }
        });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            filterable: {
                mode: "row"
            },
            pageable: {
                pageSize: 5
            },
            resizable: true,
            reorderable: true,
            columnMenu: true,
            toolbar: ["create"],
            columns: [
                {
                    field: "brand",
                    title: "Марка",
                    width: 200,
                    filterable: {
                        cell: {
                            operator: "contains",
                            suggestionOperator: "contains"
                        }
                    }
                },
                {
                    field: "model",
                    title: "Модель",
                    width: 150,
                    filterable: {
                        cell: {
                            operator: "contains",
                            suggestionOperator: "contains"
                        }
                    }
                },
                {
                    field: "mileage",
                    title: "Пробег",
                    width: 150,
                    filterable: {
                        cell: {
                            showOperators: false
                        }
                    }
                },
                {
                    field: "year",
                    title: "Год",
                    filterable: {
                        cell: {

                        }
                    }
                },
                {
                    field: "gasoline",
                    title: "Тип топлива",
                    width: 150,
                    filterable: {
                        messages: {
                            selectValue: "Дизель"
                        }
                    }
                },
                {
                    field: "transmission",
                    title: "КПП",
                    width: 150,
                    filterable: {
                        cell: {
                            operator: "contains",
                            suggestionOperator: "contains"
                        }
                    }
                },
                {
                    field: "capacity",
                    title: "Объем двигателя",
                    width: 150,
                    filterable: {
                        cell: {
                            operator: "contains",
                            suggestionOperator: "contains"
                        }
                    }
                },
                {
                    field: "price",
                    title: "Цена",
                    width: 150,
                    filterable: {
                        cell: {
                            operator: "contains",
                            suggestionOperator: "contains"
                        }
                    }
                },
                {
                    field: "about",
                    title: "Описание",
                    width: 150,
                    filterable: {
                        cell: {
                            operator: "contains",
                            suggestionOperator: "contains"
                        }
                    }
                },
                {
                    field: "photo",
                    title: "Фото",
                    width: 150,
                    sortable: false,
                    filterable: false,
                    template: "<img width='100px' src='#: photo #'>"
                },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "150px" }
            ],
            editable: "inline"
        });
    });
    return carsArray;
}

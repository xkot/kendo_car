import $ from 'jquery';
import carTemplate from '../../view/templates/main-components/car-view.ejs';
import {getCarById} from '../../service/api';
import {incViews} from '../../service/api';

export default function(id) {
    incViews(id);
    const currentCar = getCarById(id);
    const carView = carTemplate({
        car: currentCar
    });
    $('#app').html(carView);
}
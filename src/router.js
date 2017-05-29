import $ from 'jquery';
import admin from './controllers/admin-main';
import carDetails from './controllers/main-components/car-details';
import index from './controllers/index';
import search from './controllers/main-components/search';
import statistics from './controllers/main-components/charts';

let router = new kendo.Router();

router.route('/admin', admin);
router.route('/car/:id', carDetails);
router.route('/search*', search);
router.route('/statistics', statistics);
router.route('/', index);

$(function() {
    router.start();
    $(document).on('click', 'a', function (e) {
        const href = $(e.currentTarget).attr('href');
        router.navigate(href);
        e.preventDefault();
    });
});





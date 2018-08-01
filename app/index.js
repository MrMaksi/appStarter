import './assets/css/index.scss';
import 'angular';

const app = angular.module("appStarter", []);
const $ = require('jquery');
app.controller('controller', function($scope) {
    $scope.tab = 1;
    $scope.setTab = function(newTab) {
        $scope.tab = newTab;
    };
    $scope.isSet = function(tabNum) {
        return $scope.tab === tabNum;
    };

    $scope.price = {
        model: null,
        availableOptions: [
            {id: 1, label: '1', sale: 0},
            {id: 2, label: '2', sale: 0.1},
            {id: 3, label: '3', sale: 0.2}
        ],
        selectedOption: {id: 1, label: '1', sale: 0},
        totalSumm: 0,
        price: 10,
        promoSale: 0.5

    };
    $scope.regex = 'Test';
    $scope.onLicenseCountChange = function() {
        const price = $scope.price;
        const sale = price.selectedOption.sale;
        const promoSale = price.promoSale;

        let promocode = $scope.promocode;
        let code = 'Test';

        price.totalSumm = price.price - (price.price * sale);
        if (promocode === code) {
            price.totalSumm = price.price - (price.price * price.promoSale)
        } else {
            $scope.errorMsg = 'asdasd'
        }
    };
    $scope.onLicenseCountChange();

    $scope.countries = [
        {
            "id": "1",
            "name": "Australia"
        }, {
            "id": "2",
            "name": "Spain"
        }, {
            "id": "3",
            "name": "Ukraine"
        }, {
            "id": "4",
            "name": "United States"
        }
    ];
    $scope.city = [
        {
            "countryId": 1,
            "name": "Abbotsford"
        }, {
            "countryId": 1,
            "name": "Ballan"
        }, {
            "countryId": 1,
            "name": "Colo Vale"
        }, {
            "countryId": 1,
            "name": "Eagle Farm"
        }, {
            "countryId": 1,
            "name": "Greenbank"
        }, {
            "countryId": 2,
            "name": "Aguilar"
        }, {
            "countryId": 2,
            "name": "Alicante"
        }, {
            "countryId": 2,
            "name": "Aspe"
        }, {
            "countryId": 2,
            "name": "Boiro"
        }, {
            "countryId": 2,
            "name": "Caravaca"
        }, {
            "countryId": 3,
            "name": "Kyiv"
        }, {
            "countryId": 3,
            "name": "Odesa"
        }, {
            "countryId": 3,
            "name": "Poltava"
        }, {
            "countryId": 3,
            "name": "Sumy"
        }, {
            "countryId": 3,
            "name": "Kryvyy Rih"
        }, {
            "countryId": 4,
            "name": "Albert City"
        }, {
            "countryId": 4,
            "name": "Belleville"
        }, {
            "countryId": 4,
            "name": "Deckerville"
        }, {
            "countryId": 4,
            "name": "Flintstone"
        }, {
            "countryId": 4,
            "name": "Jackpot"
        }
    ];
    $scope.updateCountry = function() {
        $scope.availableCity = [];

        angular.forEach($scope.city, function(value) {
            if (value.countryId == $scope.avaliableCountry.id) {
                $scope.availableCity.push(value);
            }
        });
    };
    $scope.toggleClass = false;
});

$(function() {
    $(document)
        .on('click', '.data-link[data-box]', function() {
            const box = $(this).data('box');
            $('body,html').animate({scrollTop: $('#' + box).offset().top}, 800);
        });
});
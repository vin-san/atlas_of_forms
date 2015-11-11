angular.module('atlas')

.directive('integer', function () {
    return {
        require: 'ngModel',
        link: function (scope, ele, attr, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (viewValue === '' || viewValue === null || typeof viewValue === 'undefined') {
                    return null;
                }
                return parseInt(viewValue, 10);
            });
        }
    };
})



.controller('AtlasControl', ['$scope', '$timeout', '$window', function ($scope, $timeout, $window) {

    // init

    $scope.ajax = {};
    $scope.ajax.fragment_length = 400;
    $scope.ajax.atlas_fragment = 1;
    $scope.ajax.atlas_fragments = 0;
    

        
         

    var url = 'https://atlas-of-forms.net/koken/init_atlas.php';
    $.ajax({
        type: 'post',
        url: url,
        dataType: 'json',

        cache: false,
        success: function (data) {
            console.log('init atlas');
            $scope.ajax.atlas_length = data[0].atlas_length;
            $scope.ajax.atlas_fragments = Math.ceil($scope.ajax.atlas_length / $scope.ajax.fragment_length);
        },
        complete: function (data) {
            console.log($scope.ajax);
            $scope.load_atlas($scope.ajax.atlas_fragment);
        },
        error: function (request, status, error) {
            console.log(status);
            console.log(error);
        }
    });



    var $atlas = angular.element('.atlas');
    var $site = angular.element('#atlasofforms');
    var $body = angular.element('body');
    var $zoom = angular.element('.zoom');
    var window_height = window.innerHeight;
    var window_width = window.innerWidth;
    
    if ((window.innerHeight-84)<900){
        angular.element('.init').css("height", window.innerHeight-84);  
    }else{
        angular.element('.init').css("height", "900");  
    }
    

    $dummy = {
        id: '0',
        name: '—',
        value: '',
        status: 'hide'
    };

    $circle = {
        id: '1',
        name: 'circle',
        value: '.circle',
        status: 'show'
    };
    $square = {
        id: '2',
        name: 'square',
        value: '.square',
        status: 'show'
    };
    $triangle = {
        id: '3',
        name: 'triangle',
        value: '.triangle',
        status: 'show'
    };
    $polygon = {
        id: '4',
        name: 'polygone',
        value: '.polygon',
        status: 'show'
    };
    $composite = {
        id: '',
        name: 'composite',
        value: '.composite',
        status: 'show'
    };
    $monolithic = {
        id: '5',
        name: 'monolithic',
        value: '.monolithic',
        status: 'show'
    };
    $mycomorph = {
        id: '6',
        name: 'mycomorph',
        value: '.mycomorph',
        status: 'show'
    };
    $skeleton = {
        id: '7',
        name: 'skeleton',
        value: '.skeleton',
        status: 'show'
    };
    $high = {
        id: '8',
        name: 'high',
        value: '.high',
        status: 'show'
    };
    $small = {
        id: '9',
        name: 'small',
        value: '.small',
        status: 'show'
    };
    $light = {
        id: '10',
        name: 'light',
        value: '.light',
        status: 'show'
    };
    $massive = {
        id: '11',
        name: 'massive',
        value: '.massive',
        status: 'show'
    };
    $chaotic = {
        id: '12',
        name: 'chaotic',
        value: '.chaotic',
        status: 'show'
    };
    $complex = {
        id: '13',
        name: 'complex',
        value: '.complex',
        status: 'show'
    };
    $geometric = {
        id: '14',
        name: 'geometric',
        value: '.geometric',
        status: 'show'
    };
    $mimetic = {
        id: '15',
        name: 'mimetic',
        value: '.mimetic',
        status: 'show'
    };
    $construction = {
        id: '16',
        name: 'construction',
        value: '.construction',
        status: 'show'
    };
    $completed = {
        id: '17',
        name: 'completed',
        value: '.completed',
        status: 'show'
    };
    $decay = {
        id: '18',
        name: 'decay',
        value: '.decay',
        status: 'show'
    };
    $ruin = {
        id: '19',
        name: 'ruin',
        value: '.ruin',
        status: 'show'
    };


    $dummy_form = {
        huge: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    }

    $scope.filters_list = [
		$dummy,
		$circle,
		$square,
		$triangle,
		$polygon,
		$monolithic,
		$mycomorph,
		$skeleton,
		$high,
		$small,
		$light,
		$massive,
		$chaotic,
		$geometric,
		$mimetic,
		$construction,
		$completed,
		$decay,
		$ruin,
	];
    $scope.filters_selected = [
        {
            id: 0,
            selected: $dummy
        },
        {
            id: 1,
            selected: $dummy
        },
        {
            id: 2,
            selected: $dummy
        },
        {
            id: 3,
            selected: $dummy
        }
	];
    $scope.atlas = [];
    $scope.single = $dummy_form;


    // functions

    $scope.load_atlas = function () {
        var url = 'https://atlas-of-forms.net/koken/load_atlas.php';
        $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            data: {
                'fragment': $scope.ajax.atlas_fragment,
                'fragment_size': $scope.ajax.atlas_fragment_length
            },
            cache: false,
            success: function (data) {
                Array.prototype.push.apply($scope.atlas, data);
                console.log('Fragment ' + $scope.ajax.atlas_fragment + ' loaded.');
                $scope.ajax.atlas_fragment++;
            },
            complete: function (data) {
                if ($scope.ajax.atlas_fragment <= $scope.ajax.atlas_fragments) {
                    $timeout(function () {
                        $scope.load_atlas();
                    }, 200);
                } else {

                    console.log('Atlas loaded ' + $scope.atlas.length + ' forms.');
                    console.log($scope.atlas);
                    $scope.$emit('iso-option', {
                        layoutMode: 'fitRows',
                        resizable: false,
                        filter: '.init',
                        transitionDuration: 0,
                        hiddenStyle: {
                            opacity: 0
                        },
                        visibleStyle: {
                            opacity: 1
                        }
                    });
                    $scope.$emit('iso-init', {
                        name: null,
                        params: null
                    });
                    console.log('init isotope');
                    //$timeout(function () {
                        $site.switchClass( "mode_init", "mode_atlas");
                        //$site.removeClass('mode_init').addClass('mode_atlas');
                        //$atlas.css("width", (window_width * 2) - 28);
                    //}, 2000);
                }
            },
            error: function (request, status, error) {
                console.log(status);
                console.log(error);
            }
        });
    };



    $scope.change_filter = function (filter, filter_selected) {
        if (filter.value != "") {
            filter.status = 'hide';
        }
        $scope.filters_list[filter_selected.selected.id].status = 'show';
        $scope.filters_selected[filter_selected.id].selected = filter;

        $scope.ajax.filters_concat = "";
        angular.forEach($scope.filters_selected, function (filter) {
            $scope.ajax.filters_concat += filter.selected.value;
        });

        if ($scope.ajax.filters_concat != "") {
            $scope.$emit('iso-option', {
                filter: $scope.ajax.filters_concat
            });
            $scope.$emit('iso-method', {
                name: 'shuffle',
                params: null
            });
            angular.element('.reset-list').removeClass('mode_reset');
            $zoom.css("display", "block");
        } else {
            $scope.reset();
            $zoom.css("display", "none");
        }
        console.log($scope.ajax.filters_concat);
    };

    $scope.reset = function () {
        $scope.filters_selected = [
            {
                id: 0,
                selected: $dummy
            },
            {
                id: 1,
                selected: $dummy
            },
            {
                id: 2,
                selected: $dummy
            },
            {
                id: 3,
                selected: $dummy
            }
		];
        angular.forEach($scope.filters_list, function (filter) {
            filter.status = 'show';
        });
        $scope.$emit('iso-option', {
            filter: '.reset'
        });
        angular.element('.reset-list').addClass('mode_reset');
    };

    
    
    
    $scope.zoom_in = function (form) {

        
        $scope.single = form;
        
        if ((window.innerHeight-28)<900){
            $zoom.css("height", window.innerHeight);  
        }else{
            $zoom.css("height", "900");  
        }
        
        $zoom.css("z-index", "100"); 
        $body.css("overflow", "hidden");
        
        $timeout(function () {
            $window.scrollTo(0, 0);
            
        }, 200);

        console.log(form.id);
    };

    
    
    
    $scope.zoom_out = function () {
         
       

        $zoom.css("z-index", "0");
        $scope.single = $dummy_form;
        $body.css("overflow", "auto");

       
    };

    
    
    
    

    $scope.about = function () {

        $site.switchClass("mode_atlas", "mode_about");
        //$site.removeClass('mode_atlas').addClass('mode_about');
    };

    $scope.close_about = function () {
        $site.switchClass("mode_about", "mode_atlas");
        //$site.removeClass('mode_about').addClass('mode_atlas');

    };


    // flatten object by concatting values
    function concatFilters(obj) {
        var value = "";
        for (var prop in obj) {
            value += obj[prop]['selected']['value'];
        }
        return value;
    }





}])
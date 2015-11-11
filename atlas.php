<?php
header("Cache-Control: max-age=0");
header("Cache-Control: public", false); 
?>
<!DOCTYPE html>
<html ng-app="atlas">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title></title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width" />

    <meta property="og:url" content="" />
    <meta property="og:type" content="Website" />
    <meta property="og:title" content="" />
    <meta property="og:description" content="" />
    <meta property="og:image" content="" />

    <link rel="stylesheet" href="css/bootstrap_nope.css" />
    <link rel="stylesheet" href="style.css?13" />

    <script src="js/jquery-2.1.4.min.js"></script>
    <script src="js/jquery.isotope.js"></script>
    <script src="http://code.jquery.com/ui/jquery-ui-git.js"></script>
    <script src="js/angular.js"></script>

    <script src="js/angular-isotope.min.js"></script>
    <script src="js/ui-bootstrap-tpls.min.js"></script>
    <script src="js/angular-lazy-img.min.js"></script>
</head>
<body>
    <script type="text/javascript">
        (function() {
            angular.module('atlas', ['ui.bootstrap', 'iso.directives', 'angularLazyImg'])
            .config(['lazyImgConfigProvider', function(lazyImgConfigProvider){
                lazyImgConfigProvider.setOptions({
                offset: 200, // how early you want to load image (default = 100)
                errorClass: 'error', // in case of loading image failure what class should be added (default = null)
                successClass: 'success', // in case of loading image success what class should be added (default = null)
                onError: function(image){}, // function fired on loading error
                onSuccess: function(image){}, // function fired on loading success
            });}])
        })();
    </script>
<div id="atlasofforms" class="mode_init">
    <div ng-controller="AtlasControl">

        <header>
            <div class="header_init">
                <div class="logo">
                    &nbsp;/\__<br>/&nbsp;&nbsp;&nbsp;&nbsp;\
                </div><div class="credits">
                    <p>This is the second version of the Atlas of Forms. It now contains thousands of images and must be loaded for a better navigation. It is therefore necessary to wait a moment.</p>
                </div><div class="about-list">
                    {{(ajax.atlas_fragment-1)*100/ajax.atlas_fragments | number:0}}%
                </div>
            </div><div class="header_atlas">

                <div class="filters">

                    <div dropdown class="filters-list" ng-repeat-start="filter_selected in filters_selected"  ng-if="$first">
                        <a href id="simple-dropdown" dropdown-toggle>{{filter_selected.selected.name}}</a>
                        <ul class="dropdown-menu" aria-labelledby="simple-dropdown">
                            <li ng-repeat="filter in filters_list |  filter:{status:'show'}"><a href ng-click="change_filter(filter, filter_selected)">{{ filter.name }}</a></li>
                        </ul>
                    </div><div dropdown class="filters-list" ng-repeat-end ng-if="!$first" >
                        <a href id="simple-dropdown" dropdown-toggle>{{filter_selected.selected.name}}</a>

                        <ul class="dropdown-menu" aria-labelledby="simple-dropdown">
                            <li ng-repeat="filter in filters_list |  filter:{status:'show'}" ><a href ng-click="change_filter(filter, filter_selected)">{{ filter.name }}</a></li>
                        </ul>
                    </div>
                </div><div class="about-list">
                    <a class="reset reset-list mode_reset" ng-click="reset()">reset</a><button ng-click="about()">about</button><br>
                </div>
               
            </div><div class="header_about">
                <div class="logo">
                    &nbsp;/\__<br>/&nbsp;&nbsp;&nbsp;&nbsp;\
                </div><div class="credits_2">
                    <p>A project by : Eric Tabuchi<br> </p>
                </div><div class="credits_2">
                    <p>If you want to enrich the atlas, send your<br> contributions : contact@atlas-of-forms.net</p>
                </div><div class="about-list">
                    <button ng-click="close_about()">back<br></button>
                </div>
            </div>

        </header>
        <div class="init">
            <img lazy-img="atlas_waiting_room.gif" />
        </div><div isotope-container ng-cloak class="atlas">
            <div isotope-item 
                ng-repeat="form in atlas"
                class="item{{ form.tags }}"
                ng-click="zoom_in(form)" 
                ng-style="{'width': form.ratio*250 +'px'}">
                    <img lazy-img="{{form.medium}}" />
            </div>
        </div><div class="zoom">
            <img ng-src="{{ single.huge }}" ng-click="zoom_out()" />
        </div><div class="about">
            
                 
        </div>
    </div>
</div>
    <script src="app.js?13"></script>
</body>
</html>
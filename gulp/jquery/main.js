require.config({
    baseUrl:'node_modules/',
    paths:{
        'jquery':'jquery/dist/jquery.min',
        'js':'../js'
    }
});
require(['jquery','js/test'],function($,test) {
    console.log($);
    test.one();
});
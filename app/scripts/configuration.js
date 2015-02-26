window.applicationProperties = (function() {
    return {
    	baseUrl: 'http://localhost:8081/expenses-server/rest',
        enableAjaxLogging: true
    };
})();

angular.module( 'Configuration', []).constant('ApplicationProperties', window.applicationProperties);

angular
  .module("thoreauApp", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$urlRouterProvider",
    RouterFunction
  ])
  .factory("ThoreauFactory", [
    "$resource",
    ThoreauFactoryFunction
  ])
  .controller("articlesIndexCtrl", [
    "$state",
    "ThoreauFactory",
    ArticlesIndexControllerFunction
  ])
  .controller("articlesNewCtrl", [
    "$state",
    "ThoreauFactory",
    ArticlesNewControllerFunction
  ])
  .controller("articlesShowCtrl", [
    "$stateParams",
    "$state",
    "ThoreauFactory",
    ArticlesShowControllerFunction
  ])

  function RouterFunction($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("welcome", {
        url: "/",
        templateUrl: "js/ng-views/welcome.html"
      })
      .state("articlesIndex", {
        url: "/articles",
        templateUrl: "js/ng-views/articles/index.html",
        controller: "articlesIndexCtrl",
        controllerAs: "vm"
      })
      .state("articlesNew", {
        url: "/articles/new",
        templateUrl: "js/ng-views/articles/new.html",
        controller: "articlesNewCtrl",
        controllerAs: "vm"
      })
      .state("articlesShow", {
        url: "/articles/:title",
        templateUrl: "js/ng-views/articles/show.html",
        controller: "articlesShowCtrl",
        controllerAs: "vm"
      })
      //activated when a state transition is made and if an invalid url is entered, redirect to the articles list
      $urlRouterProvider.otherwise("articles")
  }

  function ThoreauFactoryFunction($resource) {
    return $resource("api/articles/:title", {}, {
      // definte and require update method
      update: {method: "PUT"}
    })
  }

  function ArticlesIndexControllerFunction($state, ThoreauFactory) {
    // query the API with RESTful methods
    this.articles = ThoreauFactory.query()
  }

  function ArticlesNewControllerFunction($state, ThoreauFactory) {
    this.newArticle = new ThoreauFactory()
    this.create = function() {
      this.newArticle.$save().then(function(article) {
        $state.go("articlesShow", {title: article.title})
      })
    }
  }

  function ArticlesShowControllerFunction($stateParams, $state, ThoreauFactory) {
    this.article = ThoreauFactory.get({title: $stateParams.title})
    this.update = function() {
      this.article.$update({title:$stateParams.title}, (article) => {
        $state.go("articlesShow", {title: article.title})
      })
    }
    this.delete = function() {
      this.article.$delete({title:$stateParams.title}).then(function() {
        $state.go("articlesIndex")
      })
    }
  }

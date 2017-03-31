angular
  .module("thoreauApp", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
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

  function RouterFunction($stateProvider) {
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
        url: "/articles/:name",
        templateUrl: "js/ng-views/articles/show.html",
        controller: "articlesShowCtrl",
        controllerAs: "vm"
      })
  }

  function ThoreauFactoryFunction($resource) {
    return $resource("api/articles/:name", {}, {
      update: {method: "PUT"}
    })
  }

  function ArticlesIndexControllerFunction($state, ThoreauFactory) {
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
      this.article.$delete({name:$stateParams.title}).then(function() {
        $state.go("articlesIndex")
      })
    }
  }

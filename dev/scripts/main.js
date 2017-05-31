var lcboApp = {};

lcboApp.key = "MDplNzZkOGVjYy00NjFiLTExZTctYjY1MC1mNzdhM2JhOTg3OGQ6YUVVRDRXaGZGVmZaT0ZYNHdNRjYwNG8ybGxuSE5mTno2dldF"

lcboApp.getWine = function() {
     $.ajax({
        url: "http://lcboapi.com/products",
        method: "GET",
        dataType: "json",
        data: {
            access_key: lcboApp.key,
            q: "spirits+organic",
            per_page: 100, 
            page: 1
        }
    }).then(function(res){
        let testResults = res.result;
        console.log(testResults)
    })
    };
lcboApp.getStores = function(){
    $.ajax({
       url: "http://lcboapi.com/stores",




    })
}










    lcboApp.init = function(){
        lcboApp.getWine();
    }







    $(function(){
        lcboApp.init();
    })

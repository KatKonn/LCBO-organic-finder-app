
// 1. User selects beer or wine
// 2. On click, arrow button shows for smooth scroll
// 3. Make ajax call to the LCBO API with query of organic and user's choice
// 4. Store returned results as objects in an array 
// 5. Filter for duplicates/incorrect results 
// 6. Store filtered results 
// 7. Take filtered results and display first 5 results append with info, append title, price, and data attribute(product id).
// 8. Append rest of results in second div, display none default. 
// 9. If user clicks display more button, display show rest of results. 
// 10. From results, user will select a single  beer or wine
// 11. Get the product id from user selection
// 12. Make ajax call to store endpoint to get a list of stores that carry product id from user selection
// 13. Get lattitude/longtitude results returned from the ajax call 
// 14. Display pins on map of returned results
// 15. Print directions for user selection
// Google API key: AIzaSyDgkEVqAbyPj6dmtqjP_Djhp-wOLdGA6nw

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
>>>>>>> a4e44a244c4222ced83481e0d850f2bbfc60c323

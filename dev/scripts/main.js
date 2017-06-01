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

lcboApp.getAlc = function(userChoiceBooze) {
     $.ajax({
        url: "http://lcboapi.com/products",
        method: "GET",
        dataType: "json",
        data: {
            access_key: lcboApp.key,
            q: `${userChoiceBooze}+organic`,
            per_page: 100, 
            page: 1
        }
    }).then(function(res){
        let testResults = res.result;
        // console.log(testResults)
        lcboApp.displayAlc(testResults);
    })
    };


 lcboApp.getUserInput = function(){  
    $('.boozeChoiceButton').on('click', function(){
        var userChoiceBooze = $('input[name=alcohol]:checked').val();
        // console.log(userChoiceBooze);
        lcboApp.getAlc(userChoiceBooze);
    })}

// lcboApp.getStores = function(){
//     $.ajax({
//        url: "http://lcboapi.com/stores",
lcboApp.displayAlc = function(item){
    $('.masterContainer').empty();
    var filteredAlc = item.filter(function(alc){
        return alc.image_thumb_url !== null && alc.tags !== "sake" && alc.id !== 84210
    });


    filteredAlc.forEach(function(someObj){
        var alcName = $('<h1>').text(someObj.name);
        var alcImg = $('<img>').attr('src', someObj.image_thumb_url);
        var alcContainer = $('<div>').addClass('alcContainer').append(alcName, alcImg)
        .data('alcid', someObj.id);
        $('.masterContainer').append(alcContainer);
    })
}
lcboApp.getStoresById = function(clickedItem){
        console.log(clickedItem)
         $.ajax({
            url: "http://lcboapi.com/stores",
            method: "GET",
            dataType: "json",
            data: {
                access_key: lcboApp.key,
                product_id: clickedItem,
                per_page: 100, 
                page: 1
            }
         }).then(function(res2){
            let storeResults = res2.result;
            console.log(storeResults)

         })

}
lcboApp.events = function() {
    $('.masterContainer').on('click', '.alcContainer', function(){
        var clickedItem = $(this).data();
        console.log(clickedItem)
        lcboApp.getStoresById(clickedItem.alcid)
    })
}

    lcboApp.init = function(){
        lcboApp.getAlc();
        lcboApp.getUserInput();
        lcboApp.getStoresById();
        lcboApp.events();
    }



    $(function(){
        lcboApp.init();
    })



/*-------Ajax calling filling tables for product listing-------*/ 

  function fetch_data(page){
var id = $('.owner_id').val();
 // id=1;
    var htmlCodes = "";

    $.ajax({
      type: "GET",
      crossDomain: true,
      dataType:'json',
      url:"http://192.168.1.31:8000/view_products/"+id,
      success: function (response) {

          var myObj = response.success;
          console.log(response.success)

          var len = Object.keys(myObj).length;
          var status='';
          var value = 0;
          if(myObj == '')
           { 
            $('.fill-data').html('<tr><td><h3 class="panel-body" style="text-align:center">No Products Found</h3></td></tr>');
           }else{
              for (var i = 0; i <len; i++)
               {
          htmlCodes+='<tr>'+
                '<td><img src="http://192.168.1.31:8000/static/uploads/'+myObj[i].image+'" style="width:70px;height:50px;"/></td>'+
                '<td>'+myObj[i].product_code+'</td>'+
                '<td>'+myObj[i].product_name+'</td>'+
                '<td>'+myObj[i].category+'</td>'+
                '<td>'+myObj[i].unit_price+'</td>'+
                '<td>'+myObj[i].description+'</td>'+
                '<td>'+myObj[i].last_updated+'</td>'+
                '<td class="align_center"><p data-placement="top" data-toggle="tooltip" title="Edit">'+
                '<button class="btn btn-primary btn-xs editProduct" data-title="Edit" data-id="'+myObj[i].product_id+'">'+
                '<i class="fa fa-edit"></i></button></p></td>'+
                '<td class="align_center"><p data-placement="top" data-toggle="tooltip" title="Delete">'+
                '<a class="btn btn-danger openDelt dlt btn-xs" data-title="Delete" data-id="'+myObj[i].product_id+'">'+
                '<i class="fa fa-trash"></i></a></p></td>'+
                '</tr>';
           }
        }
      $('.fill-data').html(htmlCodes);
      paginate(page); //CALLING PAGINATION FUNCTION


      //RE INITIALISE PAGINATION BUTTON
      $('#page-nav').pagination('selectPage', page);

       },
         failure: function (response) {
             alert(" Failed");
         }
     });


   }


   /* ------paginate table function-------*/
  
  function paginate(page){

    // defualt page number is undefined
    if(page == 'undefined'){
        page=1;
    }
    // Grab whatever we need to paginate
    var pageParts = $(".paginated");

    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var perPage = 10;

    // When the document loads we're on page 1
    // So to start with... hide everything else
    pageParts.slice(perPage).hide();
    // Apply simplePagination to our placeholder
    $("#page-nav").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "light-theme",
        currentPage:page,

        // We implement the actual pagination
        //   in this next function. It runs on
        //   the event that a user changes page
        onPageClick: function(pageNum) {
            // Which page parts do we show?
            var start = perPage * (pageNum - 1);
            var end = start + perPage;

            // First hide all page parts
            // Then show those just for our page
            pageParts.hide()
                     .slice(start, end).show();

        }      
    });
  }
  
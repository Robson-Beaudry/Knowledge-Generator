$(document).ready(function(){
  
  var selectionText;
  
  function dropIt() {
      $("#myDropdown").toggle();
  }
  
  function pullItUp(event) {
    if (!event.target.matches('.dropbtn')) {
      $(".menu").css("display", "none");
    }
  }
  
  function categorySelection(){
    selectionText = $(this).text();
    initializeWikiCreation();
  }
  
  function searchBarSelection(){
    selectionText = $("#searchBar").val();
    initializeWikiCreation();
  }
  
  function initializeWikiCreation(){
    var url ="https://en.wikipedia.org/w/api.php?action=opensearch&search=" + selectionText + "&limit=90&format=json&callback=?"; 
   $.ajax({
     type:"GET",
     url:url,
     async:false,
     dataType: "json",
     success:function(data){
       console.log(data[3].length);
       var ranNum = Math.floor(Math.random() * data[3].length);
       console.log(data[3][ranNum]); 
       var mobileLink = data[3][ranNum].replace(/en/,"en.m");
       console.log(mobileLink);
       $("#leFrame").attr("src", mobileLink);
          },
     error:function(){
       alert("Error");
     }   
   
   });

    if ($("#wikiViewer").css("display")=="none"){
      $("#wikiViewer").toggle();
    }
  }
  
  function scrollBetter(){
    var st = $(this).scrollTop();
    if(st + $(window).height() == $(document).height()){
      var curHeight = parseInt($('#leFrame').attr('height'));
      curHeight += 4000;
      curHeight = curHeight.toString();
      console.log(curHeight);
      $('#leFrame').attr('height',curHeight);
      console.log($('#leFrame').attr('height'));
    }
  }

  $(".dropbtn").click(dropIt);
  $(window).click(pullItUp);
  $("a").click(categorySelection);
  $("#confirmButton").click(searchBarSelection);
  $('#searchBar').keypress(function(event){
	  if(event.which == 13){
		  searchBarSelection();
	  }
  });
  $(window).scroll(scrollBetter);
  
});
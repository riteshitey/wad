 $(document).ready(function(){
    console.log("document ready");
        try {
            $.ajax({
                type : "GET",
                url : "files/info.xml",
                dataType : "xml",
                success : parse
            });
        } catch (e) {
            alert(""+console.log("Exception: " + e));
        }
  }); 

  function parse(xml) {

    $(xml).find("person").each(function() {
        //Get name and set name to title
        var name = $(this).children('name').text();
        document.title = name +" - Web CV"
        //Personal info
        $('#title_name').append(name + " - CV")
        $('#name_id').append(name);
        $('#age_id').append($(this).children('age').text());
        $('#address_id').append($(this).children('address').text());
        $('#about_id').append($(this).children('aboutMe').text());
        $('#status_id').append($(this).children('status').text());

        //Creates a divider
        $('#mylist').append('<li data-role="list-divider">Education</li>');

        //Start parsing education data from xml
        $(this).find("education").each(function(){
            $(this).find("school").each(function(){
                createNewEducationListElement($(this).children('name').text(),$(this).children('educationName').text(),$(this).children('duration').text(),$(this).children('more').text());
            });
        });
        //Creates new divider for work experience
        $('#mylist').append('<li data-role="list-divider">Work experience</li>');
        //Start parsing work experience from xml
        $(this).find("experience").each(function(){
              $(this).find("work").each(function(){
                  createNewWorkListElement($(this).children('name').text(),$(this).children('workTitle').text(),$(this).children('duration').text(),$(this).children('more').text());
            });
        });

        //Set about information
        var phone_number = $(this).children('phone').text();

        $("#contact_call").attr("href","tel:+"+ phone_number );
        $("#contact_mail").attr("href","mailto:"+ $(this).children('email').text());
        $("#contact_sms").attr("href","sms:+"+ phone_number);

        $("#contact_info").append($(this).children('contactInfo').text());

         
       // $('#mylist').listview('refresh');
        
    });
}

//Add a education element to the list
function createNewEducationListElement(title,description,duration,moreInfo){
    $('#mylist').append('<li> <a href="about_page#"><h3>'+title+'</h3><p>'+description+'</p><p class="ui-li-aside"><strong>'+duration+'</strong></p> </a>'+createMoreInfoElements(moreInfo) +'</li>');
}
//Add a experience element to the list
function createNewWorkListElement(title,description,duration,moreInfo){
    $('#mylist').append('<li> <a href="about_page#"> <h3>'+title+'</h3><p>'+description+'</p><p class="ui-li-aside"><strong>'+duration+'</strong></p> </a>'+createMoreInfoElements(moreInfo)+'</li>');
}
//Add list element to current element with more information about work or education
function createMoreInfoElements(information){
    return '<ul> <li data-icon="false"><a href="#about_page" style="white-space:normal">'+information+'</a></li> </ul>'
}












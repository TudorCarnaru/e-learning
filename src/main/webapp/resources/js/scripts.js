$(document).ready(function(){
	var grandparent_height = $('.col-md-9').width();
	$('#notes').width( grandparent_height );
	$('#button_notes').click(function(){
		$("#div_notes").fadeToggle(0);
	});
	$("#div_notes").fadeToggle(0);
	var AddTech =  document.getElementById("Language_Selector");
	var AddTechnologyToTopic = document.getElementById("select_tech");
	var AddTechnologyToMaterial = document.getElementById("select_technology");
	
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: "technologies"
	}).then(function (data) {
		for (i of data.content) {
			var technology = document.createElement("option");
			var technology1 = document.createElement("option");
			var technology2 = document.createElement("option");
			
			technology.value = i.content.technology_id;
			technology.innerHTML = i.content.name;
			
			technology1.value = i.content.technology_id;
			technology1.innerHTML = i.content.name;
			
			technology2.value = i.content.technology_id;
			technology2.innerHTML = i.content.name;
			
			if(AddTech)
            {
                AddTech.add(technology);
            }

			
			if(AddTechnologyToTopic){
				AddTechnologyToTopic.add(technology1);
			}
			if(AddTechnologyToMaterial){
				AddTechnologyToMaterial.add(technology2)
			}
		}
	});

	if($("#datepicker1").length > 0) {
		$("#datepicker1").Zebra_DatePicker();
		$("#datepicker2").Zebra_DatePicker();
	}


});
$(window).resize(function(){
	var grandparent_height = $('.col-md-9').width();
	$('#notes').width( grandparent_height );
});




// topics dropdown

$("#select_technology").change(function(){
	var grandparent_height = $('.col-md-9').width();
	$('#notes').width( grandparent_height );
	$('#button_notes').click(function(){
		$("#div_notes").fadeToggle(0);
	});
	$("#div_notes").fadeToggle(0);


	
	var AddTopic = document.getElementById("select_topic");
	while (AddTopic.childElementCount != 0) {
		try {
			AddTopic.removeChild(AddTopic.childNodes[0]);
		}
		catch (e) {

		}
	}
    var Select_Tech = document.getElementById("select_technology").value;
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: "technologies/" + Select_Tech + "/topics"
	}).then(function (data) {
		for (i of data.content) {
			var topic = document.createElement("option");

			topic.value = i.content.topic_id;
			topic.innerHTML = i.content.name;


			AddTopic.add(topic);

		}
	});
});






var carusel = document.getElementById('Carusel');
$(".form-control").change(function() {
	$('#myCarousel').hide();
	var option = document.getElementById('Language_Selector').value;
	var AddTopic = document.getElementById('Topics');
	var material = document.createElement("img");
	$("#material").hide();
	material.src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR8g4PCYI2ssAVPKlJmC9q4T_k84PE7zOHqAWultSDb-BbSy5YfK-5P0I1f";
	material.className="item active";
	material.style.display = " none " ;
	while (carusel.childElementCount != 0) {
		try {
			carusel.removeChild(carusel.childNodes[0]);
		}
		catch (e) {

		}
	}
	carusel.appendChild(material);
	while (AddTopic.childElementCount != 0) {
		try {
			AddTopic.removeChild(AddTopic.childNodes[0]);
		}
		catch (e) {

		}
	}
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: "technologies/" + option + "/topics"
	}).then(function (data) {
		for (i of data.content) {
			var topic = document.createElement("button");
			var topic_id= i.content.topic_id;
			topic.className="btn btn-primary";
			topic.type="button";
			topic.name = i.content.name;
			topic.value = topic_id;
			topic.innerHTML = i.content.name;
			handleelement(topic_id,topic,option);
			AddTopic.appendChild(topic);
		}
	});
});

function handleelement(i,topic,option)
{
	$("#search-container").hide();
	topic.addEventListener("click", function (e) {
		$("#search-container").hide();
		$("#myCarousel").show();
		testFunction(i,option);
		var showMaterial = document.getElementById('material');
		showMaterial.style.display = " none";
		while (carusel.childElementCount != 0) {
			try {
				carusel.removeChild(carusel.childNodes[0]);
			}
			catch (e) {

			}
		}
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: "technologies/" + option + "/topics/" + i + "/materials"
		}).then(function (data) {
			var test=0;
			console.log(data.content.length);
			for(k of data.content) {
				if (test == 0) {
					var carousel = document.getElementById('Carusel');
					var material = document.createElement("img");
					var div = document.createElement("div");
					var type = k.content.type;
					var source = k.content.link;
					div.className = "item active";
					material.name = "material"
					material.innerHTML = " test1";
					if(type==0)
					{
						material.src = k.content.link;
					}
					else
					{
						material.src="http://az186482.vo.msecnd.net/source/i/source/previewNotAvailableLarge.jpg";
					}
					handleMaterial(material,source,type);
					div.appendChild(material);
					carousel.appendChild(div);
				}
				else {
					var carousel = document.getElementById('Carusel');
					var div2 = document.createElement("div");
					var material = document.createElement("img");
					var type = k.content.type;
					var source = k.content.link;
					material.name = "material"
					material.innerHTML = " test1";
					if(type==0)
					{
						material.src = k.content.link;
					}
					else
					{
						material.src="http://az186482.vo.msecnd.net/source/i/source/previewNotAvailableLarge.jpg";
					}
					div2.className = "item ";
					handleMaterial(material,source,type);
					div2.appendChild(material);
					carousel.appendChild(div2);
				}
				test++;
			}
		});
	});
}


function handleMaterial( img, source, type)
{
	console.log(type);
		img.addEventListener("click", function (e) {
			$("#myCarousel").hide();
			$("material").show();
			var showMaterial = document.getElementById('material');
			showMaterial.style.display = " initial";
			showMaterial.removeChild(showMaterial.childNodes[0]);
			if( type==0 )
			{
				var material = document.createElement("img");
				material.name = "material"
				material.innerHTML = " test";
				material.src = source;
				material.oncontextmenu="return false;"
				showMaterial.appendChild(material);
			}
			else if ( type == 1)
			{
				var material = document.createElement("iframe");
				material.width="600";
				material.height="360";
				material.src=source;
				showMaterial.appendChild(material);
				material.oncontextmenu="return false;"
			}
			else if ( type == 2 )
			{
				var material = document.createElement("iframe");
				material.width="1000";
				material.height="600";
				material.src=source;
				showMaterial.appendChild(material);
				material.oncontextmenu="return false;"
			}
			var container = document.getElementById('search-container');
			container.style.display="none ";
		});

}









function openNav() {
	document.getElementById("mySidenav").style.width = "190px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}



function search(){
	$("#myCarousel").hide();
	$("#search-container").show();
	$("#material").hide();
	var search = document.getElementById("search_input").value;
	var search_output = document.getElementById("search-container");
	var type = document.getElementById("Material_type").value;
	var date1 = document.getElementById("datepicker1").value;
	var date2 = document.getElementById("datepicker2").value;
	var contentEd = document.getElementById("content_creator").value;
	var url = "advancedSearchResults?s=" + search + "&type=" + type;
	if(date1.length!=0)
	{
		url = url + "&startDate=" + date1 + "&finishDate=" + date2;
	}
	if(contentEd.length!=0)
	{
		url = url + "&contentEditor=" + contentEd;
	}
	try
	{
		while(search_output.childElementCount!=0)
		{
			search_output.removeChild(search_output.childNodes[0]);
		}
	}
	catch (e)
	{

	}
	console.log(url);
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: url
	}).then(function (data) {
		console.log(data.content.length);
		for (i of data.content) {
			var div = document.createElement("div");
			
			div.className += "search-div-material";
			
			var select = document.createElement("select");
			var lang = document.createElement("option");
			lang.value = i.content.topic.technology.technology_id;

			var topic = document.createElement("option");
			topic.value = i.content.topic.topic_id;

			var material = document.createElement("option");
			material.value = i.content.material_id;
			
			var resultsTitle = document.createElement("h4");
			resultsTitle.value = i.content.topic.technology.name + " > " + i.content.topic.name + " > " + i.content.title;
			
			var text3=document.createTextNode(resultsTitle.value);
			resultsTitle.appendChild(text3);
			
			var resultsDescription = document.createElement("p");
			resultsDescription.value = i.content.description;
			
			var text4=document.createTextNode(resultsDescription.value);
			resultsDescription.appendChild(text4);

			var text=document.createTextNode(lang.value);
			lang.appendChild(text);

			var text1=document.createTextNode(topic.value);
			topic.appendChild(text1);

			var text2=document.createTextNode(material.value);
			material.appendChild(text2);

			select.add(lang);
			select.add(topic);
			select.add(material);
			select.style.display = "none";
			var buton =  document.createElement("button");
			searchResult(buton, lang.value, topic.value, material.value);
			buton.innerHTML= "Get material";
			div.appendChild(select);
			buton.className = "result-search-button";
			
			var str = resultsTitle.innerHTML;
		    var res = str.replace(search, "<span style = 'background-color:yellow'>" + search + "</span>");
		    resultsTitle.innerHTML = res;
		    
		    var str = resultsDescription.innerHTML;
		    var res = str.replace(search, "<span style = 'background-color:yellow'>" + search + "</span>");
		    resultsDescription.innerHTML = res;

			
			div.appendChild(resultsTitle);
			div.appendChild(resultsDescription);

			div.appendChild(buton);
			search_output.appendChild(div);


		}
	});

}

function searchResult(buton, langId, topicId, materialId)
{
	console.log(langId, topicId, materialId);
	buton.addEventListener("click", function(e)
	{
	var materialCont = document.getElementById("material");
	var searchCont = document.getElementById("search-container");
	try
	{
		while(searchCont.childElementCount!=0)
		{
			searchCont.removeChild(searchCont.childNodes[0]);
		}
	}
	catch (e)
	{

	}
	$("myCarousel").show();
	var carusel = document.getElementById('myCarousel');
	carusel.style.display = " block";
	$("material").show();

	var AddTopic = document.getElementById('Topics');
	while (AddTopic.childElementCount != 0) {
		try {
			AddTopic.removeChild(AddTopic.childNodes[0]);
		}
		catch (e) {

		}
	}
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: "technologies/" + langId + "/topics"
	}).then(function (data) {
		for (i of data.content) {
			var topic = document.createElement("button");
			var topic_id= i.content.topic_id;
			topic.className="btn btn-primary";
			topic.type="button";
			topic.name = i.content.name;
			topic.value = topic_id;
			topic.innerHTML = i.content.name;
			handleelement(topic_id,topic,langId);
			AddTopic.appendChild(topic);
		}
	});
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: "technologies/" + langId + "/topics/" + topicId + "/materials/" + materialId
		}).then(function (data) {

		var showMaterial = document.getElementById('material');
		showMaterial.style.display = " initial";
		showMaterial.removeChild(showMaterial.childNodes[0]);
		var type = data.content.type;
		var source = data.content.link;
			if( type==0 )
			{
				var material = document.createElement("img");
				material.name = "material"
				material.innerHTML = " test";
				material.src = source;
				material.oncontextmenu="return false;"
				showMaterial.appendChild(material);
			}
			else if ( type == 1)
			{
				var material = document.createElement("iframe");
				material.width="600";
				material.height="360";
				material.src=source;
				showMaterial.appendChild(material);
				material.oncontextmenu="return false;"
			}
			else if ( type == 2 )
			{
				var material = document.createElement("iframe");
				material.width="1000px";
				material.height="600px";
				material.src=source;
				showMaterial.appendChild(material);
				material.oncontextmenu="return false;"
			}

		$("myCarousel").show();
		var container = document.getElementById('search-container');
		container.style.display="none";
		});

	});

}


function show()
{
	$("#Adv_search").toggle();
	//$("#bttn_search").hide();
}



function searchUser()
{
	var usrdiv = document.getElementById("usr_SearchRestults");
	var type = document.getElementById("User_Type").value;
	var usrName = document.getElementById("usrSearch_input").value;
	var url = "/searchUsers?name=" + usrName;
	if(type!=-1)
	{
		url= url+  "&type=" + type ;
	}
	while (usrdiv.childElementCount != 0) {
		try {
			usrdiv.removeChild(usrdiv.childNodes[0]);
		}
		catch (e) {

		}
	}
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: url
	}).then(function (data) {
		
		for (i of data.content) {
			var tr = document.createElement("tr");
			var usrInfo = document.createElement("th");
			usrInfo.innerHTML = i.content.name;
			tr.appendChild(usrInfo);
			var usrInfo = document.createElement("th");
			usrInfo.innerHTML = i.content.surname;
			tr.appendChild(usrInfo);
			var usrInfo = document.createElement("th");
			usrInfo.innerHTML = i.content.email;
			tr.appendChild(usrInfo);
			var usrInfo = document.createElement("th");
			usrInfo.innerHTML = i.content.user_type;
			tr.appendChild(usrInfo);
			usrdiv.appendChild(tr);
		}
	});

}
function testFunction(topic_id,option)
{
	$("#test_input").unbind("click");
	var testSpace = document.getElementById("testspace");
	$("#test_input").bind("click" , function (e) {
        $("#myCarousel").hide();
        while (testSpace.childElementCount != 0) {
			try {
				testSpace.removeChild(testSpace.childNodes[0]);
			}
			catch (e) {

			}
		}
		$("#testspace").show();
		var url = "technologies/" + option + "/topics/" + topic_id + "/test" ;
		console.log(url);
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: url
		}).then(function (data) {
            var nrofQuestion =0;
			for(i of data.content)
            {
                var nextId=i.content.question.id;
                console.log(nextId,prevId);
                if(nextId!=prevId)
                {
                    nrofQuestion = nrofQuestion + 1;
                    var Question_numbr = document.createElement("p");
                    console.log("Test");
                    var div = document.createElement("div");
                    Question_numbr.innerHTML = "Question " + nrofQuestion;
                    div.appendChild(Question_numbr);
                    var paragraph = document.createElement("p");
                    var questionText = i.content.question.question_text;
                    paragraph.innerHTML = questionText;
                    div.appendChild(paragraph);
                    var questionAnswer = document.createElement("input");
                    questionAnswer.setAttribute('type','checkbox');
                    questionAnswer.name="answer";
                    div1 = document.createElement("div");
                    div1.className="answer_div";
                    div1.appendChild(document.createTextNode(i.content.answer_text));
                    questionAnswer.value=i.content.id;
                    div1.appendChild(questionAnswer);
                    div.appendChild(div1);
                    testSpace.appendChild(div);
                }
                else
                {
                    var questionAnswer = document.createElement("input");
                    questionAnswer.setAttribute('type','checkbox');
                    questionAnswer.name="answer";
                    div1 = document.createElement("div");
                    div1.className="answer_div";
                    div1.appendChild(document.createTextNode(i.content.answer_text));
                    questionAnswer.value=i.content.id;
                    div1.appendChild(questionAnswer);
                    div.appendChild(div1);
                    testSpace.appendChild(div);
                }
                var prevId =i.content.question.id;
            }

		});
	});

    handleButon(option, topic_id);

}




function handleButon(option, topic_id)
{
    $("#answer_button").unbind("click");
    $("#answer_button").bind("click" , function (e) {
        var test="";
        var url = "technologies/" + option + "/topics/" + topic_id + "/selectedAnswers" ;
        $('input[name="answer"]:checked').each(function() {
            test = test + this.value + ",";
        });
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: url
        }).then(function (data) {
        });
    });

}
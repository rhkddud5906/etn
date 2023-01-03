//JQuery 달력 yy-mm
function fnCalendar2(calendarId, focusId){
var defaultDt = $("#"+calendarId).val();
	var dates = $("#"+calendarId).datepicker({
		inline: true, 
		dateFormat: 'yy-mm',
		yearRange: '1900:2100',
		defaultDate: '+1w', //1주일 후
		showButtonPanel: true, //닫기 버튼 보이기
        closeText: '닫기', 
		currentText: '오늘', 
		changeMonth: true,
		changeYear: true,
		showMonthAfterYear: true,
		hideIfNoPrevNext: false,
		numberOfMonths: 1,
		 onClose: function(selectedDate) {
//			$('#fromDate').datepicker("option","minDate", selectedDate); //유효성체크
			$("#"+calendarId).attr("class", "text"); //class를 text로 변경
		 	$("#"+calendarId).unbind();   //
		 	$("#"+focusId).focus();
		}
	});
	$("#"+calendarId).focus(); 
	$('.ui-datepicker-year').focus(); //달력안에 연선택으로 이동
//	$('.ui-datepicker-current').remove(); //달력하단 오늘부분 삭제
}

//JQuery 달력
function fnCalendar1(calendarId, focusId){
	$( "#"+calendarId ).datepicker({ 
	     inline: true, 
	     dateFormat: "yy-mm-dd",    /* 날짜 포맷 */ 
	     prevText: 'prev', 
	     nextText: 'next', 
	     showButtonPanel: true,    /* 버튼 패널 사용 */ 
	     changeMonth: true,        /* 월 선택박스 사용 */ 
	     changeYear: true,        /* 년 선택박스 사용 */ 
	     showOtherMonths: true,    /* 이전/다음 달 일수 보이기 */ 
	     selectOtherMonths: true,    /* 이전/다음 달 일 선택하기 */ 
	     showOn: "button", 
	     minDate: '-30y', 
	     closeText: '닫기', 
	     currentText: '오늘', 
	     showMonthAfterYear: true,        /* 년과 달의 위치 바꾸기 */ 
	     /* 한글화 */ 
	     monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
	     monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
	     dayNames : ['일', '월', '화', '수', '목', '금', '토'],
	     dayNamesShort : ['일', '월', '화', '수', '목', '금', '토'],
	     dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
	     showAnim: 'slideDown', 
	     /* 날짜 유효성 체크 */ 
	     onClose: function( selectedDate ) { 
	         $('#fromDate').datepicker("option","minDate", selectedDate); 
	     } 
	 }); 
}
	
function fnCalendar(calendarId, focusId){
	var defaultDt = $("#"+calendarId).val();
	var dates = $("#"+calendarId).datepicker({
		inline: true, 
		dateFormat: 'yy-mm-dd',
		yearRange: '1900:2100',
		defaultDate: defaultDt, //1주일 후
		showButtonPanel: true, //닫기 버튼 보이기
        closeText: '닫기', 
		currentText: '오늘', 
		changeMonth: true,
		changeYear: true,
		showMonthAfterYear: true,
		hideIfNoPrevNext: false,
		numberOfMonths: 1,
		/* 한글화 */ 
		monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
		monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
		dayNames : ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort : ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
		onClose: function(selectedDate) {
			//$('#fromDate').datepicker("option","minDate", selectedDate); //유효성체크
			$("#"+calendarId).attr("class", "text"); //class를 text로 변경
			$("#"+calendarId).unbind();   //
			$("#"+focusId).focus();
		}
	});
	$("#"+calendarId).focus(); 
	$('.ui-datepicker-year').focus(); //달력안에 연선택으로 이동
	$('.ui-datepicker-current').remove(); //달력하단 오늘부분 삭제
}

//JQuery 달력(기간 제한(180일) 및 주말제외 포함)
function fnCalendarForReservation(calendarId, focusId, days){
	var defaultDt = $("#"+calendarId).val();
	var dates = $("#"+calendarId).datepicker({
		dateFormat: 'yy-mm-dd',
		yearRange: '1900:2100',
		defaultDate: defaultDt,
		showButtonPanel: true, //닫디 버튼 보이기
        closeText: '닫기', 
		currentText: '오늘', 
		changeMonth: true,
		changeYear: true,
		showMonthAfterYear: true,
		hideIfNoPrevNext: false,
		minDate:days+'d', //뒤로 0 일
		maxDate:days+'+180d', //앞으로 180일
		beforeShowDay: noWeekendsOrHolidays,  //주말 제외
		numberOfMonths: 1,
		onClose: function(selectedDate) {
//			$('#fromDate').datepicker("option","minDate", selectedDate); //유효성체크
			$("#"+calendarId).attr("class", "text"); //class를 text로 변경
		 	$("#"+calendarId).unbind();   //
		 	$("#"+focusId).focus();
		}
	});
	$("#"+calendarId).focus();
	$('.ui-datepicker-year').focus(); //달력안에 연선택으로 이동
//	$('.ui-datepicker-current').remove(); //달력하단 오늘부분 삭제
}

//JQuery 달력(기간 제한(오늘날짜 + days 의 날짜 후부터 선택가능))
function fnCalendarForAppointment(calendarId, focusId,days){
	var defaultDt = $("#"+calendarId).val();
	var dates = $("#"+calendarId).datepicker({
		dateFormat: 'yy-mm-dd',
		yearRange: '1900:2100',
		defaultDate: defaultDt,
		showButtonPanel: true, //닫디 버튼 보이기
        closeText: '닫기', 
		currentText: '오늘', 
		changeMonth: true,
		changeYear: true,
		showMonthAfterYear: true,
		hideIfNoPrevNext: false,
		minDate:days+'d', //오늘날짜 + days 날짜부터선택가능(이전은선택안됨)
		numberOfMonths: 1,
		onClose: function(selectedDate) {
//			$('#fromDate').datepicker("option","minDate", selectedDate); //유효성체크
			$("#"+calendarId).attr("class", "text"); //class를 text로 변경
		 	$("#"+calendarId).unbind();   //
		 	$("#"+focusId).focus();
		}
	});
	$("#"+calendarId).focus();
	$('.ui-datepicker-year').focus(); //달력안에 연선택으로 이동
//	$('.ui-datepicker-current').remove(); //달력하단 오늘부분 삭제
}

// 주말(토, 일요일) 선택 막기 
function noWeekendsOrHolidays(date) { 
	var noWeekend = jQuery.datepicker.noWeekends(date); 
	return noWeekend[0] ? [true] : noWeekend;
}

function validDateCheck(validDate,id){
	var dateVal  = validDate.value;
	var len      = dateVal.length;

	//입력한 날짜의 길이가 10자리인지,또는 입력하지않았는지체크
	if(len == 10 || len == 0){
		if(len == 10){
			if(dateVal.substring(4,5) != "-" || dateVal.substring(7,8) != "-"){
				fnAlertOkInit("날짜입력체크","날짜는 2014-01-01 형식으로 입력하세요.","","", id);
				return;				
			}
		}
		
		var year     = dateVal.substring(0,4);
		var month    = dateVal.substring(5,7);
		var day      = dateVal.substring(8,10); 
		
		if(month == "00" || day == "00"){
			fnAlertOkInit("날짜입력체크","날짜는 2014-01-01 형식으로 입력하세요.","","", id);
			return;
		}
		
		// 입력하지 않았을때는 통과
		if(len != 0){ 
			//연,월,일 이 숫자인지 여부체크
			if(isNaN(parseInt(year)) || isNaN(parseInt(month)) || isNaN(parseInt(day))){
				fnAlertOkInit("날짜입력체크","날짜는 2014-01-01 형식으로 입력하세요.","","", id);
				return;
			}
		
			var date =year+month+day;
			
			if(!isValidDate(date,id)){
				return;
			}
		}
	}else if(len == 8){
		if(isNaN(parseInt(dateVal))){
			fnAlertOkInit("날짜입력체크", "날짜는 2014-01-01 또는 <br/>20140101 형식으로 입력하세요.","","", id);
			return;
		}else{
			var year     = dateVal.substring(0,4);
			var month    = dateVal.substring(4,6);
			var day      = dateVal.substring(6,8);
			
			if(month == "00" || day == "00"){
				fnAlertOkInit("날짜입력체크","날짜는 2014-01-01 형식으로 입력하세요.","","", id);
				return;
			}
			
			// 입력하지 않았을때는 통과
			if(len != 0){ 
				//연,월,일 이 숫자인지 여부체크
				if(isNaN(parseInt(year)) || isNaN(parseInt(month)) || isNaN(parseInt(day))){
					fnAlertOkInit("날짜입력체크","날짜는 2014-01-01 형식으로 입력하세요.","","", id);
					return;
				}
			
				var date =year+month+day;
				
				if(!isValidDate(date,id)){
					return;
				}else{
					$("#"+id).val(year + "-" + month + "-" + day);
				}
			}
		}
	}else{
		fnAlertOkInit("날짜입력체크","날짜는 2014-01-01 형식으로 입력하세요.","","", id);
		return;		
	}	
}

//2014-01 형식때문에 새로 만듬.
function validDateCheck2(validDate,id){
	var dateVal  = validDate.value;
	var len      = dateVal.length;
	
	//입력한 날짜의 길이가 7자리인지,또는 입력하지않았는지체크
	if(len == 7 || len == 0){
		if(len == 7){
			if(dateVal.substring(4,5) != "-"){
				fnAlertOkInit("날짜입력체크","날짜는 2014-01 형식으로 입력하세요.","","", id);
				return;				
			}
		}
		
		var year     = dateVal.substring(0,4);
		var month    = dateVal.substring(5,7);
		
		if(month == "00"){
			fnAlertOkInit("날짜입력체크","날짜는 2014-01 형식으로 입력하세요.","","", id);
			return;
		}
		
		// 입력하지 않았을때는 통과
		if(len != 0){ 
			//연,월,일 이 숫자인지 여부체크
			if(isNaN(parseInt(year)) || isNaN(parseInt(month))){
				fnAlertOkInit("날짜입력체크","날짜는 2014-01형식으로 입력하세요.","","", id);
				return;
			}
		
			var date =year+month;
			
			if(!isValidDate2(date,id)){
				return;
			}
		}
	}else if(len == 6){
		if(isNaN(parseInt(dateVal))){
			fnAlertOkInit("날짜입력체크", "날짜는 2014-01 또는 <br/>201401 형식으로 입력하세요.","","", id);
			return;
		}else{
			var year     = dateVal.substring(0,4);
			var month    = dateVal.substring(4,6);
		
			
			if(month == "00"){
				fnAlertOkInit("날짜입력체크","날짜는 2014-01 형식으로 입력하세요.","","", id);
				return;
			}
			
			// 입력하지 않았을때는 통과
			if(len != 0){ 
				//연,월,일 이 숫자인지 여부체크
				if(isNaN(parseInt(year)) || isNaN(parseInt(month))){
					fnAlertOkInit("날짜입력체크","날짜는 2014-01 형식으로 입력하세요.","","", id);
					return;
				}
			
				var date =year+month;
				
				if(!isValidDate2(date,id)){
					return;
				}else{
					$("#"+id).val(year + "-" + month);
				}
			}
		}
	}else{
		fnAlertOkInit("날짜입력체크","날짜는 2014-01 형식으로 입력하세요.","","", id);
		return;		
	}	
}

//날짜 입력 체크
function isValidDate(validDate,id) {
	var flag = true;
	if(isNumber(validDate) == "no") {
		fnAlertOkInit("날짜입력체크","날짜는 2014-01-01 형식으로 입력하세요.","","","");
		flag = false;
	} else {
		if(validDate.length == 8) {
			thismonth = validDate.slice(4,6);
			thisyear = validDate.slice(0,4);
			thisday = validDate.slice(6,8);
			montharray=new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
			// 해당되는 달의 최대 날짜를 배열에서 받는다.
			maxdays=montharray[thismonth-1];
			if (thismonth==2) {
				if ((thisyear/4)!=parseInt(thisyear/4)) maxdays=28;
				else maxdays=29;
			}
			thismonth = "" + thismonth;
			if (thismonth.length == 1) { thismonth = "0" + thismonth;}

			if(parseInt(thismonth) > 12) {
				fnAlertOkInit("날짜입력체크","날짜는 2014-01-01 형식으로 입력하세요.","","", id);
				flag = false;
			} else if(!(parseInt(thisyear) >= 1900 && parseInt(thisyear) <= 2099)) {
				fnAlertOkInit("날짜입력체크","날짜는 2014-01-01 형식으로 입력하세요.","","", id);
				flag = false;
			} else {
				if(parseInt(thisday) > maxdays) {
					fnAlertOkInit("날짜입력체크","날짜는 2014-01-01 형식으로 입력하세요.","","", id);
					flag = false;
				} else {
					flag = true;
				}
			}
		} else {
			fnAlertOkInit("날짜입력체크","날짜는 2014-01-01 형식으로 입력하세요.","","", id);
			flag = false;
		}
	}
		return flag;
}

//날짜 입력 체크
function isValidDate2(validDate,id) {
	var flag = true;
	if(isNumber(validDate) == "no") {
		fnAlertOkInit("날짜입력체크","날짜는 2014-01 형식으로 입력하세요.","","","");
		flag = false;
	} else {
		if(validDate.length == 6) {
			thismonth = validDate.slice(4,6);
			thisyear = validDate.slice(0,4);
			
			thismonth = "" + thismonth;
			if (thismonth.length == 1) { thismonth = "0" + thismonth;}

			if(parseInt(thismonth) > 12) {
				fnAlertOkInit("날짜입력체크","날짜는 2014-01 형식으로 입력하세요.","","", id);
				flag = false;
			} else if(!(parseInt(thisyear) >= 1900 && parseInt(thisyear) <= 2099)) {
				fnAlertOkInit("날짜입력체크","날짜는 2014-01 형식으로 입력하세요.","","", id);
				flag = false;
			} 
			
		} else {
			fnAlertOkInit("날짜입력체크","날짜는 2014-01 형식으로 입력하세요.","","", id);
			flag = false;
		}
	}
		return flag;
}

//오늘날짜 가져오기 (형식 : YYYY-MM-DD)
function todayDate(){
	var currentTime = new Date();
	var month = currentTime.getMonth()+1;
	var day   = currentTime.getDate();
	var year   = currentTime.getFullYear();
	
	if(month <10){
		month = '0'+month;
	}
	if(day <10){
		day = '0'+day;
	}
	
	var today = year + '-' + month+ '-' + day;
	
	return today;
}

// ASTX2  통합 보안 모듈 ++++++++++++++++++++++++++++++++++++++++++

// ASTX2용 SEED를 추가한 값
function GatherValueETE(form, start, bErase){
	
	var strResult = "";
	var value = "";
	var sel=0;
	var i=0;
	
	// 통합보안 설치 확인 안함.

	// 폼 확인
	var len = form.elements.length;
	for (i=start; i<len; i++) {
		try {
			element = form.elements[i];
			
			if(element.name=="") continue;
			if(element.name=="INIpluginData") continue;  // 이전 확장 E2E 무시하게 됨.
			if (!((form.elements[i].type != "button") && (form.elements[i].type != "reset") && (form.elements[i].type != "submit"))) continue;
			if ( ((element.type == "radio") || (element.type == "checkbox")) && (element.checked!=true) ) continue;
			if(element.name.indexOf('_shttp_client_', 0) >= 0) continue;
			if(element.name.indexOf('Encrypted_Client_', 0) >= 0) continue;
			if (element.type == "select-one") {
				sel = element.selectedIndex;
				if(sel<0) continue;  
				value = element.options[sel].value;
				if(bErase) element.selectedIndex = -1;
			} else{
				value = element.value;
				if(bErase) element.value = "";
			}
			if ((element.type == "checkbox") && (bErase)) element.checked = false;
			
			if (strResult!="") strResult += "&";
			if(element.name!=""){
				// TODO URL Encoding  해야 할지 확인 필요함.
				strResult += URLEncode(element.name);
				strResult += "=";
				strResult += URLEncode(value);
			}
		} catch(e) {}
	}
	
	// 화면에 1_ETEExt_SEED_ 가 없을경우 _E2E123_를 삭제한다. 
	// _E2E123_가 있는데 공백으로 넘어가는경우
	if($("input[name=1_ETEExt_SEED_]").val() ==  undefined) {
		strResult = gfnReplace(strResult, "_E2E123_", "");
	}
	
	// _E2E123_가 있고 1_ETEExt_SEED_ 가 없는 경우 1_ETEExt_SEED_ 를 추가해준다.
	if(strResult.indexOf("_E2E123_") != -1 && strResult.indexOf("1_ETEExt_SEED_") == -1) {
		strResult += "&1_ETEExt_SEED_="+URLEncode($("input[name=1_ETEExt_SEED_]").val());
	}

	return strResult;
}

// ASTX2용 개별적으로 묶여있는 데이터에 대해서 URLEncode 을 하고 _ETEExt_SEED_를 자동으로 넣는다.
function GatherValueEach(strFrmData){
	var strResult = "";
	
	var strDatas = strFrmData.split("&");
	for(var i = 0; strDatas.length > i; i++) {
		var strData = strDatas[i].split("=");
		if(i == 0) {
			strResult = strData[0] + "=" + URLEncode(strData[1]);  // TODO URL Encoding  해야 할지 확인 필요함.
		} else {
			strResult += "&" + strData[0] + "=" + URLEncode(strData[1]); // TODO URL Encoding  해야 할지 확인 필요함.
		}
	}

	// 화면에 1_ETEExt_SEED_ 가 없을경우 _E2E123_를 삭제한다. 
	// _E2E123_가 있는데 공백으로 넘어가는경우
	if($("input[name=1_ETEExt_SEED_]").val() ==  undefined) {
		strResult = gfnReplace(strResult, "_E2E123_", "");
	}

	// _E2E123_가 있고 1_ETEExt_SEED_ 가 없는 경우 1_ETEExt_SEED_ 를 추가해준다.
	if(strResult.indexOf("_E2E123_") != -1 && strResult.indexOf("1_ETEExt_SEED_") == -1) {
		strResult += "&1_ETEExt_SEED_="+URLEncode($("input[name=1_ETEExt_SEED_]").val());
	}

	return strResult;
}

//GatherValueETE 와 GatherValueEach 를 합친거
function GatherValueETEEach(form, start, bErase, strFrmData){
	var strResult = "";
	var value = "";
	var sel=0;
	var i=0;

	var len = form.elements.length;
	for (i=start; i<len; i++) {
		try {
			element = form.elements[i];
			
			if(element.name=="") continue;
			if(element.name=="INIpluginData") continue;
			if (!((form.elements[i].type != "button") && (form.elements[i].type != "reset") && (form.elements[i].type != "submit"))) continue;
			if ( ((element.type == "radio") || (element.type == "checkbox")) && (element.checked!=true) ) continue;
			if(element.name.indexOf('_shttp_client_', 0) >= 0) continue;
			if(element.name.indexOf('Encrypted_Client_', 0) >= 0) continue;
			if (element.type == "select-one") {
				sel = element.selectedIndex;
				if(sel<0) continue;  
				value = element.options[sel].value;
				if(bErase) element.selectedIndex = -1;
			} else{
				value = element.value;
				if(bErase) element.value = "";
			}
			if ((element.type == "checkbox") && (bErase)) element.checked = false;
			
			if (strResult!="") strResult += "&";
			if(element.name!=""){
				strResult += URLEncode(element.name);
				strResult += "=";
				strResult += URLEncode(value);
			}
		} catch(e) {}
	}
	var strDatas = strFrmData.substring(1).split("&");
	for(var i = 0; strDatas.length > i; i++) {
		var strData = strDatas[i].split("=");
		strResult += "&" + strData[0] + "=" + URLEncode(strData[1]);
	}
	// 화면에 1_ETEExt_SEED_ 가 없을경우 _E2E123_를 삭제한다. 
	// _E2E123_가 있는데 공백으로 넘어가는경우
	if($("input[name=1_ETEExt_SEED_]").val() ==  undefined) {
		strResult = gfnReplace(strResult, "_E2E123_", "");
	}
	
	// _E2E123_가 있고 1_ETEExt_SEED_ 가 없는 경우 1_ETEExt_SEED_ 를 추가해준다.
	if(strResult.indexOf("_E2E123_") != -1 && strResult.indexOf("1_ETEExt_SEED_") == -1) {
		strResult += "&1_ETEExt_SEED_="+URLEncode($("input[name=1_ETEExt_SEED_]").val());
	}

	return strResult;
}

function EncParams (frm) {
	return frm;
}

function URLEncode(frm) {
	return frm;
}

// END ASTX2  통합 보안 모듈 ++++++++++++++++++++++++++++++++++++++++++
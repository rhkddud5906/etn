/*
* 문자열에서 특정 문자 제거하기
* value가 바꿀 문자열 key가 제거할 문자
*/
function str_replace(value, key) {
	value = String(value);
	var newStr = "";
	for (var i = 0; i < value.length; i++) {
		if (value.charAt(i) != key) {
			newStr += value.charAt(i);
		}
	}
	return newStr;
}

//날짜 - 생성
function setHyphen(date){
	if(date=="" || date==null)return date;
		date = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
	return date;
}
//3자리마다 콤마찍기
function commify(n) {
	if (n == null || n == "") return "0";

	var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
	n += '';                          // 숫자를 문자열로 변환

	while (reg.test(n))
	n = n.replace(reg, '$1' + ',' + '$2');

	return n;
}

//실시간으로 콤마를 찍어주는 펑션
var rgx1 = /\D/g;  // /[^0-9]/g 와 같은 표현
var rgx2 = /(\d+)(\d{3})/;
//이거를 호출하면 된다.
function getNumber(obj,e){
	var strKeyCode;
	if(e == undefined) {
		strKeyCode = window.event.keyCode;
	} else {
		strKeyCode = (e.keyCode ? e.keyCode : e.which);
	}
//	if(window.event.keyCode != 13 ){
	if(strKeyCode != 13){
		var num01;
		var num02;
		num01 = obj.value;
		num02 = num01.replace(rgx1,"");
		num01 = setComma(num02);

	 	if(num01.indexOf("0")==0){
			num01 = num01.replace(num01.indexOf("0"),'');
		}

		obj.value =  num01;
	}else{
		if(jQuery.browser.mozilla == false) {
			window.event.keyCode = 15;
		} else {
		}
	}
}
//위에 종속된거.
function setComma(inNum){
	var outNum;
	outNum = inNum;
	while (rgx2.test(outNum)) {
		outNum = outNum.replace(rgx2, '$1' + ',' + '$2');
	}
	return outNum;
}



//날짜 입력 체크
 function isValidDate(validDate) {
	var flag = true;
	if(isNumber(validDate.value) == "no") {
		gfnAlert("  + 날짜를 입력해주세요.\n");
		flag = false;
	} else {
		if(validDate.value.length == 8) {
			specialDay = document.frm.rday.value;
			thismonth = specialDay.slice(4,6);
			thisyear = specialDay.slice(0,4);
			thisday = specialDay.slice(6,8);
			montharray=new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
			// 해당되는 달의 최대 날짜를 배열에서 받는다.
			maxdays=montharray[thismonth-1];
			if (thismonth==2) {
				if ((thisyear/4)!=parseInt(thisyear/4)) maxdays=28;
				else maxdays=29;
			}
			thismonth = "" + thismonth
			if (thismonth.length == 1) { thismonth = "0" + thismonth;}

			if(parseInt(thismonth) > 12) {
				gfnAlert("  + 정확하지 않은 날짜입력입니다.\n     달이 맞지 않습니다. \n");
				flag = false;
			} else if(!(parseInt(thisyear) >= 1985 && parseInt(thisyear) <= 2099)) {
				gfnAlert("  + 정확하지 않은 날짜입력입니다.\n     년도가 맞지 않습니다. \n");
				flag = false;
			} else {
				if(parseInt(thisday) > maxdays) {
					gfnAlert("  + 정확하지 않은 날짜입력입니다. \n     날짜가 맞지 않습니다. \n");
					flag = false;
				} else {
					//         gfnAlert(' 날짜가 맞습니다.\n');
					flag = true;
				}
			}
		} else {
			gfnAlert("  + 입력날짜는 8자리로 맞춰 주세요.\n");
			flag = false;
		}
	}
	return flag;
}//날짜입력 체크 종속
 function isNumber(num) {
	var valid = "0123456789";
		var ok = "yes";
		var temp;
		for (var i=0; i<num.length; i++) {
			temp = "" + num.substring(i, i+1);
			if (valid.indexOf(temp) == "-1") ok = "no";
		}
	return ok;
}
//숫자만 입력되게 한다.
//숫자만 입력되게 한다. 얼넛 시작시에 0을 못찍는다
function handlerNum(obj) {
	e = window.event;

	if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 35 || e.keyCode == 36 || e.keyCode == 9) {
		if (e.keyCode == 48 || e.keyCode == 96) {
			if (obj.value == "" || obj.value == "0") {
				return true;
			} else {
				return;
			}
		} else {
			return;
		}
	} else {
		return true;
	}
}

//obank_common.js 에 있음
function getCommaNumber(obj,e){
	getNumber(obj,e);
	if(obj.value.length > 23){
		fnAlertOkInit("입력체크","입력값은 18자리가 최대값입니다.","","","");
		obj.value = obj.value.replace(/,/gi,"").substring(0,18);
		getNumber(obj,e);
	}
}	

//숫자만 입력되게 한다.시작할때 0을 찍을수 있다.
function onlyNumber(e){
	var strKeyCode;
	if(e == undefined) {
		strKeyCode = window.event.keyCode;
	} else {
		strKeyCode = (e.keyCode ? e.keyCode : e.which);
	}

	if(((strKeyCode<48)||(strKeyCode>57)) && ((strKeyCode < 96) || (strKeyCode > 105))
			&& (strKeyCode!=8) && (strKeyCode!=46)) {
		if(e == undefined) {
			event.returnValue=false;
		} else {
			e.preventDefault();
		}
	}
}

//숫자만입력되게 한다.(기존 콤마추가되는부분 제외)
function onlyNum(obj){
	var rgx1 = /[^0-9]/g;
	var tmp = obj.value;
	obj.value = tmp.replace(rgx1,"");
}	

//숫자만 입력되게 한다.
function numbersonly(e, decimal) {
	var key;
	var keychar;

	if (window.event) {
		key = window.event.keyCode;
	} else if (e) {
		key = e.which;
	} else {
		return true;
	}
	keychar = String.fromCharCode(key);

	if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) || (key == 27)) {
		return true;
	} else if ((("0123456789").indexOf(keychar) > -1)) {
		return true;
	} else if (decimal && (keychar == ".")) {
		return true;
	} else{
		return false;
	}
}

function checkDate(form) {
	var planStart = form.planStartDate.value;
	var planEnd = form.planEndDate.value;
	// planStart, planEnd 는 yyyy/mm/dd 형식

	planStart = planStart.substring(0, 4) + planStart.substring(5, 7) + planStart.substring(8, 10);
	planEnd = planEnd.substring(0, 4) + planEnd.substring(5, 7) + planEnd.substring(8, 10);
	isValidDate(planStart);
	isValidDate(planEnd);
	planStart = parseInt(planStart);
	planEnd = parseInt(planEnd);

	if (planStart >= planEnd) {
		form.planEndDate.value = '';
		gfnAlert('종료일자는 시작일자보다 이후의 일자를 선택해 주세요.');
	}
}
 function comDate(validDate) {
	var flag = true;

	if(validDate.length == 8) {
		specialDay = validDate;
		thismonth = specialDay.slice(4,6);
		thisyear = specialDay.slice(0,4);
		thisday = specialDay.slice(6,8);
		montharray=new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		// 해당되는 달의 최대 날짜를 배열에서 받는다.
		maxdays=montharray[thismonth-1];
		if (thismonth==2) {
			if ((thisyear/4)!=parseInt(thisyear/4)) maxdays=28;
			else maxdays=29;
		}
		thismonth = "" + thismonth
		if (thismonth.length == 1) { thismonth = "0" + thismonth;}

		if(parseInt(thismonth) > 12) {
			gfnAlert("  + 정확하지 않은 날짜입력입니다.\n     달이 맞지 않습니다. \n");
			flag = false;
		} else if(!(parseInt(thisyear) >= 1985 && parseInt(thisyear) <= 2099)) {
			gfnAlert("  + 정확하지 않은 날짜입력입니다.\n     년도가 맞지 않습니다. \n");
			flag = false;
		} else {
			if(parseInt(thisday) > maxdays) {
				gfnAlert("  + 정확하지 않은 날짜입력입니다. \n     날짜가 맞지 않습니다. \n");
				flag = false;
			} else {
				//         gfnAlert(' 날짜가 맞습니다.\n');
				flag = true;
			}
		}
	} else {
		gfnAlert("  + 입력날짜는 8자리로 맞춰 주세요.\n");
		flag = false;
	}
	return flag;
}//날짜입력 체크 종속

function inputDate(obj){
	var inDate;
	var outDate = "";
	if(obj.value.length < 5){
		if(handlerNum(obj)){
			gfnAlert("숫자만 입력할수 있습니다");
			obj.value="";
			return;
		}
		return;
	}
	if(obj.value.length == 5){
		if(handlerNum(obj)){
			gfnAlert("숫자만 입력할수 있습니다");
			obj.value="";
			return;
		}
		obj.value = obj.value.substring(0,4) + "-" + obj.value.substring(4,5);
	}
	inDate = str_replace(obj.value,"-");

		if(isNaN(inDate)){
			handlerNum("숫자만 입력할수 있습니다");
			obj.value="";
			return;
		}
	inDate = obj.value.split("-");

	for(var i = 0 ; inDate.length > i ; i ++){
		outDate += inDate[i];
	}
	if(outDate.length > 8 ){
		outDate = outDate.substring(0,8);
	}
	if(outDate.length > 7 ){
		comDate(outDate);
	}
	if(outDate.length > 4 && outDate.length < 7){
		obj.value = outDate.substring(0,4) + "-" + outDate.slice(4);
		return;
	}else if( outDate.length > 6 ){
		obj.value = outDate.substring(0,4) + "-" + outDate.substring(4,6) + "-" + outDate.slice(6);
		return;
	}
	obj.value = outDate;
}

//숫자 포맷 지정 ex ) fixNumberScale(10.123456 , 3) -> 10.123
function fixNumberScale(num, scale) {
	var val = Number(num);
	var cal = val.toFixed(scale);
	return cal;
}
//비율이 .xxx로 넘어올때 앞에 0 붙여주기
function addZero(val){
	if(val.substring(0,1) == "."){
		val = "0"+val;
		return val;
	}
	return val;
}
//셀렉트 박스 변동시 계좌명 변경
function gubunChange(){
	var index = $("select[name='account'] option:selected").index();
	if(index == -1) index = $("select[name='acno'] option:selected").index();
	var gubun = $("input[name='gubun']").eq(index).val();
	$("input[name='acnt']").val(gubun);
}
//소숫점이 있을때 소수점 놔두고 뒤에 , 찍기
//commifyRatio(val)
function commifyRatio(val){

	var aa = val.split(".");
	var bb = commify(aa[0]);
	return bb+"."+aa[1];
}

function delZero(val){
	val = (typeof(val)==="string"?val:val+"");
	var size = val.length;
	if(val.indexOf(".") == -1){
		return val;
	}
	for(var i = 0 ; i <= size ;size--){2
		if(val.substring(size-1 , size)=="0"){
			val = val.substring(0 , size-1);
		}else if(val.substring(size-1 , size)=="."){
			val = val.substring(0 , size-1);
			return val;
		}else{
			return val;
		}
	}
}

function nullZero(val){
	var num;
	num = val.split(".");
	if(val  == ""){
		val = 0;
		return val;
	}
	else if(num[0] == "" && num[1] != "")
	{
		return "0."+num[1];
	}
	return val;
}
function pwdChk(val){
	if(val== "" ){
		alert("비밀번호를 입력하셔야 합니다.");
		return false;
	}
	return true;
}

$(document).ready(function(){

	$(document).bind("contextmenu", function(e) { return false; });
	//드래그 막음 - 이재화
	//$(document).bind('selectstart',function() {return false;});
	$(document).bind('dragstart',function(){return false;});
	$('input[name=acntPwd]').bind('keyup',function(e){
		if( e.which == 13){
			$("a#btnSearch").click();
			return false;
		}
	});
	$('input[name=pwd]').bind('keyup',function(e){
		if( e.which == 13){
			$("a#btnSearch").click();
		}
	});
	$("#commClose").click(function() {
		$.modal.impl.close();
	});
	$("#commSubPopClose").click(function() {
		$.modal.impl.close();
	});

	//본문 모드일때
	if($("div#sideContent").text() == "") { $("div#sideContent").css("background",""); }

	/*
	try{
		if(STR_PARAMS!=undefined){
			// a, area tag post 전송
			$("a, area").click(function(event){		
				var str_href = $(this).attr("href")||"";
				if(gfnNvl(str_href.replace("#",""))!="" && str_href.indexOf("?")>-1 && str_href.replace("#","")!="none" && str_href.indexOf("#")==-1 && (str_href.toLowerCase()).indexOf("javascript:")==-1){
					event.preventDefault();			
					$(this).submitPost();
				}
				return true;
			});
		}else{
			window['STR_PARAMS']="";
		}
	}catch(e){trace("[load] "+e.message);window['STR_PARAMS']="";}
	*/
});

//얼럿창 정의
function gfnAlert(msg) {
	alert(msg);
}

//단수처리
function gfnSetFtam(val) {

	if ( (val == null) || (val == "") ) {
		return 0;
	}

	if (val.length > 0) {
		if (val.substring(0,1) == ".") {
			return 0;
		}
	}

	val = delZero(val);

	return gfnParseInt(val);

}

/* ----------------------------------------------------------------------------
* 특정 날짜에 대해 지정한 값만큼 가감(+-)한 날짜를 반환
* 입력 파라미터 -----
* pInterval : "yyyy" 는 연도 가감, "m" 은 월 가감, "d" 는 일 가감
* pAddVal  : 가감 하고자 하는 값 (정수형)
* pYyyymmdd : 가감의 기준이 되는 날짜
* pDelimiter : pYyyymmdd 값에 사용된 구분자를 설정 (없으면 "" 입력)
* 반환값 ----
* yyyymmdd 또는 함수 입력시 지정된 구분자를 가지는 yyyy?mm?dd 값
* 사용예 ---
* 2012-01-01 에 3 일 더하기 ==> gfnAddDate("d", 3, "2012-01-01", "-");
* 20120101 에 8 개월 더하기 ==> gfnAddDate("m", 8, "20120101", "");
--------------------------------------------------------------------------- */
function gfnAddDate(pInterval, pAddVal, pYyyymmdd, pDelimiter) {
	var yyyy;
	var mm;
	var dd;
	var cDate;
	var cYear, cMonth, cDay;

	if (pDelimiter != "") {
		pYyyymmdd = pYyyymmdd.replace(eval("/\\" + pDelimiter + "/g"), "");
	}

	yyyy = pYyyymmdd.substr(0, 4);
	mm  = pYyyymmdd.substr(4, 2);
	dd  = pYyyymmdd.substr(6, 2);

	if (pInterval == "yyyy") {
		yyyy = (yyyy * 1) + (pAddVal * 1);
	} else if (pInterval == "m") {
		mm  = (mm * 1) + (pAddVal * 1);
	} else if (pInterval == "d") {
		dd  = (dd * 1) + (pAddVal * 1);
	}

	cDate = new Date(yyyy, mm - 1, dd); // 12월, 31일을 초과하는 입력값에 대해 자동으로 계산된 날짜가 만들어짐.
	cYear = cDate.getFullYear();
	cMonth = cDate.getMonth() + 1;
	cDay = cDate.getDate();

	cMonth = cMonth < 10 ? "0" + cMonth : cMonth;
	cDay = cDay < 10 ? "0" + cDay : cDay;

	if (pDelimiter != "") {
		return cYear + pDelimiter + cMonth + pDelimiter + cDay;
	} else {
		return cYear.toString() + cMonth.toString() + cDay.toString();
	}
}

//문자를 숫자로 변환
function gfnParseInt(val) {
	if (val == null || val =="") {
		return 0;
	}
	val = str_replace(val, ",");
	val = str_replace(val, "-");

	if (isNaN(parseInt(val))) {
		return 0;
	}
	return parseInt(val);
}


//문자를 숫자로 변환. - 값 유지
function gfnSignedParseInt(val) {
	if (val == null || val =="") {
		return 0;
	}
	val = str_replace(val, ",");

	if (isNaN(parseInt(val))) {
		return 0;
	}
	return parseInt(val);
}

// 소수점 이하 처리
function CutDecimalPoint(intTarget, intCutPosition) {
	//1234.567890
	//. 뒤에 2자리만 남기고 자르겠다.  . index +2

    var intResult = "";
    var strTarget = String(intTarget).split('.');

    if(intCutPosition == 0) { return strTarget[0]; }

    if(strTarget[1]!=null && strTarget[1].length >= intCutPosition) {
        strTarget[1] = strTarget[1].slice(0, intCutPosition);
    }else if(strTarget[1]!=null && strTarget[1].length < intCutPosition) {
        strTarget[1] = strTarget[1];
    }else{
        strTarget[1] = "00";
    }
    
    if (strTarget[0]==null || strTarget[0]=="") strTarget[0] = "0";
    else strTarget[0] = commify(strTarget[0]);

    intResult = strTarget[0]+'.'+strTarget[1];
    return intResult;
}


//숫자만 입력
function gfnCheckInputNumber(textId){
	$("#" + textId).keyup( function(e) {
		if ($(this).val().match(/[^0-9]/g) != null) {
			$(this).val( $(this).val().replace(/[^0-9]/g, '') );
		}
	});
}

//영어숫자만 입력
function gfnCheckInputEng(textId){
	$("#" + textId).keyup( function(e) {

		if ($(this).val().match(/[^^a-zA-Z0-9.]/g) != null) {
			$(this).val( $(this).val().replace(/[^a-zA-Z0-9]/g, '') );
		}
	});
}

//이메일 입력
function gfnCheckInputEmail(textId){
	$("#" + textId).keyup( function(e) {

		if ($(this).val().match(/[^^a-zA-Z0-9._-]/g) != null) {
			$(this).val( $(this).val().replace(/[^a-zA-Z0-9._-]/g, '') );
		}
	});
}


//이메일 주소체크
function gfnMailAddressChk(str) {
	var mailV   = str;
	var mailA   = mailV.indexOf("@",0);
	var mailD   = mailV.indexOf(".",mailA);

	if(gfnTrim(str).length == 0) return true;

	if(mailA <= 0 || mailD <= 0) {
		return false;
	}

	return true;
}



//금액만 입력
function gfnCheckInputMoney(textId){
	$("#" + textId).keyup( function(e) {
		if ($(this).val().match(/[^0-9]/g) != null) {
			$(this).val( $(this).val().replace(/[^0-9]/g, '') );
		}
		$("#" + textId).val( gfnMoneyAddComma($("#" + textId).val()));
	});
}

//숫자금액 한글변환
function gfnMoneyToHangul(textId, returnId) {
	var val = $("#" + textId).val();

	val = gfnRemoveComma(val);
	val = gfnRemoveFirstZero(val);

	var num = "";
	var won = new Array;

	re = /[^0-9]+/g;
	num = val.toString();

	if(!val) {
		$("#" + returnId).html("");
		$("#" + textId).val("");
		return;
	}
	if(re.exec(num)) {
		$("#" + returnId).html("");
		$("#" + textId).val("");
		return;
	}
	if(num.substr(0,1) == 0) {
		$("#" + returnId).html("");
		$("#" + textId).val("");
		return;
	}

	var price_unit0 = new Array("","일","이","삼","사","오","육","칠","팔","구");
	var price_unit1 = new Array("","십","백","천");
	var price_unit2 = new Array("만","억","조","경","해");

	for(var i=0; i <= num.length-1;i++){
		won[i] = price_unit0[num.substr(i,1)];
	}
	won = won.reverse();
	for(var i=0;i<=num.length-1;i++){
		if(i>0 && won[i]!="") {
			won[i] += price_unit1[i%4];
		}
	}
	for(i=4;i<=won.length-1;i=i+4) {
		won[i] += price_unit2[(i/4-1)];
	}
	for(var i=0;i<=num.length-1;i++){
		if(i%4 > 0) {
			won[i]=won[i].replace("일","");
		}
	}
    won = won.reverse();
    won = won.join("");
    won = gfnReplace(won, "억만","억");

	$("#" + returnId).html(won + "원");
	$("#" + textId).val( gfnMoneyAddComma($("#" + textId).val() ) );
}

//숫자금액추가
function gfnPlusMoney(money, textId) {
	var val = $("#" + textId).val();

	val = gfnRemoveComma(val);
	val = gfnRemoveFirstZero(val);

	if (val == "") val = "0";
	val = (eval(val) + money) + "";
	
	if(val.substring(0, 1) == "0") val = val.substring(1);

	$("#" + textId).val( gfnMoneyAddComma( val ) );
}

//인풋 박스 포커스시 셀렉트
function gfnFocusSelect(textId) {
	$('#' + textId).focus(function(){
		$(this).select();
	});
}



//trim ---------------------------------------------------------------------
function gfnTrim(str) {
	if (str==null) str="";
	return gfnRTrim(gfnLTrim(str));
}

//왼쪽 trim ----------------------------------------------------------------
function gfnLTrim(str) {
	var resultText = "";

	for(var i=0; i<str.length; i++) {
		if(str.substring(i, i+1) != " ") {
			resultText = str.substring(i, str.length);
			break;
		}
	}
	return resultText;
}

// 오른쪽 trim --------------------------------------------------------------
function gfnRTrim(str) {
	var resultText = "";
	for(var i = str.length; i>0; i--) {
		if(str.substring(i-1, i) != " ") {
			resultText = str.substring(0, i);
			break;
		}
	}
	return resultText;
}


//인풋텍스트 금액에 콤마추가
function gfnMoneyAddComma(str) {
	var signed = "";
	var remain = "";
	var resultText = "";

	str = gfnRemoveComma(str);
	if(gfnDigitCheck(str) == false) {
		$("#" + textId).val(str);
		return;
	}

	if(str.length > 0) {
		if( str.substring(0, 1) == "-" ) {
			signed = "-";
			str = str.substring(1);
		}
		remain = str.length % 3;
		for(var i = 0; i < str.length; i++) {
			var ch = str.charAt(i);
			for(var k = 0; k < str.length/3; k++) {
				if(i == remain + 3 * k && i != 0) resultText = resultText + ",";
			}
			resultText = resultText + ch;
		}
		return signed + resultText;
	}

}

// ',' 제거 -----------------------------------------------------------------
function gfnRemoveComma(str) {
	var resultText = "";
	for(var i = 0; i < str.length; i++) {
		var ch = str.charAt(i);
		if(ch != ',') resultText = resultText + ch;
   }
	return resultText;
}

//0 입력시 0
function gfnRemoveFirstZero(str) {
	if (str.length > 1) {
		while (str.substring(0, 1) == '0' || str.substring(0, 1) == ',') {
			str = str.substring(1, str.length);
		}
	}
	return str;
}

//숫자여부 체크 ------------------------------------------------------------
function gfnDigitCheck(str) {
	if(gfnTrim(str).length == 0) return true;

	str = gfnTrim(str);
	for(var i=0; i < str.length; i++) {
		var oneChar = str.charAt(i);
        if(oneChar < "0" || oneChar > "9") {
			if(oneChar == "." || (i == 0 && oneChar == "-")) {
			} else {
				return false;
			}
		}
	}
    return true;
}






//작업중
//인풋에 필수입력
function gfnValidRequired(chkId, msg) {
	var val = $("#" + chkId).val();
	val = gfnRemoveComma(val);
	val = gfnRemoveFirstZero(val);

	if(chkId == "acno2" && $("#" + chkId).val()=="0000"){

		return true;
	}

	if(val == "" || val == "0"){
		gfnAlert(msg);
		return false;
	}
	return true;
}

//작업중
//체크박스필수
function gfnIsValidCheckBox(chkId, msg) {
	if ( ! $("#" + chkId).is(":checked")) {
		gfnAlert(msg);
		return false;
	}
	return true;
}

//작업중
//인풋길이체크
function gfnIsValidLength(chkId, len, msg) {
	var val = $("#" + chkId).val();

	if(val.length != len){
		gfnAlert(msg);
		return false;
	}
	return true;
}


//문자열 자르기
//@ arguments
//str  : 문자열을 자를 UTF-8 인코딩 문자열
//len  : 자를 문자열의 시작
//tail : 자를 문자열의 끝
//@ return : string
function string_cut(str, len, tail) {
	return str.substr(len, tail);
}

//일자달력 커플에서 날짜범위 틀릴시 정정
function gfnSetDifferenceDate(datePickerId1, datePickerId2) {
	var stDate = $( datePickerId1 ).val();
	var edDate = $( datePickerId2 ).val();

	if (stDate != "" && edDate != "" && stDate > edDate) {
		var temp = stDate;
		$( datePickerId1 ).val(edDate);
		$( datePickerId2 ).val(temp);
	}
}

//일자달력 기본옵션 세팅
function gfnSetDatePickerOption(datePickerId) {
	$( datePickerId ).datepicker( "option", "dateFormat","yy-mm-dd" );
	if(isNull($( datePickerId ).datepicker( "option", "yearRange"))){
		$( datePickerId ).datepicker( "option", "yearRange","c-10:c+10" );
	}
	$( datePickerId ).datepicker( "option", "showMonthAfterYear",true );
	$( datePickerId ).datepicker( "option", "defaultDate", "+1w");
	$( datePickerId ).datepicker( "option", "changeMonth", true);
	$( datePickerId ).datepicker( "option", "changeYear", true);
	$( datePickerId ).datepicker( "option", "hideIfNoPrevNext", false);
	$( datePickerId ).datepicker( "option", "numberOfMonths", 1);
}


//선택 날짜 2개 사이의 기간 구하기
//형식은 yyyy-mm-dd
function dateClac(start,end) {
	var s = start.split("-");		//시작날짜
	var e = end.split("-");			//종료날짜
	var startDay = new Date(s[0],s[1]-1,s[2]);
	var endDay = new Date(e[0],e[1]-1,e[2]);
	var day = 1000*60*60*24;
	var calcDate = (endDay-startDay)/day;
	return calcDate;
}

//Date객체 yyyymmdd 형식으로 변환
function dateChange(date)
{
	var year = date.getFullYear();
	var month = "";
	var day = "";
	if(parseInt(date.getMonth()+1) < 10) { month = "0"+(date.getMonth()+1); }
	else { month = ""+(date.getMonth()+1); }
	if(parseInt(date.getDate()) < 10) { day = "0"+date.getDate(); }
	else { day = ""+date.getDate(); }
	var fulldate = year+month+day;
	return fulldate;
}

//Date객체 yyyy-mm-dd 형식으로 변환
function dateChange2(date)
{
	return setHyphen(dateChange(date));
}

//테이블 호버링
function gfnTableHover(tbodyId) {
	$('#' + tbodyId + ' tr').hover(
		function () {
			$(this).removeClass('tbl_non_hover');
			$(this).addClass('tbl_hover');
		},
		function () {
			$(this).removeClass('tbl_hover');
			$(this).addClass('tbl_non_hover');
		}
	);
}

//빈값이 넘어왔는데 0으로 찍어야할때
function nullChangeZero(data)
{
	if(data == "") { return 0; }
	else { return data; }
}

//replaceALL
function gfnReplace(str,before,after) {
	var resultText = str;
	for (var i=0; i< str.length;i++)
	{
		resultText = resultText.replace(before ,after);
	}
	return resultText;
}

function LeftReplace(str, n){
	if(n <= 0){
		return "";
	}else if(n > String(str).length){
		return str;
	}else{
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen -n);
	}
}

function RightReplace(str, n){
	if(n <= 0){
		return "";
	}else if(n> String(str).length){
		return str;
	}else{
		return String(str).substring(0, n);
	}
}


//스플리트
function gfnSplit(val, spl) {
	var txt = val;
	var arr = new Array();
	var i = 0;
	while (txt.indexOf(spl) != -1) {
		arr[i] = txt.substring( 0, txt.indexOf(spl) );
		txt = txt.substring(txt.indexOf(spl) + (spl.length), txt.length);
		i++;
	}
	arr[arr.length] = txt;
	return arr;
}


//'-' 제거 -----------------------------------------------------------------
function gfnRemoveMinus(str) {
	var resultText = "";
	for(var i = 0; i < str.length; i++) {
		var ch = str.charAt(i);
		if(ch != '-') resultText = resultText + ch;
   }
	return resultText;
}


//'+' 제거 -----------------------------------------------------------------
function gfnRemovePlus(str) {
	var resultText = "";
	for(var i = 0; i < str.length; i++) {
		var ch = str.charAt(i);
		if(ch != '+') resultText = resultText + ch;
   }
	return resultText;
}

//시간 - 생성
function setTimeHyphen(time){
	if(time=="" || time==null)return time;
		time = time.substring(0, 2) + ":" + time.substring(2, 4) + ":" + time.substring(4, 6);
	return time;
}

//정수부분 앞에있는 0 삭제
function deleteZero(num)
{
	var tNum = num.split(".");
	if(tNum[1] == undefined) { tNum[1] == ""; }
	else { tNum[1] = "."+tNum[1];}
	for(var i=0; i<tNum[0].length; i++)
	{
		if(tNum[0].substring(i,i+1) != "0") { return tNum[0].substring(i,tNum[0].legnth)+tNum[1]; }
	}
	return 0+tNum[1];
}

//문자 길이 체크
function getByteLength(data)
{
	var len = 0;
	var str = data.substring(0);

	if(str == null) { return 0; }

	for(var i=0; i < str.length; i++)
	{
		var ch = escape(str.charAt(i));

		if(ch.length == 1) { len++; }
		else if(ch.indexOf("&u") != -1) { len += 2; }
		else if(ch.indexOf("%") != -1) { len += ch.length/3; }
	}
	return len;
}

//메세지 원하는 길이만큼 자르고 원하는 문자열 붙이기
function cutMsg(data,str,len)
{
	var ret = "";
	var msglen = 0;
	var endStr = "";
	for(var i=0; i<data.length; i++)
	{
		var ch = data.charAt(i);
		if(escape(ch).length > 4) { msglen += 2; }
		else { msglen++; }
		if(msglen > len) { endStr = str; break; }
		ret += ch;
	}
	return ret+endStr;
}

//숫자 + Tab만 입력
function onlyNumberTab(e)
{
	var strKeyCode;
	if(e == undefined) {
		strKeyCode = window.event.keyCode;
	} else {
		strKeyCode = (e.keyCode ? e.keyCode : e.which);
	}
	if(strKeyCode!=9) {onlyNumber(e);}
}

//새창 혹은 이동
function pageLocation(urls, pagename, flag, option){
//	console.log(document.writeln(location.href));
//	alert("test common");
	var front ="";
	if(urls =='/newsmakt/OvrlNewsMakt.do'){
		front =window.open(urls,"_blank");
		front.focus();
	}else	if(urls =='/invtsttganls/OmStckQttn.do'){
		front =window.open(urls, "_blank");
		front.focus();
	}else	if(urls.indexOf('/wts/WtsMain.do') != -1){
//		var IE = (document.all)?true:false;
//		if (IE) {
//			// IE 인 경우
//			var userAgent = window.clientInformation.userAgent;  // Browser 정보	
//			if (navigator.userAgent.match(/Trident\/(\d.\d)/i)!=null) { // IE 8 이상만 표시
				document.location.href = urls;
//			} else {
//				alert('WTS는 Internet Explorer 8이상만 사용 가능합니다.\n(고객님PC정보: ' + userAgent + ')');
//			}					
////			document.location.href = urls;
//		} else {
//			alert('WTS는 Internet Explorer만 지원합니다.');			
////			alert('Internet Explorer만 지원합니다.');
//		}
////		if(logOutTime > 0) {
////			front =window.open(urls, "_blank");
////			front.focus();
////		} else {
////			document.location.href = "http://home.imeritz.com/comm/logn/LognMang.do?targetURL=%2Findex.jsp#none";
////		}
	} else if(location.href.indexOf('/wts/WtsMain.do') != -1){
		if(location.href.indexOf('popup=popup') != -1) {
			opener.location.href = urls;
			window.close();
		} else {
			document.location.href = urls;
		}
	}else{
		if(flag == '1'){
			document.location.href = urls;
		}else if(flag == '2'){
			front = window.open(urls, pagename, option);
			front.focus();
		}
	}	
}



//주민번호 유효성 체크 -----------------------------------------------------
function gfnResidNoChk(str) {
	chk = 0;
	for(var i=0; i<=11; i++) {
		chk = chk + ((i % 8 + 2) * parseInt(str.substring(i,i+1)));
	}
	chk = 11 - (chk %11);
	chk = chk % 10;

	if (chk != str.substring(12,13)) {
		if(gfnFgnNoChksum(str)) {
			return true;
		}
		if(gfnFgnNoChksum(str)) {
			return true;
		}
		return false;
	}
	else return true;
}

//외국인 등록번호 검사
function gfnFgnNoChksum(reg_no) {
    var birthYear;
    var birthMonth;
    var birthDate;
    var birth;
    var sum = 0;
    var odd = 0;

    if ((reg_no.charAt(6) == "5") || (reg_no.charAt(6) == "6"))
    {
       birthYear = "19";
    }
    else if ((reg_no.charAt(6) == "7") || (reg_no.charAt(6) == "8"))
    {
       birthYear = "20";
    }
    else if ((reg_no.charAt(6) == "9") || (reg_no.charAt(6) == "0"))
    {
       birthYear = "18";
    }
    else
    {
       birthYear = "19";
    }
    birthYear += reg_no.substr(0, 2);
    birthMonth = reg_no.substr(2, 2) - 1;
    birthDate = reg_no.substr(4, 2);
    birth = new Date(birthYear, birthMonth, birthDate);

    if ( birth.getYear() % 100 != reg_no.substr(0, 2) ||
         birth.getMonth() != birthMonth ||
         birth.getDate() != birthDate) {
      return false;
    }

    buf = new Array(13);
    for (var i = 0; i < 13; i++) {
    	buf[i] = parseInt(reg_no.charAt(i));
    }

	/* 8, 9번째 자리 확인 */
    odd = buf[7]*10 + buf[8];
    if (odd%2 != 0) {
      return false;
    }
	/* 12번째 자리 확인 */
    if ((buf[11] != 6)&&(buf[11] != 7)&&(buf[11] != 8)&&(buf[11] != 9)) {
      return false;
    }

	/* 숫자 조합 확인 */
    multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
    for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);
    sum=11-(sum%11);
    if (sum>=10) sum-=10;
    sum += 2;
    if (sum>=10) sum-=10;
    if ( sum != buf[12]) return false;
	return true;

}

//iframe resize
function iframeResize(title)
{

	if(title == undefined) { title = 'iframe_main'; }
	//find the height of the internal page

    document.all(title).height = 200;

    var the_height = 0;
    
    try {
    	the_height= document.getElementById(title).contentWindow.document.body.scrollHeight;
	} catch (e) {
		
	}
  //change the height of the iframe
  document.getElementById(title).height=the_height+40+"px";
}


//소수점 이하 처리2
function CutDecimalPoint2(intTarget, intCutPosition) {
	//1234.567890
	//. 뒤에 2자리만 남기고 자르겠다.  . index +2
	//1234.5
	//. 소숫점 2자리로 만들겠다.   1234.50

    var intResult = "";
    var strTarget = String(intTarget).split('.');

    if(intCutPosition == 0) { return strTarget[0]; }

    if(strTarget[1]!=null && strTarget[1].length > intCutPosition) {
        strTarget[1] = strTarget[1].slice(0, intCutPosition);
    }else if(strTarget[1]!=null && strTarget[1].length <= intCutPosition){
    	for(var i=0; i<intCutPosition-strTarget[1].length; i++)
    	{
    		strTarget[1] = strTarget[1]+"0";
    	}
    }else{
        strTarget[1] = "00";
    }

    intResult = strTarget[0]+'.'+strTarget[1];
    return intResult;
}

//FROM ~ TO 일자수 얻기
//param1 : yyyymmdd 시작일
//param2 : yyyymmdd 종료일
function gfnDayDiff(str1, str2) {
	var fromYear;
	var fromMonth;
	var fromDay;
	var fromDate;
	var toYear;
	var toMonth;
	var toDay;
	var toDate;

	fromYear = str1.substring(0,4);
	fromMonth = str1.substring(4,6) - 1;
	fromDay = str1.substring(6);
	fromDate = new Date(fromYear, fromMonth, fromDay);

	toYear = str2.substring(0,4);
	toMonth = str2.substring(4,6) - 1;
	toDay = str2.substring(6);
	toDate = new Date(toYear, toMonth, toDay);

	return Math.ceil((toDate - fromDate) / 1000 / 24 / 60 / 60);
}

// not used
function getPbcrSgntDataChckOld(signData,r,errorTitle,userId)
{
	var id = "";
	if(userId != undefined) { id = "&id="+URLEncode(userId); }
	var yn = "N";
	
	var frmData = "r="+r+"&data="+signData+id;
//	frmData = GatherValueEach(frmData); // 이미 URLEncode 되어서 들어온 값이라 제외
    $.ajax({
		type: "POST",
		async : false,
		url: "/pbcr/PbcrSgntDataChck.do",
		dataType:"json",
		timeout:30000,
		data:frmData, // NA // data:"INIpluginData="+URLEncode(EncParams(frmData)),
		error:function(request, status, error){
			fnAjaxError();
		},
		success: function(response, status, request ) {
			if(response.sysCode=='0'){
	    		yn = "Y";
			}else{
				commModalPop(errorTitle , response.sysMsg , response.sysSubMsg , response.sysMsgCode);
			}

		},
		beforeSend: function(){ $.blockUI({}); },
		complete: function(){ $.unblockUI(); }
	});

    return yn;
}

//비율이 .xxx로 넘어올때 앞에 0 붙여주기
function addZeroSign(val){
	var rt = "";
	var sign = val.substring(0,1);

	var ary =new Array();
	ary = val.split("-");

	if(sign == "."){
		rt = "0"+val;
	} else if((sign == "-") && (ary[1].substring(0,1) == ".")){
		rt = sign+"0"+ary[1];
	} else {
		rt = val;
	}
	//alert(val + "   " + tempsign + "   " + sign);
	return rt;
}

//공인인증 엑티브엑스 호출  Not Used
//오브젝트 선언이 되지 않았을경우만 head태그안에 추가해준다
function addCertManX()
{
	return;
//	if($("object#CertManX").attr("classid") == undefined)
//	{
//		// 2015.10.15 업데이트
//		$("head").append('<object id=CertManX classid=CLSID:EC5D5118-9FDE-4A3E-84F3-C2B711740E70  codeBase=http://home.imeritz.com/include/signKorea/SKCommAX.cab#version=9,9,6,0></object>');
//	}
}

function gfnAccountIsNull(acnoId) {
	var selAcnoOptionStr = $(acnoId).html();
	if($(acnoId).val() == null || $(acnoId).val() == "") selAcnoOptionStr = "";
	selAcnoOptionStr = gfnTrim(selAcnoOptionStr);
	selAcnoOptionStr = gfnReplace(selAcnoOptionStr,"\n","");
	selAcnoOptionStr = gfnReplace(selAcnoOptionStr," ","");
	selAcnoOptionStr = gfnReplace(selAcnoOptionStr,"	","");

	if (selAcnoOptionStr == "") {
		$('#basic-modal-AccountIsNull').modal() ;
		//alert("해당상품에 사용가능한 계좌가 없습니다.");
		return false;
	}
	return true;
}

// 특정 테이블바디 에 있는 내용 중 특정 컬럼에 대해 값이 음수인 경우 파란색, 양수인 경우 빨간색으로 표시
// tBody : 테이블 바디 의 ID
// targetColNum : 색상 표시할 컬럼 순서. 왼쪽부터 0으로 시작
// lInterval : 색상 표시할 레코드의 라인 간격. 매라인마다 빠짐없이 표시할 때는 1, 2라인마다 표시할 때는 2
// lOrder : 2라인 이상일 때 표시할 순서. 2라인중 첫번째 라인에 있으면 0, 두번째 라인이면 1
// 예시) 매라인 3번째 컬럼 색상 표시 gfnSetFontColorTable("tableBody", 3, 1, 0)
//      2라인마다 3번째 컬럼에 해당하는 첫번째 라인  gfnSetFontColorTable("tableBody", 3, 2, 0)
function gfnSetFontColorTable(tBody, targetColNum, lInterval, lOrder){
	  var tableBody = document.getElementById(tBody);
	  var classNm = "";
	  var classAdd = "";
	  var numStr = "";

	  for (var i = 0; i < tableBody.rows.length; i++){

		  if(i % lInterval == lOrder){
			  classAdd = "";
			  classNm = "";

			  classNm = $("#" + tBody + " tr:eq(" +i+	") td:eq("+targetColNum+")").attr("class");
			  numStr = str_replace($("#" + tBody + " tr:eq(" +i+	") td:eq("+targetColNum+")").text(), "%");

			  if(parseFloat(numStr, 3) == 0.0){
				  classAdd = "";
			  }else if(numStr.substr(0, 1) == "-"){
				  classAdd = " c_blue";
			  }else{
				  classAdd = " c_r";
			  }
			  $("#" + tBody + " tr:eq(" +i+	") td:eq("+targetColNum+")").attr("class", classNm + classAdd);
		  }
	  }
}

// Ajax 통신 에러 발생시 처리
function fnAjaxError(){
	alert("네트워크 일시 장애입니다.");
	$.unblockUI();
}

//소수점 이하 자리수 버림
//num: 대상숫자, pos: 희망 소수점 이하자리수
function fixNumberCut(num, len) {
	var rslt = "";
	var ary = new Array();
	ary = num.split(".");
	
	var undot = "";
	try {		
		if (len>ary[1].length) {
			undot = ary[1]+"";
		} else 
			undot = ary[1].substring(0, len);
	} catch (E) {
		undot = "0"
	}
	
	if (num=="0"||num=="0."||num=="0.0"||num=="0.00") rslt = "0.00";
	else rslt = ary[0] + "." + undot
	
	return rslt;
//	return ary[0] + "." + ary[1].substring(0, len);
}

//자바스크립트 정규식 특수문자 제거하기
function specialCodeRemove(obj) {
var val = obj.value;
var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|., )]/gi;
	if(pattern.test(val)){
	    obj.value = val.replace(pattern,"");
	}
}

// 전체 보안 모듈 ActiveX 설치 확인 후 화면 이동용 (화면 사용)
function fnCommonCheckSecuAXFromView() {
	// 보안모듈 설치 현황
	var sa = fnCommonCheckSecuModule();
//	alert(sa[0] + ":" + sa[1] + ":" + sa[2] + ":" + sa[3]);
	if (!(sa[0]=="Y" && sa[1]=="Y" && sa[2]=="Y" && sa[3]=="Y")) {
		var turl = "tURL=" + location.href ;
//		var pss1 = "&PSS1=" + sa[0];
//		var pss2 = "&PSS2=" + sa[1];
//		var pss3 = "&PSS3=" + sa[2];
//		var pss4 = "&PSS4=" + sa[3];
		location="https://home.imeritz.com/comm/logn/MainSecurities.jsp?"
			+ turl
			//+ pss1 + pss2 + pss3	+ pss4
			;
		return;
	}
}

// 년월일 YYYY-MM형식으로 변경
function fnFormYearMonth(yearmonth) {
	if (yearmonth==null || yearmonth=="" || yearmonth.length!=6) return "";

	return yearmonth.substring(0,4) +"-" + yearmonth.substring(4);
}

//날짜 - 생성 2018년XX월XX일******************
function setHyphenKor(date){
	if(date==null || date=="") return date;
		date = date.substring(0, 4) + "년" + date.substring(4, 6) + "월" + date.substring(6, 8) + "일";
	return date;
}

//3자리 단위 콤마
function gfnToday(f){	
	if(typeof(f)=="undefined"){
		f = "yyyyMMdd";
	}
	return new Date().format(f);
}
//3자리 단위 콤마
function commaify(x){	
	x = x+"";
	if(x.indexOf(".")==-1){
		return commify(x);
	}else{
		return commifyRatio(x);
	}
}
String.prototype.padLeft = function(totalWidth, paddingChar){
	return Array(totalWidth - this.length + 1).join(paddingChar || " ")+this;
};
String.prototype.padRight = function(totalWidth, paddingChar){
	return this + Array(totalWidth - this.length + 1).join(paddingChar || " ");
};
// 숫자 0 (-)hypen 표시
function gfnZero2hyphen(x){	
	x = x+"";
	if(!x || x.length==0) return "-";
	else return x=="0"?"-":x;
}
String.prototype.zero2hyphen = function(){
	var x = this;
	if(!x || x.length==0) return "-";
	else return x=="0"?"-":x;
};
Number.prototype.zero2hyphen = function(){
	return (this+"").zero2hyphen();
};
// 콤마 제거
String.prototype.removeComma = function(){
	var x = this;
	if(!x || x.length==0) return "";
	else return x.split(",").join("");
};
//3자리 단위 콤마
String.prototype.addComma = function(){
	var x = this||""+"";
	return commaify(x);
};
String.prototype.getJqryId = function(){
	var sVal = this;
	if((index=this.indexOf("#"))>-1){
		sVal = sVal.substring(index+1);
	}
	return sVal;
};
/*
type 1 : class
     0 : id ( default )
*/      
String.prototype.getJqryObjId = function(type){
	var sPrefix = "#";
	if(type==0){
		sPrefix = "#";
	}else
	if(type==1){
		sPrefix = ".";
	}
	var _this = this;
	if((index=_this.indexOf(sPrefix))==-1){
		_this = sPrefix + _this;
	}
	return _this+"";
};    
String.prototype.compareString = function(str_split, str_separator){
	var sep = str_separator||",";
	var arr = str_split.split(sep);
	var result = arr.length==0;
	if(!result){
		for(var i in arr){
			if(!result){
				result = (arr[i] == this);
			}
		};
	}
	return result;
};
String.prototype.appendToForm = function($form){
	var param = this||"";
	if($form==null || $form==undefined) return;
	if(param.indexOf("=")==-1) return;	
	var arr = param.split("&");	
	for(var i=0;i<arr.length;i++){		
		var arrItem = $.trim(arr[i]).split("=");
		if(arrItem.length==2){			
			var $obj = $form.find("[name='"+arrItem[0]+"']");
			if($obj.length > 0){
				$obj.val(gfnNvl(arrItem[1]));
			}else{
				$form.addHidden(arrItem[0], gfnNvl(arrItem[1]));
			}
		}
	}
};

//String format
String.prototype.format = function(){
	var args = arguments;	
	return this.replace(/{(\d+)}/g,function(match,number){
		return typeof args[number]!='undefined'?args[number]:match;
	});
};
//조사붙이기
String.prototype.josa = function(josa){
	var txt = this||"";
	if(txt.length == 0) return "";
	var code = txt.charCodeAt(txt.length -1);
	var l = code - 44032;
	if(l < 0 || l > 11171) return txt;
	var jong = (code - 0xac00) % 28 > 0;
	if(josa.indexOf('을')>-1 || josa.indexOf('를')) return txt + (jong?'을':'를');
	if(josa.indexOf('이')>-1 || josa.indexOf('가')) return txt + (jong?'이':'가');
	if(josa.indexOf('은')>-1 || josa.indexOf('는')) return txt + (jong?'은':'는');
	if(josa.indexOf('와')>-1 || josa.indexOf('과')) return txt + (jong?'와':'과');
	return txt + josa;
};
//Date format
Date.prototype.format = function(f){
	if(!this.valueOf())return " ";

	var weekend_S = ["일","월","화","수","목","금","토"];
	var weekend = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
	var weekend_Eng = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
	var d = this;
	if($.trim(d)=="") return "";
	//yyyyMMddhhmmss
	return f.replace(/(yyyy|YYYY|yy|YY|MM|dd|E|HH|hh|mm|ss|SS|w|W|a\/p|A\/P)/gi, function($1){
		switch($1){
			case "yyyy": return d.getFullYear();
			case "YYYY": return d.getFullYear();
			case "yy": return (d.getFullYear() % 1000).zf(2);
			case "YY": return (d.getFullYear() % 1000).zf(2);
			case "MM": return (d.getMonth() + 1).zf(2);
			case "dd": return d.getDate().zf(2);
			case "w": return weekend_S[d.getDay()];
			case "W": return weekend[d.getDay()];
			case "we": return weekend_Eng[d.getDay()];
			case "HH": return d.getHours().zf(2);
			case "hh": return ((h=d.getHours()%12)?h:12).zf(2);
			case "mm": return d.getMinutes().zf(2);
			case "ss": return d.getSeconds().zf(2);
			case "SS": return d.getMilliseconds().zf(3);
			case "a/p": return d.getHours()<12?"오전":"오후";
			case "A/P": return d.getHours()<12?"AM":"PM";
			case "AP": return d.getHours()<12?"AM":"PM";
			default: return $1;
		}
	});
}
String.prototype.string = function(len){var s='',i=0;while(i++ < len){ s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
//String date => Date
String.prototype.toDate = function(pattern){
	if(!this.valueOf()||$.trim(this)=="") return "";
	var index = -1;
	var year=1900, month=1, day=1;
	var hour=0;
	var min=0;
	var sec=0;
	var msec=0;
	if((index=pattern.indexOf("yyyy"))==-1 && (index=pattern.indexOf("YYYY"))==-1){
		index = pattern.indexOf("yy");
		if(index==-1) index = pattern.indexOf("YY");
		if(index>-1) {
			year = "20"+this.substr(index, 2);
		}
	}else{
		year = this.substr(index,4);
	}
	if((index=pattern.indexOf("MM"))!=-1){
		month = this.substr(index,2);
	}
	if((index=pattern.indexOf("dd"))!=-1){
		day = this.substr(index,2);
	}
	if((index=pattern.indexOf("HH"))!=-1){
		hour = this.substr(index, 2);
	}else
	if((index=pattern.indexOf("hh"))!=-1){
		var ampm = "AM";
		var index2 = -1;
		if((index2=pattern.indexOf("AP"))!=-1){
			ampm = this.substr(index2, 2);
		}
		hour = this.substr(index, 2);
		if(hour==""||hour=="12") hour = "00";
		if(ampm.toUpperCase()=="PM"){
			hour = parseInt(hour)+12;
		}
	}
	if((index=pattern.indexOf("mm"))!=-1){
		min = this.substr(index, 2);
	}
	if((index=pattern.indexOf("ss"))!=-1){
		sec = this.substr(index, 2);
	}
	if((index=pattern.indexOf("SS"))!=-1){
		msec = this.substr(index, 3);
	}
	if(month==0)month=1;
	return new Date(year, month-1, day, hour, min, sec, msec);
};
String.prototype.submitPost = function(target,form){
	var str_url = this||"";
	var str_target = target||"";
	if(form==undefined || typeof(form)=="string"){
		var str_id = "_meritz_post_form".getJqryObjId();
		if(typeof(form)=="string"){
			str_id = form.getJqryObjId();
		}
		form = $(str_id);
	}
	var opts=undefined;
	if(typeof(form)=="object"){
		opts=form;
		var str_id = "_meritz_post_form".getJqryObjId();
		form = gfnNvl(opts.form,str_id);				
		if(typeof(form)=="string"){
			str_id = form.getJqryObjId();
		}
		form = $(str_id);
	}
	if(form.length==0){
		form = $("<form></form>").attr({"id":"_meritz_post_form","action":str_url}).appendTo("body");
		form.attr("method",opts.method||"post");
	}else{
		form.attr("action",str_url);
	}
	if(gfnIsNull(str_url)){return;}
	if(gfnNvl(str_target)!=""){
		form.attr("target",str_target);
	}
	form.attr("action",str_url);
	form.submitPost(opts);
};
Math.trunc = Math.trunc || function(x){
	if(isNaN(x)){
		return NaN;
	}
	if(x>0){
		return Math.floor(x);
	}
	return Math.cell(x);
};
String.prototype.cutByte = function(length){
	var str = this;
	var len = 0;
	for(var i=0;i<str.length;i++){
		len += (str.charCodeAt(i))?2:1;
		if(len>length) return str.substring(0,i);
	}
	return str;
};
String.prototype.getByteLength = function(){
	var str = this;
	var len = 0;
	for(var i=0;i<str.length;i++){
		len += (str.charCodeAt(i))?2:1;
	}
	return len;
};
// 로컬테스트여부
function isLocalhost(){
	return (((location.host).indexOf("localhost")>-1)||((location.host).indexOf("dev.imeritz.com")>-1));
}
function isTestServer(){
	try{
		return eval(IS_TEST_SVR||"false");
	}catch(e){return false;}	
}
function isRealServer(){
	return (!isLocalhost()&&!isTestServer());
}
// 숫자 및 (-) 입력 가능
function gfnOnlyInt(e){
	$(this).val($(this).val().replace(/[^-0-9]/g,""));
}
// 숫자만 입력 가능
function gfnOnlyUint(event){
	$(this).val($(this).val().replace(/[^0-9]/g,""));
}
//숫자 및 (-)(.) 입력 가능
function gfnOnlyFloat(event){
	if(e.keyCode && ((e.keyCode<48||e.keyCode57)&&(e.keyCode!=45&&e.keyCode!=46))) e.preventDefault();
}
function gfnIsNull(txt){
	return (txt==null || txt==undefined || txt=="null" || txt=="undefined" || $.trim(txt)=="" || $.trim(txt).length==0);
}
function gfnIsNvl(txt){
	return gfnIsNull(txt);
}
function isNull(txt){
	return gfnIsNull(txt);
}
function isNotNull(txt){
	return !gfnIsNull(txt);
}
function gfnNvl(txt,def){
	def = (def==null || def==undefined || $.trim(def)=="" || $.trim(def).length==0)?"":def;
	if(txt==null || txt==undefined || txt=="null" || txt=="undefined" || $.trim(txt)=="" || $.trim(txt).length==0) return def;
	return txt+"";
}
function gfnNvlNum(num,def){	
	def = (def==null || def==undefined || $.trim(def+"")=="" || $.trim(def+"").length==0)?0:def;
	if(num!=undefined && typeof(num)==="string") num = num.removeComma();
	if(num==null || num==undefined || $.trim(num+"")=="" || $.trim(num+"").length==0) return def;
	return eval(gfnIsNumber(num)?num:def);
}
function trace(txt,$opts){
	var $defaults = {
			bShowDateTime		: true,
			sDateTimeFormat		: "[HH:mm:ss.SS]",
			jsonRoot			: "JsonData"
		};	
	var $options = $.extend({},$defaults, $opts);
	var strTextFormat = "{0} : {1}";
	if(!$options.bShowDateTime){
		strTextFormat = "{1}";
	}
	var obj2 = "";
	if(typeof(txt)==='object'){
		try{
			if(txt instanceof HTMLFormElement){
				obj2 = txt;
			}else{
				if($.isArray(txt)){
					$options.jsonRoot = "ArrayData";
				}else
				if(txt.context && $.isXMLDoc(txt.context)){
					$options.jsonRoot = "XMLData";
				}
				if($.isArray(txt) || !txt.context || !$.isXMLDoc(txt.context)){
					txt = jsonToXML(txt,$options.jsonRoot,null,$options);
				}
				if(txt.context && $.isXMLDoc(txt.context)){
					var xmlDoc = txt.context;
					// xml to string 
					var $xml = $(xmlDoc);
					txt = xmlToString($xml.contents().get(0),0);
				}
			}
		}catch(e){obj2 = txt;txt = e.message;}
	}	
	console.log(strTextFormat.format(gfnToday($options.sDateTimeFormat),txt),obj2);
}
// 숫자여부 확인
function gfnIsNumber(num) {
	var str = (num+"").removeComma();
	return $.isNumeric(str);
}
String.prototype.toNum = function(){
	var str = this||"0";
	str 	= str.replace(/[^0-9]/g, '');
	return Number(str);
};
function gfnToNum(str) {
	var strNum = (str||"")+"";
	return strNum.toNum();
}
// 아규먼트의 값을 숫자로 변환 후 합산 후 리턴
function gfnSum() {
	var result = 0;
	for(var i=0;i<arguments.length;i++){
		var str = gfnNvl(arguments[i],"0");
		result 	+= str.toNum();
	}
	return result;
}
//모달팝업 띄우기
function gfn_modalPopup(str_popup_id,on_close,close_html) {
	var opts = str_popup_id;
	var strPopupId = str_popup_id;
	var onClose = on_close;
	var closeHtml = close_html;
	var modal_options = {opacity:0};
	if(typeof(strPopupId)=="object"){
		strPopupId = opts.msgLayerId;
		onClose = opts.closeEvent;
		closeHtml = opts.closeHtml;
		modal_options = $.extend({},modal_options, opts.options);
	}
	var onCloseCallback = function (e) {
	    var s = this;
	    var _onCloseCallback = onClose;
    	if(onClose!=undefined && typeof(onClose)=="string"){
    		_onCloseCallback = window[onClose];
    		if(!_onCloseCallback) _onCloseCallback = function(){ gfnAlert(onClose+" 함수를 찾을 수 없습니다."); };
    	}
    	if(!_onCloseCallback) {s.close();return;}
    	var result = true;
        if ($.isFunction(_onCloseCallback)) {
        	result = _onCloseCallback.apply(s, [s.d]);
        	if(result==undefined) result = true;
        }
        s.occb = result;
        if(!result){
            $('.' + s.o.closeClass).bind('click.simplemodal', function (e) {
                e.preventDefault();
                s.close();
            });            
        	return;
        }
        s.close();
    };	
	var strModalPopId = strPopupId.getJqryId();	
	if($("#"+strModalPopId).length==0) {
		gfnAlert("'#"+strModalPopId+"' empty popup ID!");
		return;
	}	
	var strTitle = "";
	if($("#"+strModalPopId+' div[class^=pop_center] h4:first strong').length>0){
		strTitle = $("#"+strModalPopId+' div[class^=pop_center] h4:first strong').text();
	}
	if($("#"+strModalPopId+" div[class^=header_p] h4:first").length>0){
		strTitle = $("#"+strModalPopId+" div[class^=header_p] h4:first").text();
	}
	if($("#"+strModalPopId+" div[class=pop_top] strong").length>0){
		strTitle = $("#"+strModalPopId+" div[class=pop_top] strong").text();
	}
	var strCloseHtml = gfnNvl(closeHtml,'<a class="modalCloseImg" title="'+strTitle+' (레이어팝업) 닫기"></a>');
	
	modal_options.onClose= onCloseCallback;
	modal_options.closeHTML= strCloseHtml;
	
	if($('.simplemodal-overlay:visible').length>0 || $('.simplemodal-container:visible').length>0){
		$("#"+strModalPopId).layerPopup();
		return;
	}
	//장차법
	$("#"+strModalPopId).modal(modal_options);
	var a = {onClose: onCloseCallback,
		/*
		onClose: function (dialog) {
			var strFnNm = "fn_beforeClose_"+strModalPopId;
			if(strFnNm!=null && $.trim(strFnNm)!==""){
				eval(strFnNm+"()");
			}
		},
		*/
		closeHTML: strCloseHtml
	};
}
function fn_modalPopup(strPopupId,onClose,closeHtml) {
	gfn_modalPopup(strPopupId,onClose,closeHtml);
}
// 유효성 체크
function gfn_valueCheck(chkClassNm,$obj){
	var chk = true;	
	if($obj==null || $obj==undefined){
		$obj = $("body");
	}
	$(chkClassNm,$obj).each(function(){
		var $chkObj=$(this);
		var sMsg = " 입력하십시오.";
		if($chkObj.attr("type")=="hidden") sMsg = " 선택하십시오.";		
		if($chkObj.is(":radio")||$chkObj.is(":checkbox")){
			sMsg = " 선택하십시오.";
			var radioNm = $chkObj.attr("name");
			if($("input[name='"+radioNm+"']:checked").length==0){
				var title = $chkObj.attr("title");
				if($.trim(title)==""){
					var $pObj = $chkObj.prev("span");
					if($pObj!=null && $pObj!=undefined){
						title = $pObj.html();
					}
				}
				if($.trim(title)==""){
					var $pObj = $chkObj.parent();
					if($pObj.is("td")){
						var $pObj = $chkObj.prev("th");
						if($pObj!=null && $pObj!=undefined){
							title = $pObj.find("label").html();
						}
					}
				}
				gfnAlert((title||"").josa("을(를)")+sMsg);
				$chkObj.focus();
				chk = false;
				return chk;
			}
		}
		if($chkObj.val()==null||$.trim($chkObj.val())==""){
			var radioNm = $chkObj.attr("name");
			if($("input[name='"+radioNm+"']:checked").length==0){
				var title = $chkObj.attr("title");
				if($.trim(title)==""){
					var $pObj = $chkObj.parent();
					if($pObj.is("td")){
						var $pObj = $chkObj.prev("th");
						if($pObj!=null && $pObj!=undefined){
							title = $pObj.find("label").html();
						}
					}
				}
				gfnAlert((title||"").josa("을(를)")+sMsg);
				$chkObj.focus();
				chk = false;
				return chk;
			}
		}
	});
	
	return chk;
}
function fn_valueCheck(chkClassNm,$obj){
	return gfn_valueCheck(chkClassNm,$obj);
}
// 서브메인 Left Menu 리스트 Top Menu 에서 가져오기
function gfnReloadLeftMenuByTopMenuForSubMain(){

	var $lnb_list = $("#sideContent .lnb_list").empty();
	var $navi_tit = $(".sub_wrap").find("[onclick*='"+location.pathname+"']").parent();
	var $li = $(".navi_sub ul li",$navi_tit).clone().appendTo($lnb_list);
	$("a",$li).addClass("cat_tit");
	$("a > span.spacing-1",$li).each(function(){
		var strHtml = $(this).html().replace("<br>","").replace("<br />","").replace("<br/>","");
		$(this).attr("title",strHtml).html(strHtml);
	});
	
}
function fnNoData($tbody,desc,strAddClass){
	if($tbody==undefined) return "";
	$tbody.empty();
	var sHtml = desc||"조회된 내역이 없습니다.";
	var col_count = $tbody.parent().find("colgroup > col").length;
	var $tr = $("<tr></tr>").addClass("noData").appendTo($tbody);
	var $td = $("<td></td>").attr("colspan",col_count).addClass("t_c").html(sHtml).appendTo($tr);
	if(!gfnIsNull(strAddClass)){
		$td.addClass(strAddClass);
	}
}
(function ($){
	$.each(['show','hide'], function(i, ev){
		var el = $.fn[ev];
		$.fn[ev] = function(){
			this.trigger(ev);
			return el.apply(this, arguments);
		};
	});
	
	$.fn.addHidden = function(name, value){
		return this.each(function(){
			var $input = $(this).find("input[name='"+name+"']");
			if($input.length>0){
				$input.val(value);
			}else{
				$("<input></input>").attr({"type":"hidden","name":name}).val(value).appendTo($(this));
			}
		});
	};
	$.fn.noData = function(desc){
		return this.each(function(){
			var $tbody = $(this);
			var col_count = $tbody.parent().find("thead tr > th").length;
			$tbody.empty();
			var sHtml = desc||"조회된 내역이 없습니다.";
			if($tbody.parent().find("colgroup").length>0){
				col_count = $tbody.parent().find("colgroup > col").length;
			}
			var $tr = $("<tr></tr>").addClass("noData").appendTo($tbody);
			$("<td></td>").attr("colspan",col_count).addClass("noFix6").addClass("t_c").html(sHtml).appendTo($tr);
		});
	};

	$.fn.appendForm = function(url, opts){		
		var els = this;
		var oForm = $(els);
		var $form = $(els);
		var $opts = opts||{bFormClear:true,sForm:'_meritz_form',sMethod:'post'};
		var sUrl = url;
		var sForm = $opts.sForm;
		
		if($.type(oForm)=='string'){
			sForm = oForm||sForm;
			$form = $("#"+sForm);
			if($form==null || $form==undefined || $form.length==0){
				$form = $("<form></form>").attr({"id":sForm, "name":sForm, "class": "_meritz_post_form"});
				$form.appendTo("body");
			}
		}else{
			if(oForm==null || oForm==undefined || oForm.length==0){
				$form = $("#"+sForm);
				if($form==null || $form==undefined || $form.length==0){
					$form = $("<form></form>").attr({"id":sForm, "name":sForm, "class": "_meritz_post_form"});
					$form.appendTo("body");
				}
			}else
			if(oForm.attr){
				var formId = oForm.attr("id");
				var formNm = oForm.attr("name");
				if(gfnNvl(formId)!=""){
					sForm = formId;
					$form = $("#"+sForm);
				}else
				if(gfnNvl(formNm)!=""){
					sForm = formNm;
					$form = $("form[name='"+sForm+"']");
				}
				$form = oForm;
			}else{
				if(gfnNvl(oForm.id)!=""){
					sForm = oForm.id;
					$form = $("#"+sForm);
				}else
				if(gfnNvl(oForm.name)!=""){
					sForm = oForm.name;
					$form = $("form[name='"+sForm+"']");
				}
			}
		}
		if($form==null || $form==undefined || !$form.is("form") || $form.length==0){
			gfnAlert("form 지정이 올바르지 않습니다.");
			return null;
		}
		$form.attr("method",$opts.sMethod);		
		if($opts.bFormClear){
			$form.empty();
			$form.removeAttr("action");
		}
		if(gfnNvl($form.attr("action"))==""){
			$form.attr("action", sUrl);
		}		
		if(gfnNvl(sUrl)!=""){
			var sParams = sUrl;
			$form.attr("action",sUrl);
			if(sUrl.indexOf("?")>-1){
				var arrUrl = sUrl.split("?");
				if(arrUrl.length==2){
					$form.attr("action", arrUrl[0]);
					sParams = arrUrl[1];
				}
			}			
			if($.trim(sParams)!="") sParams.appendToForm($form);
		}
		var sActionUrl = gfnNvl($form.attr("action"));
		if(sActionUrl!="" && sActionUrl.indexOf("?")>-1){
			var sParams = sActionUrl;
			if(sActionUrl.indexOf("?")>-1){
				var arrUrl = sActionUrl.split("?");
				if(arrUrl.length==2){
					$form.attr("action", arrUrl[0]);
					sParams = arrUrl[1];
				}
			}
			if($.trim(sParams)!="") sParams.appendToForm($form);
		}
		
	};
	
	$.fn.submitPost = function(args){
		
		//<div style="width:360px; height:20px; text-overflow:ellipsis; overflow:hidden; text-align:left;"><a href="/bbs/BbsRead.go?bbsGrpId=bascGrp&amp;bbsId=help13nw&amp;bbsCnttTurnNo=1847&amp;listCnt=10&amp;pageNum=1&amp;searchDiv=null&amp;searchText=">주식 양도소득세 예정신고 안내 테스트</a></div>

		var opts = {
			form 	: "",
			method	: "post",
			target	: "",
			popup	: "",
			pop_option	: "width=800,height=700,resizeble=yes"
		};
		
		var form = args;		
		if(typeof(args)=="string"){
			if($.trim(form)!=""){
				form = $(form.getJqryObjId());
			}			
		}else
		if(typeof(args)=="object"){
			opts = $.extend({},opts, args);
			form = opts.form;
		}		
		var str_url = "";
		var str_target = "";
		var boolPopup = false;
		trace("["+$(this).get(0).tagName.toLowerCase() + "] tag "+$(this).attr("method")+" submit.");
		if($(this).is("a")||$(this).is("area")){
			str_url = $(this).attr("href")||"";
			str_target = $(this).attr("target")||opts.target;
			if(gfnNvl(str_url)=="" && str_url.indexOf("#")==-1 && gfnNvl(str_url).toLowerCase().indexOf("javascript:")==-1){
				return;
			}
			if($(this).is("[popup]")){
				boolPopup = $(this).attr("popup").toUpperCase().compareString("Y,POPUP");
			}
		}else
		if($(this).is("form")){			
			trace("form tag "+$(this).attr("method")+" submit.");
			str_url = $(this).attr("action")||"";
			str_target = $(this).attr("target")||opts.target;
			form = $(this);
		}
		if(!$(this).is("form") && gfnIsNull(str_url)){
			trace("str_url is empty! ");
			return;
		}
		if(form==undefined || typeof(form)=="string"){
			var str_id = "_meritz_post_form".getJqryObjId();
			if(typeof(form)=="string"){
				str_id = form.getJqryObjId();
			}
			form = $(str_id);
			if(form.length==0){
				form = $("<form></form>").attr({"id":"_meritz_post_form","action":str_url}).appendTo("body");
			}else{
				form.attr("action",str_url);
			}
		}
		if(gfnNvl(str_target)!=""){
			form.attr("target",str_target);
		}
		console.log(form);
		form.attr("method",opts.method);	
		form.appendForm(str_url);
		
		boolPopup = boolPopup || ($("input[name='popup']").length>0 && $("input[name='popup']").val()=="popup");
		boolPopup = boolPopup || (gfnNvl(opts.popup)=="Y");
		if(boolPopup){
			var option = opts.pop_option;
			front = window.open("", str_target, option);
			front.focus();
		}
		form.submit();
	};
	$.MSG_OBJ = {};
	var nShowMsgWinId = 0;
	var $defaults = {
		title			: "알림",	// 팝업 타이틀
		msg				: "",	// 메시지 
		type			: "",	// 메시지 팝업의 유형 alert, confirm 
		msgStyle		: "",	// 메시지 스타일
		popStyle		: "",	// 팝업 div 스타일
		contStyle		: "",	// content div 스타일
		footStyle		: "",	// footer div 스타일
		subMsg			: "",	// 서브메시지
		subStyle		: "",	// 서브메시지 스타일
		code			: "",	// 팝업 코드(response 결과 code) 별사용없음
		focusId			: "",	// 팝업 닫힌 후 포커스 이동 아이디
		modalId			: "",	// 팝업 아이디
		width			: "auto",	// 팝업창의 width
		msgColor		: "",	// 메시지 글자색
		subColor		: "#555",	// 서브메시지 글자색 #d71921
		capBtns			: "",	// 버튼 caption. 여러개이면 순서대로 콤마(,)로 구분 (capBtn1, capBtn2 보다 우선 순위 높음) 예, "확인,취소"
		capBtn1			: "확인",	// 첫번째 버튼 caption
		capBtn2			: "",	// 두번째 버튼 caption
		clsBtns			: "",	// 버튼 class 여러개이면 순서대로 콤마(,)로 구분 (clsBtn1, clsBtn2 보다 우선 순위 높음) 예, "btn-type01,btn-type01_de"
		clsBtn1			: "btn-type01",	// 첫번째 버튼 class
		clsBtn2			: "btn-type01_de",	// 두번째 버튼 class
		sCallbackBtns	: "",	// 버튼 callback 함수(string 또는 function 대입)여러개이면 string 의 경우 순서대로 콤마(,)로 구분 function 인 경우  Array 로 구분  
		sCallbackBtn1	: "",	// 첫번째 버튼 callback 함수(string 또는 function 대입)
		sCallbackBtn2	: "",	// 두번째 버튼 callback 함수(string 또는 function 대입)
		nFcsBtnIdx		: 1, // 팝업이 뜬 후 버튼 포커스, 1이면 첫번째 버튼 2이면 두번째버튼, 0 이하 이면 포커스 안줌. $.confirm 에서는 두번째 버튼에 포커스 자동으로 감.
		bAlwaysNew		: true,	// id가 존재하면 제거하고 생성 
		bCreateHtml		: false,	// 팝업을 띄우지 않고 생성만 하는
		bSpBarClose		: true,	// 버튼에 포커스가 있을 때 스페이스바로 버튼 동작하도록 함.
		bClickClose		: true,	// callback 함수에서 창을 닫지 않아도 팝업 창이 닫힘. 콜백에서 수동으로 처리하려면 false 주고 콜백에서 닫으면 됨.
		nEndTimeout		: 0 // 팝업이 뜬 후 시간 경과 후 창 닫힘, 0 이면 동작하지 않음. 단위는 초단위. 예, 10 초 후에 닫히려면 10을 입력하면 됨.
	};	
	/*	// nEndTimeout 값을 number type 이 아닌 json object 로 설정 할 때.
		nEndTimeout	: {
			nTimeout	: 0, // 팝업이 뜬 후 시간 경과 후 창 닫힘, 0 이면 동작하지 않음. 단위는 초단위. 예, 10 초 후에 닫히려면 10을 입력하면 됨. nEndBtnIdx 가 0 이하이면 창이 닫히기만 하지만 1 이상이면 버튼 이벤트가 동작함.
			nDelay		: 1000, // fnInterval 함수의 setInterval delay 값임.
			nEndBtnIdx	: 0, // nEndTimeout 이 1 이상일 때 클릭 이벤트를 수행할 버튼 순서 1이면 첫번째 2 이면 두번째...n이면 n번째 버튼이 클릭 됨.
			fnInterval	: "" // timeout 동안 초당 수행할 함수(string 또는 function 대입). 카운트 다운과 같은 동작 함수.
		},
		// popStyle 값을  string type 이 아닌 json object 로 설정 할 때.
		popStyle : {
			layerStyle: "", // .layerPopup style
			headerStyle: "", // .header_p style
			headerDivStyle: "", // .header_p div style
			contStyle: "", // .content_p style
			footerStyle: "", // .footer_p style
			footerDivStyle: "", // .footer_p > div style
			footerBtnStyle: "", // .footer_p div .popBtn style
			closeImgStyle: "", // #simplemodal-container a.modalCloseImg style
			closeHtml: "" // #simplemodal-container a.modalCloseImg html
		}
		bSyncAlertBtn	: false,	// type == alert 창에서 확인버튼(첫번째버튼)의 이벤트를 X 버튼에서 적용할지 여부 
		onClose	: function(){} // 팝업창이 닫힐 때 이벤트
	*/
	$.alert  = function($opts,$callback){	
		$defaults.modalId = "_ALERT_OK_LAYER_";
		$defaults.subStyle = {"text-align": "center","font-weight": "bold"};    
		var $options = $opts;
		if(typeof($opts)==="string"){
			var sParam = $opts;
			if(sParam.substring(0,1)=="#"){				
				var $obj = $.MSG_OBJ[sParam.getJqryId()];
				if($obj){
					$obj.bCreateHtml = false;
				}else{
					$obj		= {};
					$obj.msg	= sParam;
				}
				$obj.modalId	= sParam;
				$opts = $.extend({},$defaults, $obj);	
			}else{
				$opts 			= {msg : sParam};
				//$opts.title 	= "알림";
			}
			$opts.subMsg	= "";
			$opts.capBtn2 	= "";
			//$opts.msg 		= $opts;
			$options = $.extend({},$defaults, $opts);
		}
		if($callback!=undefined){
			$options.sCallbackBtn1 	= $callback;
		}
		$options.type		= "alert";
		$options.nFcsBtnIdx	= 1;
		$options = $.extend({},$defaults, $options);
		return $.showMsg($options);
	};
	$.confirm  = function($opts,$callback1,$callback2){	
		$defaults.modalId	= "_CONFIRM_YESNO_LAYER_";
		$defaults.clsBtn1	= "btn_table4";
		$defaults.msgColor	= "#666";			
		var $options = $opts;
		if(typeof($opts)==="string"){
			var sParam = $opts;
			if(sParam.substring(0,1)=="#"){		
				var $obj = $.MSG_OBJ[sParam.getJqryId()];
				if($obj){
					$obj.bCreateHtml = false;
				}else{
					$obj		= {};
					$obj.msg	= sParam;
				}
				$obj.modalId	= sParam;
				$opts = $.extend({},$defaults, $obj);	
				//$opts 			= {modalId : sParam};
				//$opts.title 	= gfnNvl($(".popTitle",$(sParam)).html(),"확인");				
			}else{
				$opts 			= {msg : sParam};
			}			
			$opts.capBtns 		= "확인,취소";
			$options = $.extend({},$defaults, $opts);
		}
		$options.type		= "confirm";
		$options.nFcsBtnIdx	= 2;
		$options = $.extend({},$defaults, $options);
		if($callback1!=undefined){
			$options.sCallbackBtn1 	= $callback1;
		}
		if($callback2!=undefined){
			$options.sCallbackBtn2 	= $callback2;
		}
		return $.showMsg($options);
	};
	$.createMessage = function($opts){
		var $options = $.extend({},$defaults, $opts);
		$options.bCreateHtml = true;
		return $.showMsg($options);
	};
	$.responseMessage = function(response, $opts){
		$opts = $.extend({},$opts);
		var title = "";
		if($(".tabContainer").length>0 && $(".tabContainer:visible").length>0){
			if($(".tabContainer:visible").length==1){
				title = $(".tabContainer:visible .tabmenu .tabArea.selected a").html();
			}			
		}else
		if($("#content .h3_tit:eq(0) img").length>0 && $("#content .h3_tit:eq(0) img").attr("alt").length>0){
			title = $("#content .h3_tit:eq(0) img").attr("alt");
		}else{
			title = $defaults.title;
		};
		$opts.msg		= response.sysMsg;
		$opts.subMsg	= response.sysSubMsg;
		$opts.code		= response.sysMsgCode;		
		$opts.title		= title;
		$opts.subColor	= "#666";
		$opts.subStyle	= {"margin-top": "17px","text-align": "center"};		
		switch ($opts.code)
		{
			case "5762": $opts.msg = "조회가 계속됩니다. 다음 버튼을 누르십시오."; break; // 홈페이지에서는 PgDg 이 없으므로 메세지강제 수정함.
			default    : break;
		}
		if($opts.code != "5766"){
			return $.alert($opts);
		}
    	return "";

	};
	$.fn.setCssStyle = function(css_style){
		if(typeof(css_style)==="object"){
			$(this).css(css_style);
		}else
		if(typeof(css_style)==="string"){
			var style = gfnNvl($(this).attr("style"));
			style += (isNull(style)?"":";");
			$(this).attr("style",style+css_style);
		}
	};
	$.closeModal = function(){
		$.modal.close();
	};
	$.showMsg = function($opts){

		$options = $.extend({},$defaults, $opts);

		var bExceptExist= false;
		var $msgLayer	= [];
		var msgLayerId	= $.trim($options.modalId);
		var sPreLayerId	= "_MODAL_POPUP_LAYER_";

		var title		= $.trim($options.title);
		var msg			= $.trim($options.msg);
		var subMsg		= $.trim($options.subMsg);
		var code		= $.trim($options.code);

		if(msgLayerId!=""){
			var $obj = $.MSG_OBJ[msgLayerId.getJqryId()];
			$options = $.extend({}, $obj, $options);
		}
		$options.width = gfnNvl($options.width,"auto");
						
		if(isNotNull($options.popStyle)){

			if(typeof($options.popStyle)==="string"){

				var popStyle = {
						layerStyle: {"border": "2px solid #3b3f50", "border-radius": "7px", "box-shadow": "5px 5px 10px #3b3f50", "background": "none"}, // .layerPopup style
						headerStyle: {"background-color": "#3b3f50", "background-image": "url('')"}, // .header_p style
						headerDivStyle: "background: none;", // .header_p div style
						contStyle: "border: 0px;", // .content_p style
						footerStyle: "background-color: #fff; border-bottom-left-radius: 7px; border-bottom-right-radius: 7px; background-image: url('');", // .footer_p style
						footerDivStyle: "background: none;", // .footer_p > div style
						footerBtnStyle: "background: none;", // .footer_p div .popBtn style
						closeImgStyle: "background: none; background-color: transparent; font-weight: bold; color: #fff; font-size: 14px; font-family: unset; line-height: 13px;", // #simplemodal-container a.modalCloseImg style
						closeHtml: "X" // #simplemodal-container a.modalCloseImg html
					};

				if($options.popStyle.length==7 && $options.popStyle.substr(0,1)=="#"){
					popStyle.layerStyle["border"] = "2px solid "+$options.popStyle;
					popStyle.headerStyle["background-color"] = $options.popStyle;
				}else
				if($options.popStyle=="blue"){

					popStyle.layerStyle["border"] = "2px solid #123478";
					popStyle.headerStyle["background-color"] = "#123478";
					
				}else
				if($options.popStyle=="yellow"){

					popStyle.layerStyle["border"] = "2px solid #8f784b";
					popStyle.headerStyle["background-color"] = "#8f784b";
					
				}else
				if($options.popStyle=="green"){

					popStyle.layerStyle["border"] = "2px solid #476600";
					popStyle.headerStyle["background-color"] = "#476600";
					
				}else
				if($options.popStyle=="khaki"){

					popStyle.layerStyle["border"] = "2px solid #247b8a";
					popStyle.headerStyle["background-color"] = "#247b8a";
					
				}else
				if($options.popStyle=="black"){
					popStyle.layerStyle["border"] = "2px solid #555";
					popStyle.headerStyle["background-color"] = "#555";

/*
					var popStyle = {
						layerStyle: "border: 2px solid #555; border-radius: 10px; background: none;", // .layerPopup style
						headerStyle: "background-color: #555; background-image: url('');", // .header_p style
						headerDivStyle: "background: none;", // .header_p div style
						contStyle: "border: 0px;", // .content_p style
						footerStyle: "background-color: #fff; border-radius: 10px; background-image: url('');", // .footer_p style
						footerDivStyle: "background: none;", // .footer_p > div style
						footerBtnStyle: "background: none;", // .footer_p div .popBtn style
						closeImgStyle: "background: none;    background-color: transparent; font-weight: bold; color: #fff; font-size: 14px; font-family: unset; line-height: 13px;", // #simplemodal-container a.modalCloseImg style
						closeHtml: "X" // #simplemodal-container a.modalCloseImg html
					};
					*/
						
				}
				$options.popStyle = $.extend({}, $options.popStyle, popStyle);
	
			}

		}
		
		try{
			if(msgLayerId==""){
				if(code==""){
					nShowMsgWinId++;
					msgLayerId = sPreLayerId + nShowMsgWinId.zf(3);
				}else{
					msgLayerId = sPreLayerId + code;
				}
				while($("#"+msgLayerId).length>0){
					nAlertWinId++;
					msgLayerId = sPreLayerId + nShowMsgWinId.zf(3);
				}
				$options.modalId = msgLayerId;
			}else
			// 팝업 레이어 아이디가 # 붙어서 들어오면 세팅하지 않고 바로 열기
			if(msgLayerId.length>0 && msgLayerId.substring(0,1)=="#"){
				$msgLayer = $(msgLayerId);
				if($msgLayer.length==0){
					msg = msgLayerId;
					/*
					alert("아이디 '"+msgLayerId+"' 객체가 없습니다. 확인하십시오.");
					bExceptExist = true;
					*/
					/*
					msgLayerId = msgLayerId.getJqryId();
					*/
					nShowMsgWinId++;
					msgLayerId = sPreLayerId + nShowMsgWinId.zf(3);
					while($("#"+msgLayerId).length>0){
						nAlertWinId++;
						msgLayerId = sPreLayerId + nShowMsgWinId.zf(3);
					}
					$options.modalId = msgLayerId;
					$options.msg = msg;
				}else{					
					msgLayerId = msgLayerId.getJqryId();
					return;
				}
			}
			msgLayerId = msgLayerId.getJqryId();
			// 기존팝업 제거 옵션
			if(eval($options.bAlwaysNew) && $("#"+msgLayerId).length>0){
				var _opt = $.MSG_OBJ[msgLayerId];
				if(typeof(_opt)=="object" && !eval(_opt.bCreateHtml)){
					$("#"+msgLayerId).remove();
				}
			}
			$.MSG_OBJ[msgLayerId.getJqryId()] = $options;
			// 신규 생성
			if($("#"+msgLayerId).length==0){
				//$msgLayer = $("#AlertConfirmLayer").clone();
				$msgLayer = $("<div></div>").addClass("layerPopup");
				$("<div></div>").addClass("header_p").append("<div><h4 class='popTitle'></h4></div>").appendTo($msgLayer);
				$("<div></div>").addClass("content_p").append("<p class='textAlert textMsg'></p>").append("<p class='textMsg_sub'></p>").appendTo($msgLayer);
				$("<div></div>").addClass("footer_p").append("<div><div class='popBtn t_c'><a href='#'><span>확인</span></a><a href='#'><span>취소</span></a></div></div>").appendTo($msgLayer);
				//$("<a></a>").addClass("popClose").attr({"href":"#"}).append("<img src='/include/images/btn/btn_popClose.gif' class='close_btn' alt='창 (레이어팝업) 닫기'>").appendTo($msgLayer);

				$msgLayer.css("display","none");
				$msgLayer.css("min-width","300px");
				$msgLayer.attr("id",msgLayerId);
				$msgLayer.attr("focusId",$options.focusId);
				
				if($options.width=="auto"){
					var doc_width = Math.trunc(window.innerWidth/3);
					var max_width = 500;
					$msgLayer.css("max-width", (doc_width<max_width?max_width:doc_width)+"px");
				}
				$msgLayer.css("width", $options.width);
				_fnButtonClickEvent = function (){
					/* trace("#### CallBack : msgLayerId : ["+msgLayerId+"] is empty Function.");*/ 
				};
				_fnButtonKeyupEvent = function (e){					
					if(!$options.bSpBarClose) return false;
					var strKeyCode;
					if(e == undefined) {
						event.returnValue=false;
						strKeyCode = window.event.keyCode;
					} else {
						e.preventDefault();
						strKeyCode = (e.keyCode ? e.keyCode : e.which);
					}
					if(strKeyCode=="32"){
						$(this).trigger("click");
						return false;
					}
				};
				var fnCallbackClose = function(){					 
					if($(this).closest('.popBtn').length>0 && $(this).is(":first-child")){
						var $layer = $(this).closest('.layerPopup');
						var focusId = $layer.attr("focusId");
						if("" != gfnNvl(focusId)){	
							if($("#" + focusId).is(":visible")){
								$("#" + focusId).focus();
							}else{
								setTimeout(function(){$("#" + focusId).focus();},500);
							}
						}
					}					
					if($options.bClickClose) {
						if($(this).closest("div.simplemodal-wrap").length>0){
							$.closeModal();
						}else{
							if($(this).closest("div.dim-layer").length>0){
								$(this).closest(".layerPopup").closest("div.dim-layer").fadeOut();
							}
						} 
					}
				}
				var fnCallbackBtn1= _fnButtonClickEvent;
				if(typeof($options.sCallbackBtn1)==="function"){
					fnCallbackBtn1=$options.sCallbackBtn1;
				}else
				if(typeof($options.sCallbackBtn1)==="string"){
					if($.trim($options.sCallbackBtn1)!=""){
						fnCallbackBtn1 = window[$options.sCallbackBtn1];
						if(!fnCallbackBtn1) fnCallbackBtn1 = _fnButtonClickEvent;
					}
				}
				var fnCallbackBtn2= _fnButtonClickEvent;
				if(typeof($options.sCallbackBtn2)==="function"){
					fnCallbackBtn2=$options.sCallbackBtn2;
				}else
				if(typeof($options.sCallbackBtn2)==="string"){
					if($.trim($options.sCallbackBtn2)!=""){
						fnCallbackBtn2 = window[$options.sCallbackBtn2];
						if(!fnCallbackBtn2) fnCallbackBtn2 = _fnButtonClickEvent;
					}
				}
				var $divMsg = $(".content_p",$msgLayer).empty();
				$("<p></p>").addClass("textAlert").addClass("textMsg").css("width", "100%").appendTo($divMsg);
				$("<p></p>").addClass("textMsg_sub").css({"font-weight":"bold","font-size":"14px","margin-top":"10px"}).appendTo($divMsg);
				if($.trim($options.contStyle)!=""){
					$divMsg.css($options.contStyle);
				}
				if($.trim($options.msgColor)!=""){
					$(".textMsg",$msgLayer).css("color",$options.msgColor);
				}
				if($.trim($options.subColor)!=""){
					$(".textMsg_sub",$msgLayer).css("color",$options.subColor);
				}
				var $divBtn = $(".popBtn",$msgLayer).css("padding-top","17px").empty();				
				var capBtns = $.trim($options.capBtns);
				var arrCaps = (capBtns==""?[]:capBtns.split(","));				
				if($.trim($options.capBtn1)!=""){
					if(arrCaps.length==0 || arrCaps[0]==undefined || $.trim(arrCaps[0])==""){
						arrCaps[0] = $.trim($options.capBtn1);					
					}
					capBtns = arrCaps.join(",");
				}
				if($.trim($options.capBtn2)!=""){
					if(arrCaps.length<2 || arrCaps[1]==undefined || $.trim(arrCaps[1])==""){
						arrCaps[1] = $.trim($options.capBtn2);					
					}
					capBtns = arrCaps.join(",");
				}
				if(arrCaps.length>0){
					var clsBtns = $.trim($options.clsBtns);
					var arrClss = (clsBtns==""?[]:clsBtns.split(","));

					var sCallbackBtns	= $options.sCallbackBtns;
					var arrCallback		= [];
					if(typeof(sCallbackBtns)==="object" && $.isArray(sCallbackBtns)){
						arrCallback = sCallbackBtns;
					}else
					if(typeof(sCallbackBtns)==="string"){
						sCallbackBtns	= $.trim(sCallbackBtns);
						arrCallback = (sCallbackBtns==""?[]:sCallbackBtns.split(","));
					}
					if(arrCaps.length>0){
						for(var i=0;i<arrCaps.length;i++){
							// class
							if(arrClss[i]==undefined){
								arrClss[i] = (i==0?$options.clsBtn1:$options.clsBtn2);
							}else
							if($.trim(arrClss[i])==""){
								arrClss[i] = (i==0?$options.clsBtn1:$options.clsBtn2);
							}
							// callback
							var fnCallbackBtn = _fnButtonClickEvent;
							if(arrCallback[i]==undefined){
								arrCallback[i] = (i==0?fnCallbackBtn1:fnCallbackBtn2);
							}else{
								
								if(typeof(arrCallback[i])==="function"){
									//continue;
								}else
								if(typeof(arrCallback[i])==="string"){
									if($.trim(arrCallback[i])==""){
										arrCallback[i] = (i==0?fnCallbackBtn1:fnCallbackBtn2);
									}else{
										fnCallbackBtn = window[arrCallback[i]];
										if(!fnCallbackBtn) fnCallbackBtn = (i==0?fnCallbackBtn1:fnCallbackBtn2);
										arrCallback[i] = fnCallbackBtn;
									}
								}								
							}
						}
						$options.sCallbackBtns = arrCallback;
					}					
					for(var i=0;i<arrCaps.length;i++){
						if($.trim(arrCaps[i])=="") continue;
						var $Spn = $("<span></span>").html($.trim(arrCaps[i]));
						var $Btn = $("<a href='#'></a>").addClass("fix70").addClass(arrClss[i]).css("margin","0px 5px").append($Spn).appendTo($divBtn)
						$Btn.on("click",arrCallback[i]).on("keyup",_fnButtonKeyupEvent);	
						if($options.bClickClose) {
							$Btn.addClass("modalPopupClose");
						}					
					}
					if(arrCaps.length==1){
						fnCallbackBtn1 = arrCallback[0];
						$(".modalCloseImg",$msgLayer).on("click",fnCallbackBtn1);
					}
				}else{
					var $Btn_1st = $("<a href='#'></a>").addClass("fix70").css("margin-right","5px").append("<span></span>").appendTo($divBtn); //$(".popBtn a:first-child",$msgLayer);
					var $Btn_2nd = $("<a href='#'></a>").addClass("fix70").css("margin-left","5px").append("<span></span>").appendTo($divBtn); //$Btn_1st.next("a");

					if($.trim($options.clsBtn1)!=""){
						$Btn_1st.removeClass("[class^='btn_'] [class^='btn-']").addClass($options.clsBtn1);
					}
					if($.trim($options.clsBtn2)!=""){
						$Btn_2nd.removeClass("[class^='btn_'] [class^='btn-']").addClass($options.clsBtn2);
					}						
					$("span",$Btn_1st).html($options.capBtn1);
					$("span",$Btn_2nd).html($options.capBtn2);
					if($.trim($options.capBtn1)==""){
						$Btn_1st.hide();
					}
					if($.trim($options.capBtn2)==""){
						$Btn_2nd.hide();
					}
					$Btn_1st.addClass("Btn_1st").removeAttr("onclick").off("click").on("click",fnCallbackBtn1).on("keyup",_fnButtonKeyupEvent);
					$Btn_2nd.addClass("Btn_2nd").removeAttr("onclick").off("click").on("click",fnCallbackBtn2).on("keyup",_fnButtonKeyupEvent);		
					if($options.bClickClose) {
						$Btn_1st.addClass("modalPopupClose");
						$Btn_2nd.addClass("modalPopupClose");
					}
					if($Btn_2nd.is(":visible")==false){
						$(".modalCloseImg",$msgLayer).on("click",fnCallbackBtn1);
					}

					var arrCallback		= [];
					if(typeof(fnCallbackBtn1)==="function"){
						arrCallback[0] = fnCallbackBtn1;
					}
					if(typeof(fnCallbackBtn2)==="function"){
						arrCallback[1] = fnCallbackBtn2;
					}
					$options.sCallbackBtns = arrCallback;
					
				}
				$(".modalCloseImg",$msgLayer).addClass("modalPopupClose");	
				$(document).on("show",("#"+msgLayerId),function(){					
					if($(".modalCloseImg",$msgLayer).hasClass("modalPopupClose")==false){
						//trace("SHOW = "+$(this).attr("id"));
						$(".modalCloseImg",$msgLayer).addClass("modalPopupClose");

						// close event
						$(".modalPopupClose",$msgLayer).on("click",fnCallbackClose);		
						if($options.type == "alert" && $options.bSyncAlertBtn){
							// alert click							
							if($(this).find('.popBtn > a').length==1){
								$(".modalPopupClose",$msgLayer).on("click",fnCallbackBtn1);	
							}
						}
					}

				});		
				$msgLayer.appendTo("body");

				$("#AlertConfirmLayer_title",$msgLayer).removeAttr("id");
				$("#AlertConfirmLayer_msg",$msgLayer).addClass("textMsg").removeAttr("id");
				$("#AlertConfirmLayer_closeBtn",$msgLayer).addClass("close_btn").removeAttr("id");

				if(isNotNull($options.contStyle)){
					$(".content_p",$msgLayer).setCssStyle($options.contStyle);
				}				
				if(isNotNull($options.msgStyle)){
					$(".textMsg",$msgLayer).setCssStyle($options.msgStyle);
				}				
				if(isNotNull($options.subStyle)){
					$(".textMsg_sub",$msgLayer).setCssStyle($options.subStyle);
				}
				if(isNotNull($options.footStyle)){
					$(".popBtn",$msgLayer).setCssStyle($options.footStyle);
				}
				
				if(isNotNull($options.popStyle) && typeof($options.popStyle)==="object"){
					
					if(isNotNull($options.popStyle.layerStyle)){
						$msgLayer.setCssStyle($options.popStyle.layerStyle);
					}
					if(isNotNull($options.popStyle.headerStyle)){
						$(".header_p",$msgLayer).setCssStyle($options.popStyle.headerStyle);
					}
					if(isNotNull($options.popStyle.headerDivStyle)){
						$(".header_p div",$msgLayer).setCssStyle($options.popStyle.headerDivStyle);
					}
					if(isNotNull($options.popStyle.contStyle)){
						$(".content_p",$msgLayer).setCssStyle($options.popStyle.contStyle);
					}
					if(isNotNull($options.popStyle.footerStyle)){
						$(".footer_p",$msgLayer).setCssStyle($options.popStyle.footerStyle);
					}
					if(isNotNull($options.popStyle.footerDivStyle)){
						$(".footer_p > div",$msgLayer).setCssStyle($options.popStyle.footerDivStyle);
					}
					if(isNotNull($options.popStyle.footerBtnStyle)){
						$(".footer_p div .popBtn",$msgLayer).setCssStyle($options.popStyle.footerBtnStyle);
					}
					if($("a.modalCloseImg",$msgLayer).length>0){
						if(isNotNull($options.popStyle.closeImgStyle)){
							$("a.modalCloseImg",$msgLayer).setCssStyle($options.popStyle.closeImgStyle);
						}
						if(isNotNull($options.popStyle.closeHtml)){
							$("a.modalCloseImg",$msgLayer).empty().append($options.popStyle.closeHtml);
						}
					}

				}

			}else{
			// 재활용
				msgLayerId = msgLayerId.getJqryId();
				$msgLayer = $("#"+msgLayerId);
				if($msgLayer.length==0){
					alert("아이디 '"+msgLayerId+"' 객체가 없습니다. 확인하십시오.");
					bExceptExist = true;
				}
			}

			$(".popTitle",$msgLayer).html(title);
			if(msg!=""){
				$(".textMsg",$msgLayer).css("width", "100%").html(msg);
			}
			$(".textMsg_sub",$msgLayer).hide();
			if(subMsg!=""){
				$(".textMsg_sub",$msgLayer).show();
				$(".textMsg_sub",$msgLayer).html(subMsg);
			}
			$(".close_btn",$msgLayer).attr("alt", title + " (레이어팝업) 닫기");	
			
		}finally{
						
			if($(".blockUI").length>0&&($.unblockUI)){
				$.unblockUI({});
			}
			if($('#UiBlockLayer:visible').length>0){
				$('#UiBlockLayer').fadeOut();
			}			
			//trace(JSON.stringify( $options ));			
			var nFcsBtnIdx	= eval(gfnNvl($options.nFcsBtnIdx,0));
			var nEndTimeout = 0;	
			var nEndBtnIdx  = 0;
			var nDelay	= 1000;		
			var fnInterval  = undefined;			
			if(typeof($options.nEndTimeout)==="object"){
				var $obj = $options.nEndTimeout;
				nEndTimeout = eval(gfnNvl($obj.nTimeout,nEndTimeout));
				nEndBtnIdx  = eval(gfnNvl($obj.nEndBtnIdx,nEndBtnIdx));
				nDelay   = eval(gfnNvl($obj.nDelay,nDelay));
				fnInterval  = $obj.fnInterval;
				if(typeof($obj.fnInterval)==="function"){
					fnInterval=$obj.fnInterval;
				}else
				if(typeof($obj.fnInterval)==="string"){
					if($.trim($obj.fnInterval)!=""){
						fnInterval = window[$obj.fnInterval];
					}
				}				
			}else{
				nEndTimeout = eval(gfnNvl($options.nEndTimeout,0));				
			}
			if($msgLayer.length==0)	$msgLayer = $(".layerPopup:visible");
			if($msgLayer.length!=1)	$msgLayer = $("#"+msgLayerId.getJqryId());
						
			if($options.bCreateHtml==false && bExceptExist==false){ 
				var strCloseHtml = '<a class="modalCloseImg" title="'+title+' (레이어팝업) 닫기"></a>';//$options.popStyle.closeHtml
				if(isNotNull($options.popStyle.closeImgStyle)){
					strCloseHtml = '<a class="modalCloseImg" style="'+$options.popStyle.closeImgStyle+'" title="'+title+' (레이어팝업) 닫기">X</a>';
				}
				var modalOpts = {
					msgLayerId: msgLayerId,
					closeEvent: $options.onClose,
					closeHtml: strCloseHtml,
					options: {persist: true,opacity:30,closeClass:"closePop2",closeText:$options.popStyle.closeHtml}
				};
				if($('.simplemodal-overlay:visible').length>0 || $('.simplemodal-container:visible').length>0){

					$options.sCallbackBtns = [];
					for(var i=0;i<$('.popBtn a',$msgLayer).length;i++){
						$options.sCallbackBtns[i] = $('.popBtn a',$msgLayer)[i].click;
					}
					$("#"+msgLayerId.getJqryId()).layerPopup($options);
					return msgLayerId;
				}
				gfn_modalPopup(modalOpts);
				var $popBtns = $('.popBtn a',$msgLayer);
				if(nFcsBtnIdx>0 && $popBtns.length>=nFcsBtnIdx){
					$popBtns.eq(nFcsBtnIdx-1).focus(); 
				}else{
					trace("버튼 갯수와 포커스 버튼 인덱스가 맞지 않음.(.popBtn).length ("+$popBtns.length +") < nFcsBtnIdx ("+nFcsBtnIdx+")");
				}
				// 창닫기  timeout
				if(nEndTimeout>0){
					var _hnd = undefined;
					if(fnInterval){
						_hnd = setInterval(fnInterval, nDelay);
						$popBtns.eq(nEndBtnIdx-1).on("click",function(){
							clearInterval(_hnd);
						});
					}
					setTimeout(function(){
						if(_hnd && fnInterval) clearInterval(_hnd);
						if(nEndBtnIdx>0){
							if($popBtns.length < nEndBtnIdx){
								trace("버튼 갯수와 이벤트 버튼 인덱스가 맞지 않음.(.popBtn).length ("+$popBtns.length +") < nEndBtnIdx ("+nEndBtnIdx+")");
							}
							$popBtns.eq(nEndBtnIdx-1).trigger("click");
						}else{
							$.closeModal();
						}
					},(nEndTimeout * 1000));
				}
			}
			return msgLayerId;
		};
	};
	$.fn.layerPopup = function(opts){

		//var $options = gfnNvl(opts,[]);
		var $options = (opts!=undefined?opts:[]);
		
		var $el = $(this);
		var isShow = $(this).is(":visible");
		$(this).unbind("show");
		if(isShow){
			$el = $(this).clone().attr("id","_LAYER_POPUP_").css("width",$(this).css("width"));
		}
	    if($el.closest(".dim-layer").length==0){
	    	$("<div></div>").addClass("dim-layer").append($el).appendTo("body");
	    }
	    if($el.closest(".dim-layer").length>0){
	    	if(!$el.prev().hasClass('dimBg')){
	    		$el.closest(".dim-layer").prepend($("<div></div>").addClass("dimBg"));
	    	}
	    }
	    
		$(".pop-layer").hide();
		if(!$el.hasClass("pop-layer")){
			$el.addClass("pop-layer");
		}
	    ($el.closest(".dim-layer")).css("z-index","25005");
	    $el.show();

	    var isDim = ($el.prev().hasClass('dimBg') && ($el.closest(".dim-layer").length>0));   //dimmed 레이어를 감지하기 위한 boolean 변수
	    isDim ? $el.closest(".dim-layer").fadeIn() : $el.fadeIn();
	    
	    $el.isDim = $el;

	    var $elWidth = ~~($el.outerWidth()),
	        $elHeight = ~~($el.outerHeight()),
	        docWidth = $(document).width(),
	        docHeight = $(document).height();
	    
	    // 화면의 중앙에 레이어를 띄운다.
	    if ($elHeight < docHeight || $elWidth < docWidth) {
	        $el.css({
	            marginTop: -$elHeight/2,
	            marginLeft: -$elWidth/2
	        });
	    } else {
	        $el.css({top: 0, left: 0});
	    }

		var arrCallback = $options.sCallbackBtns;
		if(arrCallback==undefined) arrCallback=[];
		if(arrCallback.length>0){
			$el.find(".popBtn a").removeClass("modalPopupClose").addClass("layer_Close");
			for(var i=0;i<arrCallback.length;i++){
			    $el.find(".layer_Close:eq("+(i+1)+")").unbind().bind("click", arrCallback[i]).bind("click", function(){
			    	$el.isDim ? $el.closest(".dim-layer").fadeOut() : $el.fadeOut();
			        return false;
			    });
			}
		}else{
		    $el.find(".layer_Close").unbind().bind("click", function(){
		    	$el.isDim ? $el.closest(".dim-layer").fadeOut() : $el.fadeOut();
		        return false;
		    });
		}
	    
	    return $el;
	};
	$.fn.downloadExcel = function(args){
		var defaults = {
				fileName: 'ExcelExport.xls',
				sheetName: 'Export Sheet',
				//sheetTitle: 'Title',
				headerBgColor: 'cccccc',
				//headerTable: 'Export Sheet',
				successCallback: function(url){
					
				},
				failCallback: function(responseHtml, url){
					
				}
		};
		var http = $.extend({}, defaults, args);

		var fileNm = http.fileName;
		var _dot = fileNm.lastIndexOf(".");
		var _ext = http.fileName.substring(_dot,fileNm.length);
		http.sheetTitle = gfnNvl(http.sheetTitle,(fileNm.replace(_ext,"")));
		
		
		var $table = $(this);
		var $htable = $(this);
		var colNms = [];
		var colWts = [];
		var colAligns = [];
		var dataList = [];
		
		if(isNotNull(http.headerTable)){
			$htable = $(http.headerTable);
		}

		$htable.find("thead tr > th:not(.none-xls)").each(function(index){
			var colVal = gfnNvl($(this).text()).replace(/&/gi,'%26').replace(/\//gi,'%2F');
			if($.inArray(colVal,colNms)==-1){
				colNms.push(colVal);
				colWts.push($(this).css("width").replace(/[^0-9]/g,""));
			}
		});

		if(colNms.length==0){
			$table.find("tbody tr:first > td").each(function(index){
				var colVal = "컬럼 "+index;
				colNms.push(colVal);
				colWts.push($(this).css("width").replace(/[^0-9]/g,""));
			});
		}
		trace(JSON.stringify(colNms));
		trace(JSON.stringify(colWts));
		
		$table.find("tbody > tr:not(.none-xls)").each(function(row){
			
			if(eval(gfnNvl($(this).css("height").replace(/[^0-9]/g,""),0))>0){
				var objData = {};

				$("> td:not(.none-xls)",this).each(function(index){
					var colNm = gfnNvl(colNms[index]);
					var colId = "COLUMN_"+index;
					var cellVal = gfnNvl($(this).text());
					if($(this).children().find("select").length>0){
						cellVal = gfnNvl($(this).children().find("select option:selected").text());
					}else
					if($(this).children().find("input, textarea").length>0){
						$(this).children().find("input, textarea").each(function(){
							if($(this).is(":radio")||$(this).is(":checkbox")){
								cellVal = gfnNvl($(this).is(":selected").val());
							}else{
								cellVal = gfnNvl($(this).val());
							}
						});
					}
					if(isNotNull(colNm)){
						objData[colId] = cellVal;
					}
				});
				
				dataList.push(objData);				
			}
			
		});

		if(eval(gfnNvl($table.find("tbody tr:first").css("height").replace(/[^0-9]/g,""),0))>0){
			$table.find("tbody tr:first > td:not(.none-xls)").each(function(index){
				colAligns.push($(this).css("text-align"));
			});
		}else{
			$table.find("tbody tr:last > td:not(.none-xls)").each(function(index){
				colAligns.push($(this).css("text-align"));
			});
		}

		trace(JSON.stringify(colAligns));
		//trace("dataList : ");
		//trace(dataList);
		
		if(dataList.length==0){
			alert("유효한 데이터가 없습니다. 확인하십시오.");
			return;
		}
		//encodeURI
		var params = {
				fileName: (gfnNvl(http.fileName,"ExcelExport.xls")),
				sheetName: http.sheetName,
				sheetTitle: gfnNvl(http.sheetTitle,http.sheetName),
				headerBgColor: http.headerBgColor,
				col_size: colNms.length,
				row_size: dataList.length,
				jsonColNms: (JSON.stringify(colNms)),
				jsonColWts: (JSON.stringify(colWts)),
				jsonColAligns: (JSON.stringify(colAligns))
		};

		var $form = $("form#frmFileDownload");
		if($form.length==0){
			$form = $("<form></form>").attr({"id":"frmFileDownload"}).appendTo("body");
		}
		$form.attr({"method":"POST","action":"/openbank/downloadExcel.do","target":"_export_excel"});
		$form.empty();
		/*
		$.each(params,function(key,val){
			$form.addHidden(key,val);
		});
		*/
		$form.addHidden("json",JSON.stringify(params));

		$.each(dataList,function(row,data){
			$.each(data,function(key,val){
				//trace(key+" = "+val);
				//$form.addHidden(key,val);
				$("<input></input>").attr({"type":"hidden","name":key}).val(val).appendTo($form);
			});

		});
		
		$form.submit();
		//ajax_fileDownload("",[params, dataList]);
		
		
	};
})(jQuery);
var xmlToString = function($node,level){
	var xml = "";
	var lv = level||0;
	var nodeNm = $node.nodeName;
	var nodeVal = $node.nodeValue;
	var nodeAttrs = $node.attributes;
	var nodeChilds = $node.childNodes;
	var str_attrs = "";
	var str_childs = "";
	if(nodeNm=="#text"){ return nodeVal;}
	var tab = "";
	for(var t=0;t<lv;t++) tab += "\t";
	if(!isNull(nodeAttrs)){
		if(nodeAttrs.length>0) str_attrs = " ";
		for(var i=0;i<nodeAttrs.length;i++){
			var attr = $node.attributes[i];
			if(!isNull(str_attrs)) str_attrs += " ";
			str_attrs += "{0}=\"{1}\"".format(attr.nodeName,attr.nodeValue);
		}
	}
	var txtLen = 0;
	if(nodeChilds.length>0){
		//str_childs += "\n\t"+tab;
		for(var i=0;i<nodeChilds.length;i++){
			if(nodeChilds[i].nodeName=="#text"){txtLen++;}
			str_childs += xmlToString(nodeChilds[i],lv+1);
		}
	}
	if(txtLen==0 && nodeChilds.length>0) str_childs += "\n"+tab;
	var node_val = gfnNvl(str_childs,nodeVal);
	//trace(node_val);
	xml = "\n{3}<{0}{1}>{2}{4}</{0}>".format(nodeNm,str_attrs,node_val,tab,(isNull(nodeVal)||nodeChilds.length==0?"":""));
	return xml;
};
var arrayToXML = function($obj,nodeNm,$xml,$options){
	var strXml = "<{0}><ColumnInfo/><Rows/></{0}>".format(isNull($xml)?"Dataset":gfnNvl(nodeNm,"Dataset"));
	if(isNull($xml)){
		var xmlDoc = $.parseXML(strXml);
		$xml = $(xmlDoc);
	}
	var data = $obj;
	var ds_id = gfnNvl(nodeNm);
	if(isNull(ds_id)&&!$.isArray($obj)){
		var $table = $obj.getTable();
		if(!isNull($table)&&$table.is("table")){
			ds_id = $table.attr("id");
			data = $table.getData();
		}
	}
	$xml.find("Dataset").attr("id",ds_id).attr("rowcount",data.length);	
	if(!$.isArray(data)){
		return jsonToXML($obj,nodeNm,$xml,$options);
	}
	var $defaults = {
			sort_col: "" 
			,sort: -1 // 0 acsending, 1 desending , -1 no sort
			,column_sort: -1 // 0 acsending, 1 desending , -1 no sort
			,columns: []
	};
	var $options = $.extend({}, $defaults, $options);
	try{
		// data sort
		if($options.sort>-1 && !isNull($options.sort_col)){
			var prop = $options.sort_col;
			data.sort(function(a,b){
				if($options.sort==0){
					return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
				}else{
					return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
				}
			});	
			
		}		
		$xml.find("Dataset").attr("id",ds_id).attr("rowcount",data.length);			
		var arr_columns = [];		
		var arr_columns_typ = [];
		
		if(!isNull($options.columns)&&typeof($options.columns)==="string"){
			$options.columns = $options.columns.split(",");
		}
		$.each(data,function(key,row){
			if(typeof(row)=="string"){
				
			}else
			if($.isArray($options.columns)&&$options.columns.length>0){
				$.each($options.columns,function(idx,key){
					if(arr_columns.indexOf(key)==-1){
						arr_columns.push(key);
						var column_type = typeof(row[key]);
						if($.isArray(row[key])) column_type = "array";
						arr_columns_typ.push(column_type);
					}
				});				
			}else
			$.each(row,function(key,value){
				if(arr_columns.indexOf(key)==-1){
					arr_columns.push(key);
					var column_type = typeof(row[key]);
					if($.isArray(row[key])) column_type = "array";
					arr_columns_typ.push(column_type);
				}
			});
		});
		if($options.column_sort>-1&&arr_columns.length>0){
			arr_columns.sort();
			if($options.column_sort==1){
				arr_columns.reverse();
			}
		}
		//trace(nodeNm+" >>> arr_columns.length >>> "+arr_columns.length);
		if(arr_columns.length==0){
			$("ColumnInfo",$xml).remove();
		}		
		$.each(arr_columns,function(key,value){							
			$("ColumnInfo",$xml).append($("<Column/>",$xml).attr("id",value).attr("type",arr_columns_typ[key]));
		});
		//trace(nodeNm+" >>> data.length >>> "+data.length);
		var $Rows = $("Rows",$xml);
		$.each(data,function(idx,row){			
			var $row = $("<Row/>",$xml).attr("index",idx).appendTo($Rows);
			if(arr_columns.length==0){
				$("<Col/>",$xml).attr("id",arr_columns[key]).text(gfnNvl(row,"null")).appendTo($row);
			}else
			$.each(arr_columns,function(key){
				var txt = row[arr_columns[key]];
				if(typeof(txt)==="object"){
					var $col = $("<Col/>",$xml).attr("id",arr_columns[key]).appendTo($row);
					var x = jsonToXML(txt, typeof(txt), null, $options);
					txt = (new XMLSerializer()).serializeToString(x.context);
					$(txt,$col).appendTo($col);
				}else{
					$("<Col/>",$xml).attr("id",arr_columns[key]).text(gfnNvl(txt,"null")).appendTo($row);
				}
			});
		});	
		//xml = (new XMLSerializer()).serializeToString($xml.context);
	}catch(e){trace("error : "+e.message);}
	return $xml;
};
var jsonToXML = function($json, nodeNm, $xml, $opts){
	var strXml = "<{0}/>".format(nodeNm);
	if(isNull($xml)){
		var xmlDoc = $.parseXML(strXml);
		$xml = $(xmlDoc);
	}
	if(typeof($json)=="string"){
		var strXml = "<{0}/>".format(nodeNm);
		$(strXml,$xml).text($json).appendTo($xml);
	}else
	if(typeof($json)=="object"){	
		$(strXml,$xml).appendTo($xml);
		if($("form,input,select,textarea",$json).length>0){
			$xml = $json;
		}else
		if($.isArray($json)){
			
			var dsIdPrefix = gfnNvl($opts.ds_prefix,"output");
			var nodeNm2 = dsIdPrefix+"1";

			if($.isArray($json[0])&&$json[0].length>1){
				for(var i=0;i<$json.length;i++){
					nodeNm2 = dsIdPrefix+(i+1);
					var x = arrayToXML($json[i], nodeNm2, null, $opts);//$(nodeNm,$xml2));
					var txt = (new XMLSerializer()).serializeToString(x.context);
					$(txt,$xml).appendTo($(nodeNm,$xml));
				}
			}else{
				var x = arrayToXML($json, nodeNm2, null, $opts);
				var txt = (new XMLSerializer()).serializeToString(x.context);
				$(txt,$xml).appendTo($(nodeNm,$xml));
			}
		}else{
			for(var node in $json){
				jsonToXML($json[node], node, $(nodeNm,$xml), $opts);
			};
		}
	}
	return $xml;
};
function notice_setCookie( name, value, expiredays )
{
	if(expiredays){
		var todayDate = new Date();
		todayDate.setDate( todayDate.getDate() + expiredays );
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
	}
};
function getCookie( name ) {
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length )
	{
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie )
		{
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 )
			break;
	}
	return "";
};
// window.open screen center position...
function gfnCenterPopup(pop_url,cookie_id,pop_width,pop_height,pop_options){
	var wt = pop_width;
	var ht = pop_height;

	// 스크린 크기
	var sw = screen.availWidth;
	var sh = screen.availHeight;

	// 창 포지션
	var px = Math.floor((sw-wt)/2);
	var py = Math.floor((sh-ht)/2);
	
	var opt = pop_options;

	var options = "left="+px+",top="+py+",width="+wt+",height="+ht+(isNull(opt)?"":",")+opt;
	window.open(pop_url, cookie_id, options).focus();
};
//리서치 저작권 경고
function gfnCopyrightWarning(){
	var cookie_id = "modal_copyright_warning_202010";
	if(getCookie(cookie_id)!=="done"){
		var opts = {
				title : "저작권 경고",
				msg : "<img src='/notice/images/popup_copyrightwarning.gif'  alt='저작권 경고 COPYRIGHT WARNING 당사의 조사분석자료의 저작재산권은 당사에 있으므로, 당사의 허락없이 무단 복사,대여,배포 될 수 없습니다. 이를 위반한 경우 저작권법에 따라 법적 대응할 방침입니다.'/>&nbsp;",	// 서브메시지
				width: "425px",	
				capBtn1: "닫기",
				contStyle: {"padding": "5px"},	
				footStyle: "text-align: right !important;padding: 17px 0px 30px;",	
				//msgStyle: {'width': '100%','height': '530px','background': 'url(/notice/images/popup_copyrightwarning.gif) center no-repeat'},	
				msgStyle: {'width': '100%','height': '530px'},	
				subMsg: "<input type='checkbox' id='chk_copyright_warning' style='margin: 3px;' /><label for='chk_copyright_warning'>오늘하루 이 창을 열지 않기</label>",
				subStyle: {"position": "absolute", "padding": "30px 0px 0px 3px", "font-size":"11px"},
				bAlwaysNew: false,
				sCallbackBtn1:function(){
					var $layer = $(".layerPopup:visible");
					if($("#chk_copyright_warning",$layer).is(":checked")){
						notice_setCookie(cookie_id,"done",1);
					}
				},
				modalId : "MODAL_COPYRIGHT_WARNING_202010",	// 팝업 아이디
				nEndTimeout : 0
			};
		$.alert(opts);
	}	
}
// GW response.resultList 인덱스로 가져오기.
function gfnGetResultList(data,index){
	if(isNull(index)){trace("'index' is null.");return data;}
	return getResultData(data[index]);
}
//GW response.resultList 인덱스로 가져오기.
function gfnGetResultData(data,index){
	var rsData = undefined;
	if(index==undefined){
		if($.isArray(data)){
			if(data.length==1){
				rsData = data[0];
			}else{
				rsData = data;
			}
		}else{
			rsData = data;
		}
	}else{
		if($.isArray(data[index])){
			if(data[index].length==1){
				rsData = data[index][0];
			}else{
				rsData = data[index];
			}
		}else{
			rsData = data[index];
		}
	}
	return rsData;
}
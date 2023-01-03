function Request(){
	var requestParam ="";

	//getParameter 펑션
	this.getParameter = function(param){
		//현재 주소를 decoding
		var url = unescape(location.href);
		//파라미터만 자르고, 다시 &그분자를 잘라서 배열에 넣는다.
		var paramArr = (url.substring(url.indexOf("?")+1,url.length)).split("&");

		for(var i = 0 ; i < paramArr.length ; i++){
			var temp = paramArr[i].split("="); //파라미터 변수명을 담음

			if(temp[0].toUpperCase() == param.toUpperCase()){
				// 변수명과 일치할 경우 데이터 삽입
				requestParam = paramArr[i].split("=")[1];
				break;
			}
		}
		return requestParam;
	}
};

$(document).ready(function(){ 
	var request = new Request();
	var Iscd = request.getParameter("Iscd");

	$('#etnIscd').val(Iscd);

	// 최초 조회
	fnSearchEtnProdInfo();

	// 투자설명서 버튼 클릭 시 파일 다운로드
	$("#btnDownEtnTuja").click(function(){
		downloadEtnPdf("tuja");
	});
	
	// 투자설명서 버튼 클릭 시 파일 다운로드
	$("#btnDownEtnInfo").click(function(){
		downloadEtnPdf("jisu");
	});
	
	// 수익률 탭 차트 조회 기간 설정
	$('.datepicker_item > input').val($.datepicker.formatDate($.datepicker.ATOM, new Date()));

	$('.cal_item button').click(function(){
		$('.cal_item button').removeClass('active');
		$(this).addClass('active');
	});

	$("#btnOneWeek").click(function() { $("#staDate").val(gfnAddDate("d", -7, $("#finDate").val(), "-"));  });
	$("#btnOneMonth").click(function() { $("#staDate").val(gfnAddDate("m", -1, $("#finDate").val(), "-"));  });
	$("#btnThreeMonth").click(function() { $("#staDate").val(gfnAddDate("m", -3, $("#finDate").val(), "-"));  });
	$("#btnSixMonth").click(function() { $("#staDate").val(gfnAddDate("m", -6, $("#finDate").val(), "-"));  });
	$("#btnOneYear").click(function() { $("#staDate").val(gfnAddDate("yyyy", -1, $("#finDate").val(), "-"));  });
});

function downloadEtnPdf(type){
	var filePathPdf = "https://home.imeritz.com/include/ocw/";
	var fileName = $('#etnIscd').val();

	if (type == "tuja"){
		window.open(filePathPdf+"mbsim35801_etn_prospectus_" + fileName + ".pdf","","width=850, height=700, resizable=yes, scrollbars=yes, status=yes");
	} 
	if (type == "jisu"){
		window.open(filePathPdf+"mbsim35801_etn_index_" + fileName + ".pdf","","width=850, height=700, resizable=yes, scrollbars=yes, status=yes");
	}
}

//조회
function fnSearchEtnProdInfo() {
	var frmData = GatherValueETE(document.etnFrm,0,false);
	
	$.ajax({
		type: "POST",
	    async : true,
	    url: "https://etn.imeritz.com/etn/Etn070r.do",
	    dataType:"json",
	    timeout:30000,
	    data:frmData, 
		error:function(request, status, error){
			//fnAjaxError();
			//$.unblockUI();
		},
	    success: function(response, status, request ) {
	    	try{
				//결과가 정상일때...
		    	if(response.sysCode=='0'){
		    		
		    		if(response.resultList[0].length == 0) {
						alert('resultArryList return error');
					} else {
						
						for(var i = 0 ; response.resultList[0].length > i ; i++ ){// Outblock1
							if (response.resultList[0][i].Iscd != "") { 
								
								var data = response.resultList[0][i];

								$('#main_05').html(data.NmixName); // 기초지수
								$('#main_06').html(CutDecimalPoint(addZeroSign(data.MgriPayRate),2) + "%"); //운용보수
								$('#main_07').html(setHyphen(data.LstnDate)); //상장일
								$('#main_08').html(setHyphen(data.MtrtDate)); //만기일
								
								$('.tab01_td01').html(data.KorIssuAbwrName); // 상품명
								$('#tab01_td02').html(data.EtnProdSpftCntt); //상품특징
								$('#tab01_td03').html(data.EtnProdStrrCntt); //상품구조
								$('#tab01_td04').html(setHyphen(data.MtrtDate)); //만기일자
								$('#tab01_td05').html(data.DsmnShapCntt); //분배금형태내용
								$('#tab01_td06').html(data.LqtySplrName); //유동성공급자명
								$('#tab01_td07').html(commify(parseInt(data.PblcTtam)) + "원"); //발행총액
								
								$('#tab04_td01').html(data.NmixName); // 지수명
								$('#tab04_td02').html(data.IstuName); //산출 기관
								
								var cmttStnd = setHyphen(data.CmttStndDate) + ", " + commify(parseInt(data.CmttStndDatePrc)) + "pt";
								$('#tab04_td03').html(cmttStnd); //산출 기준일 및 가격
								
								$('#tab04_td04').html(setHyphen(data.OtsdCmttDate)); //공식 산출일
								
								var nmixStaTime = data.NmixCmttStaTime.substring(0,2) + ":" + data.NmixCmttStaTime.substring(2,4) + ":" + data.NmixCmttStaTime.substring(4,6);
								var nmixFinTime = data.NmixCmttFinTime.substring(0,2) + ":" + data.NmixCmttFinTime.substring(2,4) + ":" + data.NmixCmttFinTime.substring(4,6);
								var nmixCmttTime = nmixStaTime + " ~ " + nmixFinTime;
								var rmrk = "";
								if (data.Rmrk != "") {
									rmrk = data.Rmrk;
								}
								$('#tab04_td05').html(nmixCmttTime + "&nbsp;&nbsp;&nbsp;&nbsp" + rmrk); //지수 산출 시간
								
								//(data.Rmrk); //비고
								$('#tab04_td06').html(data.NmixCmttCntt); //지수 설명
								$('#tab04_td07').html(data.NmixCmttArexCntt); //지수 산출 산식	
								
								//(data.InvtManlFileName); //투자설명서파일명
								//(data.FndtNmixManlFileName); //기초지수설명서파일명
							}							 
						}
						
						for(var i = 0 ; response.resultList[1].length > i ; i++ ){// Outblock1
							if (response.resultList[1][i].PsntPrc != "") { 
								
								var data = response.resultList[1][i];
								
								$('#main_01').html(commify(parseInt(data.PsntPrc))); //현재가격
								//(data.PrdyVrss); //전일대비
								$('#main_02').html(commify(data.EtnIndtWrthAmt)); //실시간 지표가치
								$('#main_03').html(CutDecimalPoint(addZeroSign(data.Dprt),2) + "%"); //괴리율
								$('#main_04').html(commify(parseInt(data.StasSdpr))); //과표기준가
								$('#main_09').html(commify(data.Vol) + "주"); //거래량
								$('#main_10').html(CutDecimalPoint(addZeroSign(data.LpRlim),2) + "%"); //LP보유비율
							}							 
						}
						
						fnSearchEtnFidInfo();
						fnDrawChart();
		    		}
		    		
				}else{
					//commModalPop("메리츠증권" , response.sysMsg , response.sysSubMsg, response.sysMsgCode);
					alert("상품 조회에 실패하였습니다.");
					//$.unblockUI();
				}
	    	}catch(e){
				//commModalPop("메리츠증권" , "시스템에 오류가 발생하였습니다" , "" , "");
				alert("시스템에 오류가 발생하였습니다.");
				//$.unblockUI();
			}
		},
		beforeSend: function(){
			//$.blockUI({});
		},
		complete: function(){
			//$.unblockUI();
		}
	});
}

//조회
function fnSearchEtnFidInfo() {
	
	//$('#etnIscd').val($('#etnCode').val());
	
	var frmData = GatherValueETE(document.etnFrm,0,false);
	
	$.ajax({
		type: "POST",
	    async : true,
	    url: "https://etn.imeritz.com/etn/EtnEarningRate.do",
	    dataType:"json",
	    timeout:30000,
	    data:frmData, 
		error:function(request, status, error){
			//fnAjaxError();
			//$.unblockUI();
		},
	    success: function(response, status, request ) {
	    	try{
				//결과가 정상일때...
		    	if(response.sysCode=='0'){
		    		
		    		if(response.resultList[0].length == 0) {
						alert('resultArryList return error');
					} else {
						
						var data = response.resultList[0][1];
						var nav = commify(parseInt($.trim(data.FidCncnNav)));	// IIV
						var navDprt = data.FidCncnDprt; //괴리율

						$("#main_02").html(nav.replace(/-/gi, ""));
						$("#main_03").html(navDprt.substring(1) + "%");	
		    		}
		    		
				}else{
					//commModalPop("메리츠증권" , response.sysMsg , response.sysSubMsg, response.sysMsgCode);
					alert("상품 조회에 실패하였습니다.");
					//$.unblockUI();
				}
	    	}catch(e){
				//commModalPop("메리츠증권" , "시스템에 오류가 발생하였습니다" , "" , "");
				alert("시스템에 오류가 발생하였습니다.");
				//$.unblockUI();
			}
		},
		beforeSend: function(){
			//$.blockUI({});
		},
		complete: function(){
			//$.unblockUI();
		}
	});
}

function fnDrawChart() {
	var frmData = "strDate=" + $('#staDate').val() + "&finDate=" + $('#finDate').val() + "&etnIscd=" + $('#etnIscd').val();
	frmData = GatherValueEach(frmData);
	
	$.ajax({
		type: "POST",
	    async : true,
	    url: "https://etn.imeritz.com/etn/EtnHome002r.do",
	    dataType:"json",
	    timeout:30000,
	    data:frmData, 
		error:function(request, status, error){
			//fnAjaxError();
			//$.unblockUI();
		},
	    success: function(response, status, request ) {
	    	try{
				//결과가 정상일때...
		    	if(response.sysCode=='0'){

					if (response.resultList!=null && response.resultList.length == 0) {

						$("#chart_div").addClass("noviewed");
							
					} else {	
						$("#chart_div").removeClass("noviewed");
						try {								
							drawCompChart(response.resultList, $(".tab01_td01").html());
								
						} catch (e) {
							alert(e.message);
						}
					}
				}else{
					//commModalPop("메리츠 ETN" , response.sysMsg , response.sysSubMsg, response.sysMsgCode);
					alert("상품 조회에 실패하였습니다.");
					//$.unblockUI();
				}
	    	}catch(e){
				//commModalPop("메리츠 ETN" , "시스템에 오류가 발생하였습니다" , "" , "");
				alert("시스템에 오류가 발생하였습니다.");
				//$.unblockUI();
			}
		},
		beforeSend: function(){
			//$.blockUI({});
		},
		complete: function(){
			//$.unblockUI();
		}
	});
}

//차트 그리기 - 하이차트
function drawCompChart(rsltList, idxName){	// 기준가격 차트 출력
	
	var rowCount = formatNum(rsltList[0][0].RowCount);	
	var dateList = new Array();
	
	for (var i = 0; rowCount > i ; i ++) {
		var j = rowCount-i;
		var data = rsltList[0][j];
		dateList[i] = setHyphen($.trim(data.FidDate));
	}
	
	var etnPrice1List = new Array();
	
	for (var i = 0; rowCount > i ; i ++) {
		var j = rowCount-i;
		var data = rsltList[0][j];
		etnPrice1List[i] = formatNum((data.Nav).substring(1));
	}

	chart = new Highcharts.Chart({
      chart: {
          renderTo: 'chart_div',
          type: 'line',
          marginTop: 20
      },
      title: {
          text: ''
      },
      credits: {
          text: '',
          href: ''
      },
      xAxis: {
      	 categories: dateList,
      	 tickLength: 0,
      	 labels :{
               formatter: function() {
                   return '';
               }
      	 }
      },
      yAxis: {
          title: {
              text: ''
          },
          labels: {
              formatter: function() {
                  return this.value+'';
              },
              style: {
                  color: '#0e8e93'
              }
          }
      },
      series: [{
          name: idxName,
          data: etnPrice1List,
          marker: {
              enabled: false
          },
          yAxis: 0,
          type: 'line'
      }]
  });
}

//숫자 변환
function formatNum(str) {

  var num = $.trim(str);
   if (num == "") {

		num = 0;
	} else {
		num = parseFloat(num);
	}

  return num;
}





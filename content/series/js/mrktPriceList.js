// 기준일
function leadZero(num, n) {
	var leadZero = "";
	num = num.toString();
	if (num.length < n) { for (var i = 0; i < n - num.length; i++) leadZero += "0"; }
	return leadZero + num;
}

function dateWithZero() {
	var d = new Date();
	return (d.getFullYear() + "-" + leadZero((d.getMonth() + 1), 2) + "-" 
		+ leadZero(d.getDate(), 2) + "  " + leadZero(d.getHours(), 2) + ":" 
		+ leadZero(d.getMinutes(), 2) + ":" + leadZero(d.getSeconds(), 2));
}		

$(document).ready(function(){ 	
	// 기준일
	$('.price_top button span').text(dateWithZero); 

	// 최초 조회
	fnSearchEtnList();

	// 버튼 클릭 시 조회
	$(".price_top button").click(function(){
		fnSearchEtnList();
		$('.price_top button span').text(dateWithZero); 
	});	
});

function fnSearchEtnList(){
	
	var frmData = GatherValueETE(document.etnFrm,0,false);
	
	$.ajax({
		type: "POST",
	    async : true,
	    url: "https://etn.imeritz.com/etn/EtnPrice071.do",
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
		    		var etnList = "";
					var etnCard = "";

		    		if(response.outBlock1.resultList[0].length == 0) {
		    			$("#etnListTbody1").html("");
						$("#etnListTbody2").html("");
						$("#etnListTbody3").html("");
						$("#etnListTbody4").html("");
		    			etnList += "<tr><td colspan='6'>조회 내역이 없습니다.</td></tr>";
						$('#etnListTbody1').html(tbody);
						$('#etnListTbody2').html(tbody);
						$('#etnListTbody3').html(tbody);
						$('#etnListTbody4').html(tbody);
					} else {
						$("#priceCard").html("");
						$("#etnListTbody1").html("");
						$("#etnListTbody2").html("");
						$("#etnListTbody3").html("");
						$("#etnListTbody4").html("");
						
						// Outblock1
						for(var i = response.outBlock1.resultList[0].length-1 ; i >= 0 ; i-- ){
							var data = response.outBlock1.resultList[0][i];
							if (data.Iscd != "") { 
								etnList  = "<tr>";
								etnList += "<td><div><a href='../series/mrktPriceView.html?Iscd=" + data.Iscd +"'>"+ data.KorIssuAbwrName +"</a></div></td>";
								etnList += "<td><span class='" + data.Iscd + "_psntPrc'></span>";
								etnList += "<td><span class='" + data.Iscd + "_prdyVrss'></span>";
								etnList += "<td><span class='" + data.Iscd + "_iiv'></span>";
								etnList += "<td><span class='" + data.Iscd + "_dprt'></span>";
								etnList += "<td><span class='" + data.Iscd + "_stasSdpr'></span>";
								etnList += "</tr>";
							}
							$("#etnListTbody1").append(etnList);
							
							let Iscd1 = ["Q610042", "Q610005", "Q610003"];
							let Iscd2 = ["Q610001", "Q610002", "Q610003", "Q610004", "Q610007", "Q610008", "Q610009", "Q610010", "Q610018", "Q610019", "Q610020", "Q610021", "Q610022", "Q610023", "Q610024", "Q610025", "Q610037", "Q610038", "Q610039", "Q610040", "Q610045", "Q610046", "Q610047", "Q610048", "Q610049", "Q610050", "Q610051", "Q610052", "Q610055", "Q610056", "Q610057", "Q610058", "Q610059", "Q610060", "Q610061", "Q610062"];
							let Iscd3 = ["Q610011", "Q610012", "Q610013", "Q610014", "Q610016", "Q610015", "Q610017", "Q610026", "Q610028", "Q610027", "Q610029", "Q610030", "Q610031", "Q610034", "Q610035", "Q610036", "Q610041", "Q610042", "Q610043", "Q610044", "Q610053", "Q610054"];
							let Iscd4 = ["Q610005", "Q610006", "Q610032", "Q610033"];
							
							if (Iscd1.includes(data.Iscd)) {
								etnCard  = "<div class='swiper-slide'>";
								etnCard += "<a href='../series/mrktPriceView.html?Iscd=" + data.Iscd +"'>";
								etnCard += "<span class='price_badge'></span>";
								etnCard += "<h3>"+ data.KorIssuAbwrName +"</h3>";
								etnCard += "<dl>";
								etnCard += "<dt>현재가</dt>";
								etnCard += "<dd><h4 class='eng400 " + data.Iscd + "_psntPrc'></h4><span class='eng400 " + data.Iscd + "_prdyVrss'></span></dd>";
								etnCard += "</dl>";
								etnCard += "</a>";
								etnCard += "</div>";
								$("#priceCard").append(etnCard);
								$(".price_card .swiper-slide:eq(0)").find('.price_badge').text('원자재형');
								$(".price_card .swiper-slide:eq(1)").find('.price_badge').text('지수형');
								$(".price_card .swiper-slide:eq(2)").find('.price_badge').text('채권형');

							};
							
							if (Iscd2.includes(data.Iscd)) {
								$("#etnListTbody2").append(etnList);
							}; 
							
							if (Iscd3.includes(data.Iscd)) {
								$("#etnListTbody3").append(etnList);
							};
							
							if (Iscd4.includes(data.Iscd)) {
								$("#etnListTbody4").append(etnList);
							};
						}
						
						// slide
						var ww = $(window).width();
						var mySwiper = undefined;

						function initSwiper() {
							if (ww < 763 && mySwiper == undefined) {
								mySwiper = new Swiper(".price_card", {
									spaceBetween:25,
									autoplay: {
										delay: 8000,
										disableOnInteraction: false,
									},
									loop:false,
									pagination: {
										el: ".swiper-pagination",
										clickable: true
									},
								});
							} else if (ww >= 763 && mySwiper != undefined) {
								mySwiper.destroy();
								mySwiper = undefined;
							}
						}

						initSwiper();

						$(window).on('resize', function () {
							ww = $(window).width();
							initSwiper();
						});

						// total
						let listLength1 = $('#etnListTbody1 tr').length;
						let listLength2 = $('#etnListTbody2 tr').length;
						let listLength3 = $('#etnListTbody3 tr').length;
						let listLength4 = $('#etnListTbody4 tr').length;
						
						$('#tab1 .total strong, #tab1 .price_more span').html(listLength1);
						$('#tab2 .total strong, #tab2 .price_more span').html(listLength2);
						$('#tab3 .total strong, #tab3 .price_more span').html(listLength3);
						$('#tab4 .total strong, #tab4 .price_more span').html(listLength4);
						
						// more
						$('#etnListTbody1 tr').slice(0, 10).show();
						$('#etnListTbody2 tr').slice(0, 10).show();
						$('#etnListTbody3 tr').slice(0, 10).show();
						$('#etnListTbody4 tr').slice(0, 10).show();

						$('.price_more button').click(function(e){
							e.preventDefault();
							$(this).parents('.tab_cont').find('.price_table tbody tr:hidden').slice(0, 10).show(); 
							$(this).parents('.tab_cont').find('.price_more strong').html($(this).parents('.tab_cont').find('.price_table tbody tr:visible').length);
							/*if($(this).parents('.tab_cont').find('.price_table tbody tr:hidden').length == 0){
								alert('마지막 상품입니다.'); 
							}*/
						});
						
						// more count
						let moreLength1 = $('#etnListTbody1 tr:visible').length;
						$('#tab1 .price_more strong').html(moreLength1);

						let moreLength2 = $('#etnListTbody2 tr:visible').length;
						$('#tab2 .price_more strong').html(moreLength2);

						let moreLength3 = $('#etnListTbody3 tr:visible').length;
						$('#tab3 .price_more strong').html(moreLength3);

						let moreLength4 = $('#etnListTbody4 tr:visible').length;
						$('#tab4 .price_more strong').html(moreLength4);
						
						// Outblock2
						for(var i = 0 ; response.outBlock2.resultList[0].length > i ; i++ ){
							var data = response.outBlock2.resultList[0][i];
							var iscd = data.Iscd;
							
							$("." + iscd + "_psntPrc").html(commify(parseInt(data.PsntPrc)));
							$("." + iscd + "_prdyVrss").html(commify(parseFloat(data.PrdyVrss)));
							$("." + iscd + "_stasSdpr").html(commify(parseInt(data.StasSdpr)));
							//$("." + iscd + "_stasName").html(data.NmixName);
							$("." + iscd + "_prdyVrss").css("color","#e7280e");
							$("." + iscd + "_prdyVrss:contains('-')").css("color","#003399");
						}
						
						// Outblock3
						for(var i = 1 ; response.outBlock3.resultList[0].length > i ; i++ ){
							var data = response.outBlock3.resultList[0][i];
							var iscd = data.FidCncnIscd;
							var nav = commify(parseInt($.trim(data.FidCncnNav)));	// IIV
							var navDprt = data.FidCncnDprt; //괴리율
							
							$('.'+(iscd).trim()+"_iiv").html(nav.replace(/-/gi, ""));
							$('.'+(iscd).trim()+"_dprt").html(navDprt.substring(1)+ "%");
						}
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
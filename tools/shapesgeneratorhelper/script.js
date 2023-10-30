function calc(){
	var raw_data=document.getElementById("input").value;
	var data_list=raw_data.split("\n");
	var useful_list=[];
	for(var i=0;i<data_list.length;i++){
		if(data_list[i].startsWith("particle")){
			useful_list.push(data_list[i]);
		}
	}
	
	
	var particle=document.getElementById("particle").value;
	
	var very_useful_list=[[""]];
	for(var i=0;i<useful_list.length;i++){
		very_useful_list[i]=useful_list[i].split(" ");
		
		very_useful_list[i][1]=particle;
		//文字列を数字に変換
		very_useful_list[i][2]=parseFloat(very_useful_list[i][2].substring(1));
		very_useful_list[i][3]=0;
		very_useful_list[i][4]=parseFloat(very_useful_list[i][4].substring(1));
		very_useful_list[i][5]=parseFloat(very_useful_list[i][5]);
		very_useful_list[i][6]=parseFloat(very_useful_list[i][6]);
		very_useful_list[i][7]=parseFloat(very_useful_list[i][7]);
		very_useful_list[i][8]=parseFloat(very_useful_list[i][8]);
		very_useful_list[i][9]=parseFloat(very_useful_list[i][9]);
		
		//モード毎に変更
		var now=document.getElementById("select").innerHTML;
		if(now=="particleplay"){
			very_useful_list[i][0]="particleplay";
			very_useful_list[i][10]="通常";
		}else if(now=="particle(force)"){
		very_useful_list[i][10]="force";
		}else{
		}
		
		
	}
		
	var shiftx=parseFloat(document.getElementById("shiftx").value);
	var shifty=parseFloat(document.getElementById("shifty").value);
	var shiftz=parseFloat(document.getElementById("shiftz").value);
	var x=parseFloat(document.getElementById("coords1").value);
	var y=parseFloat(document.getElementById("coords2").value);
	var z=parseFloat(document.getElementById("coords3").value);
	var phi=parseFloat(document.getElementById("phi").value);
	var theta=parseFloat(document.getElementById("theta").value);
	
	
	
	for(var i=0;i<useful_list.length;i++){
		var tempr=distance(x,y,z,very_useful_list[i][2],very_useful_list[i][3],very_useful_list[i][4]);
		var temptheta=calcTheta(x,y,z,very_useful_list[i][2],very_useful_list[i][3],very_useful_list[i][4]);
		var tempphi=calcPhi(x,y,z,very_useful_list[i][2],very_useful_list[i][3],very_useful_list[i][4]);
		temptheta=temptheta+theta;
		tempphi=tempphi-phi;
		console.log(tempphi+" "+Math.sin(tempphi*Math.PI/180));
		very_useful_list[i][2]=round(shiftx+x+tempr*Math.cos(temptheta*Math.PI/180)*Math.cos(tempphi*Math.PI/180));
		very_useful_list[i][3]=round(shifty+y+tempr*Math.sin(temptheta*Math.PI/180));
		very_useful_list[i][4]=round(shiftz+z+tempr*Math.cos(temptheta*Math.PI/180)*Math.sin(tempphi*Math.PI/180));
		
		
	}
	
	var result="sequencecommand 0 "
	for(var i=0;i<very_useful_list.length;i++){
		for(var j=0;j<very_useful_list[0].length;j++){
			if(2<=j && j<=4 && document.getElementById("select2").innerHTML=="相対座標"){
				result+="~";
			}
			result=result+very_useful_list[i][j]+" ";
		}
		if(i!=very_useful_list.length-1){
			result=result+"& ";
		}
	}
	
	document.getElementById("answer").innerHTML=result;
	console.log(result);
	
}

//距離を計算
function distance(x,y,z,x2,y2,z2){
	return ((x2-x)**2+(y2-y)**2+(z2-z)**2)**(0.5);
	
}
//φを計算 (x,y,zが基準点)
function calcPhi(x,y,z,x2,y2,z2){
	if(x==x2){
		if(z2>=z){
			return 90;
		}else{
			return 270;
		}
	}
	return Math.atan((z2-z)/(x2-x))*180/Math.PI;
}

//θを計算 (x,y,zが基準点)
function calcTheta(x,y,z,x2,y2,z2){
	if(x==x2 && z==z2){
		if(y2>=z){
			return 90;
		}else{
			return 270;
		}
	}
	return Math.atan((y2-y)/(((z2-z)**2+(x2-x)**2)**0.5))*180/Math.PI;
}

function changeMode(){
	var now=document.getElementById("select").innerHTML;
	if(now=="particleplay"){
		document.getElementById("select").innerHTML="particle(force)";
	}else if(now=="particle(force)"){
		document.getElementById("select").innerHTML="particle(not force)";
	}else{
		document.getElementById("select").innerHTML="particleplay";
		
	}
	
}
function changeMode2(){
	var now=document.getElementById("select2").innerHTML;
	if(now=="相対座標"){
		document.getElementById("select2").innerHTML="絶対座標";
	}else{
		document.getElementById("select2").innerHTML="相対座標";
	}
	
}
function round(val){
	if(val<0.001 && val>-0.001)return 0;
	return (Math.round(val * 1000)) / 1000;
}
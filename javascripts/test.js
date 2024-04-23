document.addEventListener('DOMContentLoaded', () => {
    //縣市地區
    let selectCity = document.getElementById("selectCity");
    let selectArea = document.getElementById("selectArea");
    let postBtn = document.getElementById("postBtn");


    var options = {
        "taipei": ["全部","中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"],
        "xinpei": ["全部","板橋區", "新莊區", "中和區", "永和區", "土城區", "樹林區", "三重區", "新店區", "淡水區", "汐止區", "瑞芳區", "八里區", "林口區", "芦洲區", "五股區", "泰山區", "三峽區", "鶯歌區", "石碇區", "深坑區", "石門區", "坪林區", "平溪區", "雙溪區", "貢寮區", "金山區", "萬里區", "烏來區"],
        "counties": ["基隆市", "新竹市", "桃園市", "臺中市", "臺南市", "高雄市", "嘉義市", "新竹縣", "苗栗縣", "彰化縣", "南投縣", "雲林縣", "嘉義縣", "屏東縣", "宜蘭縣", "花蓮縣", "臺東縣", "澎湖縣"]
    };
    
    selectCity.addEventListener("change",function(){
        
        console.log("change");
        if(selectCity.value){
            selectArea.style.display = "inline-block";
        }else{
            selectArea.style.display = "none";
        }
        let opArea = options[selectCity.value];
        console.log(`可選擇${opArea}`);
        if(opArea){         
                  
            opArea.forEach((option) => {
                
                var opElement = document.createElement("option");
                opElement.textContent = option;
                opElement.value = option;
                selectArea.appendChild(opElement);
            });
            console.log("更新子選單");
        }
    })
    let area_result = [];
    selectArea.addEventListener("click", function(){
        let city_result = [];
        for(let i = 0; i < selectCity.length; i++){
            if(selectCity[i].selected){
                city_result.push(selectCity[i].value);
                      
            }
        }
        
        for(let i = 0; i < selectArea.length; i++){
             if(selectArea[i].selected){               
                area_result.push(selectArea[i].value);
                // if(this.click){
                //     area_result.pop(this);
                // } 
             }
        }
        console.log(`已選擇: ${area_result}`);
        
    })
    //程度
    let selectDegree = document.getElementById("selectDegree");
    selectDegree.addEventListener("click",function(){
        var degree_result = [];
        for(let i = 0; i < selectDegree.length; i++){
            if(selectDegree[i].selected){
                degree_result.push(selectDegree[i].value);
                      
            }
        }
        console.log(`已選擇: ${degree_result}`);
    })
    //
    postBtn.addEventListener("click",function(){
        opArea.style.display = "none";
        var tex = document.getElementById("areaOp");
        tex.textContent = (`已選擇${area_result.length}個: ${area_result}`);
        
        
        
    })
})
//get data
function getoldbonds(results) {
    console.log(results);
    var ctdata = results['ctData'];
    var startYear=results['startYear'];
    var endYear=results['endYear'];
    var baseCurrency=results['baseCurrency'];
    var curTypeSel=results['curTypeSel'].split(',');
    var datar=[];
for (var i=startYear; i<=endYear; i++){
        
            var data = new Array();
            data['id']=i;
            data['item']=i.toString(); 
            for(var j=0; j<curTypeSel.length; j++){
                data['B_'+curTypeSel[j]]=ctdata['B_'+curTypeSel[j]+'_'+i];
                data['R_'+curTypeSel[j]]=ctdata['R_'+curTypeSel[j]+'_'+i];
                data['I_'+curTypeSel[j]]=ctdata['I_'+curTypeSel[j]+'_'+i];
            }
            data['B_'+baseCurrency]=ctdata['B_'+baseCurrency+'_'+i];
            data['R_'+baseCurrency]=ctdata['R_'+baseCurrency+'_'+i];
            data['I_'+baseCurrency]=ctdata['I_'+baseCurrency+'_'+i];
            datar.push(data); 
    }
return datar;
}

function showData(results) {
    $("#additionalData").load("app/data/additional.html", function(){
    var ctdata=results["ctData"];
    // var baseCurrency=results['baseCurrency'];
    var bothCurr=results['bothCurr'].split(',');
    var currencies=results['currencies'];
    // var baseCurrencyName = $.grep(currencies, function(v) {
    //     return v.id === baseCurrency;
    // })[0]['value'];
    var cols=[];
    var columngroups=[];
    var tblcontrols="<tr>";
    for(var j=0; j<bothCurr.length; j++){
        var currencyName = $.grep(currencies, function(v) {
            return v.id === bothCurr[j];
        })[0]['value'];

        var ob=ctdata["OB_"+bothCurr[j]];
        if(ob===undefined)
            ob="";

        var checkedSR="";
        var editable=true;
        var cellclassname="";
        if(ctdata["RateType_"+bothCurr[j]]=="SR"){ checkedSR="checked"; editable=false; cellclassname="readonly";}
        
        var checkedYR="";
        var disabled="";
        if(ctdata["RateType_"+bothCurr[j]]=="YR"){ checkedYR="checked"; disabled="disabled"; }

        var avg=ctdata["Avg_"+bothCurr[j]];
        if(avg===undefined)
            avg="";

        tblcontrols+="<td class='box-shadow card backwhite'><b>"+currencyName+" (Million)</b><br/> \
        <div class='row'> \
         <div class='col-md-6'> \
         <span>Outstanding loans</span> \
         </div> \
         <div class='col-md-6'>\
         <input id='OB_"+bothCurr[j]+"' type='text' class='form-control' size='50' autocomplete='off' value='"+ob+"'/> \
         </div> \
         </div> \
        <div class='row'> \
         <div class='col-md-6'> \
             <span class='pure-radiobutton'> \
                 <input type='radio' id='SR"+bothCurr[j]+"' name='RateType_"+bothCurr[j]+"' "+checkedSR+" value='SR' onclick='setAvgType(this.id, false)'/><label for='SR"+bothCurr[j]+"'>Average Interest Rate</label> \
             </span> \
         </div> \
         <div class='col-md-6'>\
             <input id='Avg_"+bothCurr[j]+"' type='text' class='form-control' size='50' autocomplete='off' value='"+avg+"' "+disabled+"/> \
         </div> \
         </div> \
        <span class='pure-radiobutton'> \
             <input type='radio' id='YR"+bothCurr[j]+"' name='RateType_"+bothCurr[j]+"'  "+checkedYR+" value='YR' onclick='setAvgType(this.id, true)'/><label for='YR"+bothCurr[j]+"'>Yearly Interest Payment</label> \
         </span> \
         </td><td style='width:5px'></td>";

         columngroups.push(
            { text: currencyName +' (Million)', align: 'center', name: currencyName });

        cols.push({name:'B_'+bothCurr[j], columngroup:currencyName, editable:true, map: 'B_'+bothCurr[j], text:'Committed Issue'});
        cols.push({name:'R_'+bothCurr[j], columngroup:currencyName, editable:true, map: 'R_'+bothCurr[j], text:'Repayment'});
        cols.push({name:'I_'+bothCurr[j], columngroup:currencyName, editable:editable, cellclassname:cellclassname, map: 'I_'+bothCurr[j], text:'Return'});
    }
    // cols.push({name:'B_'+baseCurrency, map: 'B_'+baseCurrency, text:'B_'+baseCurrencyName});
    // cols.push({name:'R_'+baseCurrency, map: 'R_'+baseCurrency, text:'R_'+baseCurrencyName});
    // cols.push({name:'I_'+baseCurrency, map: 'I_'+baseCurrency, text:'I_'+baseCurrencyName});
    CreateGrid(cols, getoldbonds(results), columngroups);

    // var ob=ctdata["OL_"+baseCurrency];
    // if(ob===undefined)
    //     ob="";

    // var checkedSR="";
    // if(ctdata["RateType_"+baseCurrency]=="SR"){ checkedSR="checked"; }
    
    // var checkedYR="";
    // if(ctdata["RateType_"+baseCurrency]=="YR"){ checkedYR="checked"; }

    // var avg=ctdata["Avg_"+baseCurrency];
    // if(avg===undefined)
    // avg="";

    //     tblcontrols+="<td class='box-shadow card backwhite'><b>"+baseCurrencyName+" (Million)</b><br/> \
    //     <div class='row'> \
    //     <div class='col-md-6'> \
    //     <span>Outstanding loans</span> \
    //     </div> \
    //     <div class='col-md-6'>\
    //     <input id='OB_"+baseCurrency+"' type='text' class='form-control' size='50' autocomplete='off' value='"+ob+"'/> \
    //     </div> \
    //     </div> \
    //     <div class='row'> \
    //         <div class='col-md-6'> \
    //             <span class='pure-radiobutton'> \
    //                 <input type='radio' id='SR"+baseCurrency+"' name='RateType"+baseCurrency+"' value='RS' "+checkedSR+"/><label for='SR"+baseCurrency+"'>Average Interest Rate</label> \
    //             </span> \
    //         </div> \
    //         <div class='col-md-6'>\
    //             <input id='SteadyInf_"+baseCurrency+"' type='text' class='form-control' size='50' autocomplete='off' value='"+avg+"' /> \
    //         </div> \
    //     </div> \
    //     <span class='pure-radiobutton'> \
    //         <input type='radio' id='YR"+baseCurrency+"' name='RateType"+baseCurrency+"' value='YR' "+checkedYR+"/><label for='YI"+baseCurrency+"'>Yearly Interest Payment</label> \
    //     </span> \
    //     </td></tr>";
        $("#controls").append(tblcontrols);
})
}

function setAvgType(input, editable){
    var column=input.slice(2);
    $('#gsFlexGrid').jqxGrid('setcolumnproperty', 'I_'+column, 'editable', editable);
    $('#gsFlexGrid').jqxGrid('setcolumnproperty', 'I_'+column, 'cellclassname', editable==false ? 'readonly' : '');
    if(editable){
        $('#Avg_'+column).prop('disabled', 'disabled');
    }else{
        $('#Avg_'+column).removeAttr('disabled');
    }
}
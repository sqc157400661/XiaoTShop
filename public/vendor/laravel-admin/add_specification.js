function spec_info_data(goods_specification_vars,goods_specification_arr){
    var zuhe = [];
    for(var i in goods_specification_vars){
        zuhe.push(goods_specification_vars[i])
    }
    var result = Zuhe(zuhe)
    for(var i in result){
        var re_item_ids = result[i].split("_");
        var re_item_names ='';
        var goods_specification_names ='';
        var goods_specification_ids = '';
        var re_item_ids_str='';
        re_item_ids = quickSort(re_item_ids);
        for(var j in re_item_ids){
            re_item_ids_str += goods_specification_arr[re_item_ids[j]].itemId + '_';
            re_item_names += goods_specification_arr[re_item_ids[j]].itemName + '_';
            goods_specification_names += goods_specification_arr[re_item_ids[j]].specName + '_';
            goods_specification_ids += goods_specification_arr[re_item_ids[j]].specId + '_';
        }
        re_item_ids_str = removeLastStr(re_item_ids_str);
        re_item_names = removeLastStr(re_item_names);
        goods_specification_names = removeLastStr(goods_specification_names);
        goods_specification_ids = removeLastStr(goods_specification_ids);
        // 判断是否已有
        var oldDom = $('#'+re_item_ids_str)
        if(oldDom.length>0){
            oldDom.show().find('._remove_').val('0');
        }else{
            // 简化版渲染模板
            var my_html = html.replace(/<=name>/g, re_item_names).replace(/<=num>/g, i).replace(/<=goods_spec_item_ids>/g, re_item_ids_str);
            my_html = my_html.replace(/<=goods_spec_item_names>/g, re_item_names).replace(/<=goods_specification_names>/g, goods_specification_names).replace(/<=goods_specification_ids>/g, goods_specification_ids);
            $("#spec_list_show").append(my_html);
        }
    }
}


//接组合
function Zuhe(goods_specification){
    var heads=goods_specification[0];
    for(var i=1,len=goods_specification.length;i<len;i++){
        if(goods_specification[i].length){
            heads=addNewType(heads,goods_specification[i]);
        }
    }
    return heads;
};

function addNewType(heads,choices){
    var result=[];
    for(var i=0,len=heads.length;i<len;i++){
        for(var j=0,lenj=choices.length;j<lenj;j++){
            result.push(heads[i]+'_'+choices[j]);
        }
    }
    return result;
};

// 去除最后逗号
function removeLastStr(basic){
    basic = basic.substring(0, basic.lastIndexOf('_'));
    return basic
}

// 数组快速排序
function quickSort(arr){
//如果数组长度小于等于1，则返回数组本身
    if(arr.length<=1){
        return arr;
    }
    //定义中间值的索引
    var index = Math.floor(arr.length/2);
    //取到中间值
    var temp = arr.splice(index,1);
    //定义左右部分数组
    var left = [];
    var right = [];
    for(var i=0;i<arr.length;i++){
        //如果元素比中间值小，那么放在左边，否则放右边
        if(arr[i]<temp){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(temp,quickSort(right));
}

var html= '<tr id="<=goods_spec_item_ids>" data-has="0"><td><=name>' +
    '<input type="hidden" class="form-control" name="products[new_<=num>][goods_spec_item_ids]" value="<=goods_spec_item_ids>" >' +
    //'<input type="hidden" class="form-control id" name="products[new_<=num>][id]" value="0"  >' +
    '<input type="hidden" class="form-control _remove_" name="products[new_<=num>][_remove_]" value="0"  >' +
    '<input type="hidden" class="form-control" name="products[new_<=num>][goods_spec_item_names]" value="<=goods_spec_item_names>"  >' +
    '<input type="hidden" class="form-control" name="products[new_<=num>][goods_specification_names]"value="<=goods_specification_names>" >' +
    '</td><td><div class="input-group">' +
    '<input type="hidden" class="form-control" name="products[new_<=num>][goods_specification_ids]" value="<=goods_specification_ids>" ><span class="input-group-addon">$</span>' +
    '<input type="text" class="form-control" name="products[new_<=num>][retail_price]" value="0">' +
    '<span class="input-group-addon">元</span></div></td><td><div class="input-group">' +
    '<input type="text" class="form-control"  name="products[new_<=num>][goods_number]" value="100" ></div></td><td>' +
    '<div class="input-group"><input type="text" class="form-control"  name="products[new_<=num>][goods_sn]" value="goods_sn" ></div></td></tr>';
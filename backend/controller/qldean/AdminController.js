module.exports = async (callback, scanner) => {
    let index = scanner.req_bundle.index;
    let Model = scanner.inleModel;
    let head_params = scanner.head_params;
    
    if (index === 'admininfo'){

        let maQuanLy = head_params.get('maQuanLy');

        let result = await Model.InleSQL("SELECt * FROM quan_ly WHERE maQuanLy='"+maQuanLy+"'");
        callback(JSON.stringify(result), 'application/json');

    }

}
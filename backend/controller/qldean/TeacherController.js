module.exports = async (callback, scanner) => {
    let index = scanner.req_bundle.index;
    let Model = scanner.inleModel;
    let head_params = scanner.head_params;
    
    if (index === 'danhsachtatcadetai'){
        let limit = 2;
        let page = Number(head_params.get('page')) - 1;
        let count = await Model.InleSQL("SELECT COUNT(maDeTai) FROM de_tai;");
        let result = await Model.InleSQL("SELECT * FROM de_tai LIMIT "+limit+" OFFSET " + page*limit);
        callback(JSON.stringify([result, count[0]['COUNT(maDeTai)']]), 'application/json');
    }
}
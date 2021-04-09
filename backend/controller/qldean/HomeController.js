module.exports = async (callback, scanner) => {
    let index = scanner.req_bundle.index;
    let Model = scanner.inleModel;
    
    if (index === 'home'){
        let result = await Model.InleSQL("DELETE FROM customers WHERE address = 'Highway 37'");
        callback(JSON.stringify(result), 'application/json');
    }

}
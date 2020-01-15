module.exports = 
    function parseArrayAsString(array){
        return array.split(",").map((item) =>  item.trim());
    }

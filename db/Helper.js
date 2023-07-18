const Table = require('cli-table');

displayResults = (results) => {
    const table = new Table();
    const columnNames = Object.keys(results[0]);
    table.push(columnNames);

    results.forEach((row) => {
        let rowValues = Object.values(row);
        rowValues = rowValues.map((v) => v === null ? 'null' : v);
        table.push(rowValues);
    });
    console.log(...table);
}

getRowsValues = (results) => {
    const values = [];
    results.forEach((row) => {
        let rowValues = Object.values(row).toString();
        values.push(rowValues);
    })

    return values;

}
module.exports = { displayResults, getRowsValues };
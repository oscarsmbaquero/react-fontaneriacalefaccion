
import * as XLSX from 'xlsx/xlsx.mjs';

export function export_table_to_excel(data, columns, fileName) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
}

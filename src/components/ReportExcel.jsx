import React from 'react';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ReportExport = ({ data, columns, filename = 'report', type = 'product' }) => {
  const handleExcel = () => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, type);
    writeFile(workbook, `${filename}.xlsx`);
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    const tableData = data.map((item) =>
      columns.map((col) => item[col.key])
    );
    const tableHeaders = columns.map((col) => col.label);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save(`${filename}.pdf`);
  };

  return (
    <div className="flex gap-3 mb-4">
      <button
        onClick={handleExcel}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
      >
        Export to Excel
      </button>
      <button
        onClick={handlePDF}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
      >
        Export to PDF
      </button>
    </div>
  );
};

export default ReportExport;

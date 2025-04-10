import React from 'react';

const ExportData = () => {
  const handleExport = async () => {
    try {
      const response = await fetch('/api/exports/loans');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'loans.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleExport}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Export Loans Data
      </button>
    </div>
  );
};

export default ExportData;

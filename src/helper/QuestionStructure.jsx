import React from "react";

export function renderQuestionContent(questionText) {
    const lines = questionText.split("\n");
  
    // Detect table lines
    const tableLines = lines.filter(line => line.trim().startsWith("|") && line.includes("|"));
  
    if (tableLines.length >= 2) {
      const tableHtml = `
        <table class="table-auto border-collapse border border-gray-400 mx-auto my-1 text-sm">
          <thead>
            <tr>${tableLines[0].split("|").filter(Boolean).map(cell => `<th class="border px-2 py-1">${cell.trim()}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${tableLines.slice(2).map(row =>
              `<tr>${row.split("|").filter(Boolean).map(cell =>
                `<td class="border px-2 py-1">${cell.trim()}</td>`
              ).join("")}</tr>`
            ).join("")}
          </tbody>
        </table>
      `;
      const remainingText = lines.filter(line => !tableLines.includes(line)).join("\n");
      return (
        <div className="text-[16px] leading-relaxed whitespace-pre-wrap">
          <p>{remainingText}</p>
          <div dangerouslySetInnerHTML={{ __html: tableHtml }} />
        </div>
      );
    }
  
    return <div className="text-[16px] whitespace-pre-wrap">{questionText}</div>;
  }
  
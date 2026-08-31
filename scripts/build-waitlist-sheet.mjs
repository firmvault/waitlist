import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "outputs/01a052f3-e14b-7782-9c80-5fbeda90c78b";
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Waitlist");
sheet.showGridLines = false;

sheet.getRange("A1:I1").values = [[
  "Submitted At", "Work Email", "Firm Name", "Firm Type", "Team Size",
  "Phone", "Source", "Status", "Notes",
]];
sheet.getRange("A1:I1").format = {
  fill: "#152C24",
  font: { bold: true, color: "#FFFFFF" },
  rowHeight: 30,
  verticalAlignment: "center",
};
sheet.getRange("A2:I501").format = {
  fill: "#FFFFFF",
  font: { color: "#17211D" },
  borders: { preset: "inside", style: "thin", color: "#E6ECE8" },
};
sheet.getRange("A2:A501").format.numberFormat = "yyyy-mm-dd hh:mm";
sheet.getRange("H2:H501").dataValidation = {
  rule: { type: "list", values: ["New", "Contacted", "Qualified", "Closed", "Not a fit"] },
};
sheet.getRange("H2:H501").conditionalFormats.add("containsText", {
  text: "New", format: { fill: "#DFF3E8", font: { color: "#11633B", bold: true } },
});
sheet.freezePanes.freezeRows(1);
sheet.getRange("A:I").format.wrapText = true;
sheet.getRange("A:A").format.columnWidth = 20;
sheet.getRange("B:B").format.columnWidth = 28;
sheet.getRange("C:C").format.columnWidth = 24;
sheet.getRange("D:D").format.columnWidth = 18;
sheet.getRange("E:E").format.columnWidth = 14;
sheet.getRange("F:F").format.columnWidth = 16;
sheet.getRange("G:G").format.columnWidth = 18;
sheet.getRange("H:H").format.columnWidth = 14;
sheet.getRange("I:I").format.columnWidth = 32;

const preview = await workbook.render({ sheetName: "Waitlist", range: "A1:I12", scale: 1, format: "png" });
await fs.writeFile(`${outputDir}/FirmVault_Waitlist_preview.png`, new Uint8Array(await preview.arrayBuffer()));
const inspection = await workbook.inspect({ kind: "region", sheetId: "Waitlist", range: "A1:I6", maxChars: 3000 });
console.log(inspection.ndjson ?? inspection);
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(`${outputDir}/FirmVault_Waitlist.xlsx`);

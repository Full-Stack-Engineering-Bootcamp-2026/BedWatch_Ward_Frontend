import { convert } from "html-to-text";
import { saveAs } from "file-saver";

export const exportHtmlToText = (
  html: string,
  fileName: string = "export.txt",
) => {
  const text = convert(html, {
    wordwrap: false,
  });

  const blob = new Blob([text], {
    // blob is a browser object jo raw files store krta hai
    type: "text/plain;charset=utf-8",
  });

  saveAs(blob, fileName);
};

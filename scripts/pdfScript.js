function toggleCvPdf() {
  var pdfFrame = document.getElementById("cvPdfFrame");
  if (pdfFrame.style.display == "block") {
    pdfFrame.style.display = "none";
    return;
  }
  pdfFrame.style.display = "block";
  pdfFrame.src = "./cv/KeianBartonCVAug2017.pdf";
}

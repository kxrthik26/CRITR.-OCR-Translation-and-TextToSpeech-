const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchageIcon = document.querySelector(".exchange"),
selectTag = document.querySelectorAll("select"),
icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button"),

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "si-LK" ? "selected" : "" : country_code == "en-GB" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

fromText.addEventListener("keyup", () => {
    if(!fromText.value) {
        toText.value = "";
    }
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation;
            }
        });

        toText.setAttribute("placeholder", "Translation");
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(!fromText.value || !toText.value) return;
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});


/* Copies the output text to the clipboard */
function copyText(idName) {
    var r = document.createRange();
    r.selectNode(document.getElementById(idName));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

/* .txt format */
function saveAsText(idName1) {
    var txt = document.getElementById(idName1).value;
    var file = new Blob([txt],{type:"text"});
    var anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(file);
    anchor.download = "critr.txt";  /* Change file extension for different file formats */
    anchor.click();
}

/* .rtf format */
function saveAsRichText(idName1) {
    var txt = document.getElementById(idName1).value;
    var file = new Blob([txt],{type:"text"});
    var anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(file);
    anchor.download = "critr.rtf";  /* Change file extension for different file formats */
    anchor.click();
}

/* .pdf format */
function saveAsPDF(idName1) {
    var txt = document.getElementById(idName1).value;
    const doc = new jsPDF();
    doc.text(txt, 20, 20);
    /*doc.setFont("NotoSerifSinhala-Regular", 'normal');*/
    doc.save("critr.pdf");
    
    
}
/* .docx format */
function saveAsWord(element1, filename = ''){
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+ document.getElementById(element1).value+postHtml;

    var blob = new Blob(['\ufeff', html],{
        type: 'application/msword'
    });

    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)

    filename = filename?filename+'.doc': 'critr.doc';

    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        downloadLink.href = url;

        downloadLink.download = filename;

        downloadLink.click();
    }

    document.body.removeChild(downloadLink);


}


/* Print the output text */
function printText(idName, idName1) {
    var divContents = document.getElementById(idName).value;
    var a = window.open('', '');
    a.document.write(divContents + ("<br>") + document.getElementById(idName1).value);
    a.document.close();
    a.print();
}


/* Share to social media */

/* Share to Facebook */
function shareOnFacebook(idName) {
    const navUrl = 
    'https://www.facebook.com/sharer/sharer.php?u=' +
    document.getElementById(idName).value; 
    ;
    window.open(navUrl , '_blank');
} 

/* Share to Twitter */

function shareOnTwitter(idName) {
    const navUrl =
      'https://twitter.com/intent/tweet?text=' +
      document.getElementById(idName).value;
    window.open(navUrl, '_blank');
}
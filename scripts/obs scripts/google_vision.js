const detectImageForm = document.querySelector("#detectImageForm");

const imageFile = detectImageForm.querySelector("#imageFile");

const imagePreview = document.querySelector("#imagePreview");

const result = document.querySelector("#result");

const setImagePreview = async () => {
const imageBase64String = await getImageBase64String();
imagePreview.setAttribute("src", imageBase64String);
};

const detectImage = async () => {
    const imageBase64String = await getImageBase64String();
    const data = {
        requests: [
        {
            image: {
            content: imageBase64String.replace(/^data:.+;base64,/, "")
            },
            features: [{ type: "TEXT_DETECTION" }]
        }
        ]
};

const url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCywUjnUh_tl6Ahp2SWXu2Md7cAiK70XNU";

const response = await fetch(url, {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
});

const jsonResponse = await response.json();

for (const value of jsonResponse.responses) {
    console.log(value);
    result.textContent = value.fullTextAnnotation.text;
}
};

const getImageBase64String = async () => {
    return await toBase64(imageFile.files[0]);
};

const toBase64 = file =>
new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

imageFile.addEventListener("change", e => {
    setImagePreview();
});

detectImageForm.addEventListener("submit", e => {
    e.preventDefault();
    detectImage();
});
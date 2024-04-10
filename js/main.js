const canvas = new fabric.Canvas('canvas', {
    backgroundColor: '#fff',
    stopContextMenu: true
});

let file = document.getElementById('file');

file.addEventListener('change', function() {
    let img = file.files[0];
    if (!img) {
        return;
    }
    let reader = new FileReader();

    reader.onload = function(e) {
        let data = reader.result;
        fabric.Image.fromURL(data, function(img) {
            let maxWidth = 500;
            let maxHeight = 500;
            let scaleX = 1;
            let scaleY = 1;

            // Check if image width is greater than max width
            if (img.width > maxWidth) {
                scaleX = maxWidth / img.width;
            }
            // Check if image height is greater than max height
            if (img.height > maxHeight) {
                scaleY = maxHeight / img.height;
            }

            // Set the scale to the smaller of the two values
            let scale = Math.min(scaleX, scaleY);

            // Scale the image
            img.scale(scale);

            canvas.clear(); // Clear previous content
            canvas.setWidth(img.width * scale); // Set canvas width to scaled image width
            canvas.setHeight(img.height * scale); // Set canvas height to scaled image height
            canvas.add(img);
        }, { selectable: false });
    };

    reader.readAsDataURL(img);
});

let clearBtn = document.getElementById('clear');
let addTextBtn = document.getElementById('addText');
let textField = document.getElementById('text');
let colorField = document.getElementById('color');

clearBtn.addEventListener('click', function() {
    location.reload()
});

addTextBtn.addEventListener('click', function() {
    let text = new fabric.Text(textField.value, {
        left: 100,
        top: 100,
        fontSize: 50,
        fontFamily: "Impact",
        fill: colorField.value,
        fontWeight: 'bold',
        borderColor: 'red',
        stroke: "black",
        strokeWidth: 1.7
    });
    canvas.add(text);
});

window.addEventListener('keydown', function(e) {
    if (e.key == "Delete") {
        canvas.remove(canvas.getActiveObject());
    }
});

let saveBtn = document.getElementById('save');
saveBtn.addEventListener('click', function() {
    let data = canvas.toDataURL();
    let saveLink = document.createElement('a');
    saveLink.href = data;
    saveLink.download = 'meme.png';
    saveLink.click();
});
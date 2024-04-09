const canvas = new fabric.Canvas('canvas', {
    width: 500,
    height: 500,
    backgroundColor: '#fff',
    stopContextMenu: true
})

let file = document.getElementById('file')

file.addEventListener('change', function() {
    let img = file.files[0]
    if(!img){
        return
    }
    let reader = new FileReader()

    reader.onload = function(e){
        let data = reader.result
        fabric.Image.fromURL(data, function(img){
            canvas.add(img)
            if(img.width > canvas.width) {
                img.scaleToWidth(canvas.width, false)
            }
        }, {selectable: false})
    }

    reader.readAsDataURL(img)
})

let clearBtn = document.getElementById('clear')
let addTextBtn = document.getElementById('addText')
let textField = document.getElementById('text')
let colorField = document.getElementById('color')

clearBtn.addEventListener('click', function(){
    location.reload()
})

addTextBtn.addEventListener('click', function(){
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
    })
    canvas.add(text)
})

window.addEventListener('keydown', function(e){
    if(e.key == "Delete"){
        canvas.remove(canvas.getActiveObject())
    }
})

let saveBtn = document.getElementById('save')
saveBtn.addEventListener('click', function(){
    let data = canvas.toDataURL()
    let saveLink = document.createElement('a')
    saveLink.href = data
    saveLink.download = 'meme.png'
    saveLink.click()
})
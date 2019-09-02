window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition();
recognition.interimResults = true;

const div = document.querySelector('#div')
    let p = document.createElement('p')
    p.setAttribute("class", "p_class")

    let input = document.createElement('input')
    input.setAttribute("class", "btn btn-light mr-5 mb-3 mt-4")
    input.setAttribute("value", "Сохранить")
    input.setAttribute("id", "saveText")
    input.setAttribute("type", "submit")

    let inputText = document.createElement('input')
    inputText.setAttribute("class", "form-control mb-5")
    inputText.setAttribute("placeholder", "Введи название заметки")
    inputText.setAttribute("id", "nameText")

    // div.appendChild(p)
recognition.lang = 'ru-Ru';

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('')
    console.log(transcript)
    if(transcript === "закончить запись"){
        save()
    }
    // if(transcript === "название записи"){
    //     let inputT = document.getElementById("nameText")
    //     inputT.innerText += transcript
    //     console.log(inputT)
    // }
    p.textContent = transcript
    if (e.results[0].isFinal) {
        p = document.createElement('p')
        p.setAttribute("class", "p_class")
        div.appendChild(p)
    }
})

const save = async () => {
    let notes = Array.from(document.getElementsByClassName("p_class"))
    let note = ""

        notes.forEach(e => {
            note += e.innerText + ". "
        })

    const formData = {
        name: document.getElementById("nameText").value,
        text: note
    }
    const resp = await fetch("/notes", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    const data = await resp.json()
    let action = document.getElementById("div_action")
    action.innerHTML = notesHBS({ notes: data.notes })
    window.location = `/`
}
// recognition.start()

document.addEventListener('click', e => {
    e.preventDefault()
    if (e.target.id === "addAudio") {
        let action = document.getElementById("showText")
        action.innerHTML = showHBS({noteText: false})
        e.target.remove()
        div.appendChild(input)
        div.appendChild(inputText)
        div.appendChild(p)
        recognition.start()
        recognition.addEventListener('end', recognition.start)
    }
})
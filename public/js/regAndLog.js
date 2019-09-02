document.addEventListener('DOMContentLoaded', (event) => {
    document.addEventListener("click", async function (e) {
        e.preventDefault()
        if (e.target.id === "registration") {
            console.log("+++")
            let action = document.getElementById("div_action")
            action.innerHTML = regHBS({ reg: true })
        }
        if (e.target.id === "login") {
            console.log("+++")
            let action = document.getElementById("div_action")
            action.innerHTML = logHBS({ log: true })
        }
        if (e.target.id === "btn_reg") {
            const formData = {
                login: document.getElementById("reg_login").value,
                password: document.getElementById("reg_password").value
            }

            const resp = await fetch("/registration", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            window.location = `/`
        }
        if (e.target.id === "logout") {
            await fetch("/logOut", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            });
            window.location = `/`
        }
        if (e.target.id === "btn_login") {
            const formData = {
                login: document.getElementById("log_login").value,
                password: document.getElementById("log_password").value
            }
            const resp = await fetch("/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            window.location = `/`
        }

        if (e.target.id === "saveText") {
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
        if(e.target.classList.contains("btn_notes")){
        console.log(e.target)
        const formData = {
            note: e.target.value
        }
        const resp = await fetch("/notesView", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        let data = await resp.json()
        let action = document.getElementById("showText")
        action.innerHTML = showHBS({noteText: data.noteText})
    }
    })
})
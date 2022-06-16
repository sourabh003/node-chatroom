const toast = (content, type) => {
    let toastContainer = document.getElementById("toastContainer")
    let id = Date.now()
    let message = `
        <div id="toast-${id}" class="toast fade-in toast-${type}"><h5>${content}</h5></div>    
    `;
    toastContainer.innerHTML += message;
    setTimeout(() => {
        document.getElementById(`toast-${id}`).classList.remove("fade-in")
        document.getElementById(`toast-${id}`).classList.add("fade-out")
        setTimeout(() => {
            document.getElementById(`toast-${id}`).remove()
        }, 2000)
    }, 3000);
}  
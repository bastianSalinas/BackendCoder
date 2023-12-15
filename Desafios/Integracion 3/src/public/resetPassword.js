const socket = io()

document.getElementById('resetForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const password1 = document.querySelector("#pwd").value
    const password2 = document.querySelector("#pwd2").value
    const email = document.getElementById("emailPlaceholder").textContent;
    if(password1 == password2)
    {
        socket.emit("equalsPass");
    }
    else
    {
        const response = await fetch("/resetConfirmPass", {
            method: "POST",
            body: JSON.stringify({ password1, password2, email }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          if (response.ok) {
          } else {
            console.error("Error en el inicio de sesión");
          }
    }
    
})
socket.on("warning", (data) => {
    Swal.fire({
        icon: 'warning',
        title: data,
        confirmButtonText: 'Aceptar', // Cambia el texto del botón Aceptar
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(); // Recarga la página cuando se hace clic en Aceptar
        }
    });
});
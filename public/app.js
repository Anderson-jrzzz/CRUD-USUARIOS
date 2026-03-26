const API = "/usuarios";

// VALIDAR INPUTS
function validarInputs(nombre, correo) {
    let esValido = true;
    
    document.getElementById("error-nombre").textContent = "";
    document.getElementById("error-correo").textContent = "";
    
    if (!nombre || nombre.trim() === "") {
        document.getElementById("error-nombre").textContent = ">> Nombre requerido";
        esValido = false;
    } else if (nombre.trim().length < 3) {
        document.getElementById("error-nombre").textContent = ">> Minimo 3 caracteres";
        esValido = false;
    }
    
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || correo.trim() === "") {
        document.getElementById("error-correo").textContent = ">> Email requerido";
        esValido = false;
    } else if (!regexEmail.test(correo)) {
        document.getElementById("error-correo").textContent = ">> Email invalido";
        esValido = false;
    }
    
    return esValido;
}

// MOSTRAR MENSAJE
function mostrarMensaje(texto, tipo = "success") {
    const msgElement = document.getElementById("success-msg");
    msgElement.textContent = texto;
    if (tipo === "success") {
        msgElement.style.background = "rgba(57, 255, 20, 0.1)";
        msgElement.style.color = "#39ff14";
        msgElement.style.borderColor = "#39ff14";
    } else {
        msgElement.style.background = "rgba(255, 0, 110, 0.1)";
        msgElement.style.color = "#ff006e";
        msgElement.style.borderColor = "#ff006e";
    }
    msgElement.style.display = "flex";
    
    setTimeout(() => {
        msgElement.textContent = "";
        msgElement.style.display = "none";
    }, 4000);
}

// LISTAR
async function obtenerUsuarios() {
    try {
        const res = await fetch(API);
        const data = await res.json();

        const lista = document.getElementById("lista");
        const emptyState = document.getElementById("empty-state");
        
        lista.innerHTML = "";
        
        if (!data || data.length === 0) {
            emptyState.style.display = "block";
            return;
        }
        
        emptyState.style.display = "none";

        data.forEach(user => {
            const card = document.createElement("div");
            card.className = "usuario-card";
            card.innerHTML = `
                <div class="usuario-nombre">> ${user.nombre}</div>
                <div class="usuario-correo">${user.correo}</div>
                <button class="btn-delete" onclick="eliminar(${user.id})">[ Eliminar ]</button>
            `;
            lista.appendChild(card);
        });
    } catch (error) {
        console.error(error);
    }
}

// AGREGAR
async function agregarUsuario() {
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();

    if (!validarInputs(nombre, correo)) {
        return;
    }

    try {
        const res = await fetch(`${API}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, correo })
        });
        
        if (!res.ok) {
            mostrarMensaje(">> ERROR: No se pudo agregar", "error");
            return;
        }
        
        document.getElementById("nombre").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("error-nombre").textContent = "";
        document.getElementById("error-correo").textContent = "";
        
        mostrarMensaje("[+] Usuario registrado exitosamente");
        obtenerUsuarios();
    } catch (error) {
        mostrarMensaje(">> ERROR: Fallo la conexion", "error");
        console.error(error);
    }
}

// ELIMINAR
async function eliminar(id) {
    if (!confirm("Sistema: Confirma la eliminacion del registro?")) {
        return;
    }
    
    try {
        const res = await fetch(`${API}/delete/${id}`, {
            method: "DELETE"
        });
        
        if (!res.ok) {
            mostrarMensaje(">> ERROR: No se pudo eliminar", "error");
            return;
        }
        
        mostrarMensaje("[-] Usuario eliminado del sistema");
        obtenerUsuarios();
    } catch (error) {
        mostrarMensaje(">> ERROR: Fallo la conexion", "error");
        console.error(error);
    }
}

// Cargar al iniciar
obtenerUsuarios();
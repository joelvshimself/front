import React, { useEffect, useState } from "react";

interface Usuario {
  UsuarioID: number;
  NombreUsuario: string;
  CorreoElectronico: string;
  FechaRegistro: string;
}

const API_URL = "http://localhost:3000/api/usuarios";

export default function Tabla({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [form, setForm] = useState<{ NombreUsuario: string; CorreoElectronico: string; password?: string }>({
    NombreUsuario: "",
    CorreoElectronico: "",
    password: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setUsuarios([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.NombreUsuario || !form.CorreoElectronico || (!editId && !form.password)) {
      alert("Faltan campos obligatorios.");
      return;
    }

    const url = editId ? `${API_URL}/${editId}` : API_URL;
    const method = editId ? "PUT" : "POST";
    const body = { ...form };
    if (editId) delete body.password;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setForm({ NombreUsuario: "", CorreoElectronico: "", password: "" });
      setEditId(null);
      fetchUsuarios();
    }
  };

  const handleEdit = (u: Usuario) => {
    setForm({ NombreUsuario: u.NombreUsuario, CorreoElectronico: u.CorreoElectronico });
    setEditId(u.UsuarioID);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchUsuarios();
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>Usuarios</h2>
      <button onClick={onLogout}>Cerrar sesión</button>

      <table border={1} cellPadding={8} style={{ marginTop: "1rem", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.UsuarioID}>
              <td>{u.UsuarioID}</td>
              <td>{u.NombreUsuario}</td>
              <td>{u.CorreoElectronico}</td>
              <td>{new Date(u.FechaRegistro).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Editar</button>
                <button onClick={() => handleDelete(u.UsuarioID)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "2rem" }}>{editId ? "Editar Usuario" : "Nuevo Usuario"}</h3>
      <input
        type="text"
        name="NombreUsuario"
        placeholder="Nombre"
        value={form.NombreUsuario}
        onChange={handleChange}
      />
      <input
        type="email"
        name="CorreoElectronico"
        placeholder="Correo"
        value={form.CorreoElectronico}
        onChange={handleChange}
      />
      {!editId && (
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />
      )}
      <button onClick={handleSubmit}>{editId ? "Actualizar" : "Crear"}</button>
    </div>
  );
}

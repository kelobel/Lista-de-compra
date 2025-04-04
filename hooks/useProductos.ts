"use client"

import { useState } from "react"
import type { Producto } from "@/types"
import { useLocalStorage } from "./useLocalStorage"

export function useProductos() {
  const [productos, setProductos] = useLocalStorage<Producto[]>("listaCompras", [])
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [productoEditado, setProductoEditado] = useState<Producto | null>(null)
  const [productoAEliminar, setProductoAEliminar] = useState<number | null>(null)
  const [mostrarDialogoEliminar, setMostrarDialogoEliminar] = useState(false)

  // Agregar un nuevo producto
  const agregarProducto = (nuevoProducto: Omit<Producto, "id" | "fechaCreacion">) => {
    const nuevoId = productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1

    const productoCompleto: Producto = {
      ...nuevoProducto,
      id: nuevoId,
      fechaCreacion: new Date().toISOString(),
    }

    setProductos([...productos, productoCompleto])
    return productoCompleto
  }

  // Marcar como comprado o no comprado
  const toggleComprado = (id: number) => {
    setProductos(
      productos.map((producto) => (producto.id === id ? { ...producto, comprado: !producto.comprado } : producto)),
    )
  }

  // Iniciar edición
  const iniciarEdicion = (producto: Producto) => {
    setEditandoId(producto.id)
    setProductoEditado({ ...producto })
  }

  // Actualizar producto en edición
  const actualizarProductoEditado = (campo: keyof Producto, valor: any) => {
    if (!productoEditado) return
    setProductoEditado({ ...productoEditado, [campo]: valor })
  }

  // Guardar edición
  const guardarEdicion = () => {
    if (!productoEditado || productoEditado.nombre.trim() === "") return

    setProductos(productos.map((producto) => (producto.id === editandoId ? productoEditado : producto)))
    cancelarEdicion()
  }

  // Cancelar edición
  const cancelarEdicion = () => {
    setEditandoId(null)
    setProductoEditado(null)
  }

  // Confirmar eliminación
  const confirmarEliminar = (id: number) => {
    setProductoAEliminar(id)
    setMostrarDialogoEliminar(true)
  }

  // Eliminar producto
  const eliminarProducto = () => {
    if (productoAEliminar === null) return

    setProductos(productos.filter((producto) => producto.id !== productoAEliminar))
    setMostrarDialogoEliminar(false)
    setProductoAEliminar(null)
  }

  // Eliminar todos los productos comprados
  const eliminarComprados = () => {
    setProductos(productos.filter((producto) => !producto.comprado))
  }

  return {
    productos,
    editandoId,
    productoEditado,
    productoAEliminar,
    mostrarDialogoEliminar,
    agregarProducto,
    toggleComprado,
    iniciarEdicion,
    actualizarProductoEditado,
    guardarEdicion,
    cancelarEdicion,
    confirmarEliminar,
    eliminarProducto,
    eliminarComprados,
    setMostrarDialogoEliminar,
  }
}


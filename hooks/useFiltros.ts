"use client"

import { useState } from "react"
import type { Producto, FiltrosProductos } from "@/types"

export function useFiltros() {
  const [filtros, setFiltros] = useState<FiltrosProductos>({
    categoria: "todas",
    estado: "todos",
    ordenarPor: "fecha",
    ordenAscendente: true,
  })

  const actualizarFiltro = (campo: keyof FiltrosProductos, valor: any) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }))
  }

  const toggleOrden = () => {
    setFiltros((prev) => ({ ...prev, ordenAscendente: !prev.ordenAscendente }))
  }

  const aplicarFiltros = (productos: Producto[]): Producto[] => {
    // Primero filtramos
    const filtrados = productos.filter((producto) => {
      // Filtro por categoría
      if (filtros.categoria !== "todas" && producto.categoria !== filtros.categoria) {
        return false
      }

      // Filtro por estado
      if (filtros.estado === "pendientes" && producto.comprado) {
        return false
      }
      if (filtros.estado === "comprados" && !producto.comprado) {
        return false
      }

      return true
    })

    // Luego ordenamos
    return [...filtrados].sort((a, b) => {
      let comparacion = 0

      switch (filtros.ordenarPor) {
        case "nombre":
          comparacion = a.nombre.localeCompare(b.nombre)
          break
        case "categoria":
          comparacion = a.categoria.localeCompare(b.categoria)
          break
        case "fecha":
        default:
          comparacion = new Date(a.fechaCreacion).getTime() - new Date(b.fechaCreacion).getTime()
          break
      }

      return filtros.ordenAscendente ? comparacion : -comparacion
    })
  }

  return {
    filtros,
    actualizarFiltro,
    toggleOrden,
    aplicarFiltros,
  }
}


"use client"

import type { Producto } from "@/types"
import { ProductItem } from "./ProductItem"
import { ShoppingCart } from "lucide-react"

interface ProductListProps {
  productos: Producto[]
  editandoId: number | null
  productoEditado: Producto | null
  onToggleComprado: (id: number) => void
  onIniciarEdicion: (producto: Producto) => void
  onActualizarProductoEditado: (campo: keyof Producto, valor: any) => void
  onGuardarEdicion: () => void
  onConfirmarEliminar: (id: number) => void
}

export function ProductList({
  productos,
  editandoId,
  productoEditado,
  onToggleComprado,
  onIniciarEdicion,
  onActualizarProductoEditado,
  onGuardarEdicion,
  onConfirmarEliminar,
}: ProductListProps) {
  if (productos.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8 border rounded-md">
        <ShoppingCart className="h-12 w-12 mx-auto mb-2 text-slate-300" />
        <p>No hay productos en tu lista.</p>
        <p className="text-sm">¡Agrega algunos para comenzar!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {productos.map((producto) => (
        <ProductItem
          key={producto.id}
          producto={producto}
          editandoId={editandoId}
          productoEditado={productoEditado}
          onToggleComprado={onToggleComprado}
          onIniciarEdicion={onIniciarEdicion}
          onActualizarProductoEditado={onActualizarProductoEditado}
          onGuardarEdicion={onGuardarEdicion}
          onConfirmarEliminar={onConfirmarEliminar}
        />
      ))}
    </div>
  )
}


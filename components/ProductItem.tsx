"use client"

import type { Producto } from "@/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Check, Pencil, Trash2 } from "lucide-react"
import { CATEGORIAS, UNIDADES } from "@/constants"

interface ProductItemProps {
  producto: Producto
  editandoId: number | null
  productoEditado: Producto | null
  onToggleComprado: (id: number) => void
  onIniciarEdicion: (producto: Producto) => void
  onActualizarProductoEditado: (campo: keyof Producto, valor: any) => void
  onGuardarEdicion: () => void
  onConfirmarEliminar: (id: number) => void
}

export function ProductItem({
  producto,
  editandoId,
  productoEditado,
  onToggleComprado,
  onIniciarEdicion,
  onActualizarProductoEditado,
  onGuardarEdicion,
  onConfirmarEliminar,
}: ProductItemProps) {
  const isEditing = editandoId === producto.id && productoEditado

  return (
    <div
      className={`flex items-center justify-between p-3 border rounded-md transition-all duration-200 ${
        producto.comprado ? "bg-slate-50" : "hover:border-slate-400"
      }`}
    >
      {isEditing ? (
        <div className="grid gap-3 w-full">
          <div className="flex gap-2">
            <Input
              value={productoEditado.nombre}
              onChange={(e) => onActualizarProductoEditado("nombre", e.target.value)}
              autoFocus
            />
            <Select
              value={productoEditado.categoria}
              onValueChange={(val) => onActualizarProductoEditado("categoria", val)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIAS.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Input
              type="number"
              min="1"
              value={productoEditado.cantidad}
              onChange={(e) => onActualizarProductoEditado("cantidad", Number(e.target.value))}
            />
            <Select value={productoEditado.unidad} onValueChange={(val) => onActualizarProductoEditado("unidad", val)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {UNIDADES.map((unidad) => (
                  <SelectItem key={unidad} value={unidad}>
                    {unidad}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={onGuardarEdicion}>
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-3 flex-1">
            <Checkbox
              checked={producto.comprado}
              onCheckedChange={() => onToggleComprado(producto.id)}
              id={`producto-${producto.id}`}
            />
            <div className="flex-1">
              <label
                htmlFor={`producto-${producto.id}`}
                className={`block cursor-pointer font-medium ${producto.comprado ? "line-through text-muted-foreground" : ""}`}
              >
                {producto.nombre}
              </label>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>
                  {producto.cantidad} {producto.unidad}
                </span>
                <Badge variant="outline" className="text-xs">
                  {producto.categoria}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" onClick={() => onIniciarEdicion(producto)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onConfirmarEliminar(producto.id)}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}


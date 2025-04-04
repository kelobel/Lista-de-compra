"use client"

import type { FiltrosProductos } from "@/types"
import { CATEGORIAS } from "@/constants"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Filter, SortAsc, SortDesc } from "lucide-react"

interface ProductFiltersProps {
  filtros: FiltrosProductos
  onActualizarFiltro: (campo: keyof FiltrosProductos, valor: any) => void
  onToggleOrden: () => void
}

export function ProductFilters({ filtros, onActualizarFiltro, onToggleOrden }: ProductFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-between items-center bg-slate-50 p-3 rounded-md">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-slate-500" />
        <Select value={filtros.categoria} onValueChange={(val) => onActualizarFiltro("categoria", val)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            {CATEGORIAS.map((categoria) => (
              <SelectItem key={categoria} value={categoria}>
                {categoria}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filtros.estado} onValueChange={(val) => onActualizarFiltro("estado", val)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="pendientes">Pendientes</SelectItem>
            <SelectItem value="comprados">Comprados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Select value={filtros.ordenarPor} onValueChange={(val) => onActualizarFiltro("ordenarPor", val)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fecha">Fecha</SelectItem>
            <SelectItem value="nombre">Nombre</SelectItem>
            <SelectItem value="categoria">Categoría</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="icon" onClick={onToggleOrden}>
          {filtros.ordenAscendente ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}


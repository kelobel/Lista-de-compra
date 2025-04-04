"use client"

import type { EstadisticasProductos } from "@/types"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface ProductStatsProps {
  estadisticas: EstadisticasProductos
  onEliminarComprados: () => void
}

export function ProductStats({ estadisticas, onEliminarComprados }: ProductStatsProps) {
  const { totalProductos, productosComprados, porcentajeCompletado, productosPorCategoria } = estadisticas

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Progreso de compras</h3>
        <div className="space-y-2">
          <Progress value={porcentajeCompletado} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {productosComprados} de {totalProductos} productos comprados
            </span>
            <span>{porcentajeCompletado}%</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Productos por categoría</h3>
        {productosPorCategoria.length > 0 ? (
          <div className="space-y-2">
            {productosPorCategoria.map((cat) => (
              <div key={cat.categoria} className="flex justify-between items-center">
                <span>{cat.categoria}</span>
                <Badge variant="secondary">{cat.total}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No hay productos en la lista</p>
        )}
      </div>

      {productosComprados > 0 && (
        <Button variant="outline" className="w-full" onClick={onEliminarComprados}>
          <Trash2 className="h-4 w-4 mr-2" />
          Eliminar productos comprados
        </Button>
      )}
    </div>
  )
}


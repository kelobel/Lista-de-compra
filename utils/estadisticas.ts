import type { Producto } from "@/types"
import { CATEGORIAS } from "@/constants"

export function calcularEstadisticas(productos: Producto[]) {
  const totalProductos = productos.length
  const productosComprados = productos.filter((p) => p.comprado).length
  const porcentajeCompletado = totalProductos > 0 ? Math.round((productosComprados / totalProductos) * 100) : 0

  // Agrupar por categoría para estadísticas
  const productosPorCategoria = CATEGORIAS.map((categoria) => {
    const total = productos.filter((p) => p.categoria === categoria).length
    return { categoria, total }
  }).filter((cat) => cat.total > 0)

  return {
    totalProductos,
    productosComprados,
    porcentajeCompletado,
    productosPorCategoria,
  }
}


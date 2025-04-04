export interface Producto {
  id: number
  nombre: string
  cantidad: number
  unidad: string
  categoria: string
  comprado: boolean
  fechaCreacion: string
}

export interface FiltrosProductos {
  categoria: string
  estado: string
  ordenarPor: string
  ordenAscendente: boolean
}

export interface EstadisticasProductos {
  totalProductos: number
  productosComprados: number
  porcentajeCompletado: number
  productosPorCategoria: { categoria: string; total: number }[]
}


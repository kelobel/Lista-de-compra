"use client"

import { ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useProductos } from "@/hooks/useProductos"
import { useFiltros } from "@/hooks/useFiltros"
import { calcularEstadisticas } from "@/utils/estadisticas"

import { ProductForm } from "@/components/ProductForm"
import { ProductFilters } from "@/components/ProductFilters"
import { ProductList } from "@/components/ProductList"
import { ProductStats } from "@/components/ProductStats"
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog"

export default function ListaCompras() {
  const {
    productos,
    editandoId,
    productoEditado,
    mostrarDialogoEliminar,
    agregarProducto,
    toggleComprado,
    iniciarEdicion,
    actualizarProductoEditado,
    guardarEdicion,
    confirmarEliminar,
    eliminarProducto,
    eliminarComprados,
    setMostrarDialogoEliminar,
  } = useProductos()

  const { filtros, actualizarFiltro, toggleOrden, aplicarFiltros } = useFiltros()

  const productosFiltrados = aplicarFiltros(productos)
  const estadisticas = calcularEstadisticas(productos)

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-200">
          <div className="flex items-center justify-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-slate-700" />
            <CardTitle className="text-center text-2xl text-slate-800">Lista de Compras</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <Tabs defaultValue="lista" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="lista">Lista de Compras</TabsTrigger>
              <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
            </TabsList>

            <TabsContent value="lista" className="space-y-6">
              <ProductForm onAgregarProducto={agregarProducto} />

              <ProductFilters filtros={filtros} onActualizarFiltro={actualizarFiltro} onToggleOrden={toggleOrden} />

              <ProductList
                productos={productosFiltrados}
                editandoId={editandoId}
                productoEditado={productoEditado}
                onToggleComprado={toggleComprado}
                onIniciarEdicion={iniciarEdicion}
                onActualizarProductoEditado={actualizarProductoEditado}
                onGuardarEdicion={guardarEdicion}
                onConfirmarEliminar={confirmarEliminar}
              />
            </TabsContent>

            <TabsContent value="estadisticas">
              <ProductStats estadisticas={estadisticas} onEliminarComprados={eliminarComprados} />
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="bg-slate-50 text-center text-sm text-muted-foreground">
          <p className="w-full">Tus datos se guardan automáticamente en este dispositivo</p>
        </CardFooter>
      </Card>

      <DeleteConfirmDialog
        open={mostrarDialogoEliminar}
        onOpenChange={setMostrarDialogoEliminar}
        onConfirm={eliminarProducto}
      />
    </div>
  )
}


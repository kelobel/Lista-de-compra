"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useToast } from "../hooks/use-toast"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Plus } from "lucide-react"
import type { Producto } from "@/types"

interface ProductFormProps {
  onAgregarProducto: (producto: Omit<Producto, "id" | "fechaCreacion">) => void
}

export function ProductForm({ onAgregarProducto }: ProductFormProps) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [productName, setProductName] = useState("")
  const [cantidad, setCantidad] = useState(1)
  const [unidad, setUnidad] = useState("unidad")
  const [categoria, setCategoria] = useState("otros")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!productName.trim()) {
      toast({
        title: "Error",
        description: "El nombre del producto no puede estar vacío",
        variant: "destructive",
      })
      return
    }

    onAgregarProducto({
      nombre: productName.trim(),
      cantidad: cantidad,
      unidad: unidad,
      categoria: categoria,
      comprado: false,
    })

    // Reset form fields
    setProductName("")
    setCantidad(1)
    setUnidad("unidad")
    setCategoria("otros")
    
    // Close dialog
    setOpen(false)
    
    toast({
      title: "Producto añadido",
      description: `${productName} ha sido añadido a la lista`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>Agregar producto</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Producto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid w-full gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="nombre">Nombre del producto</Label>
              <Input 
                id="nombre"
                placeholder="Ej: Manzanas" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <Label htmlFor="cantidad">Cantidad</Label>
              <Input
                id="cantidad"
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <Label htmlFor="unidad">Unidad</Label>
              <Select value={unidad} onValueChange={setUnidad}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unidad">Unidad</SelectItem>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frutas">Frutas</SelectItem>
                  <SelectItem value="verduras">Verduras</SelectItem>
                  <SelectItem value="carnes">Carnes</SelectItem>
                  <SelectItem value="lacteos">Lácteos</SelectItem>
                  <SelectItem value="limpieza">Limpieza</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit" className="w-full">Agregar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}


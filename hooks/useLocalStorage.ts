"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Estado para almacenar nuestro valor
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Inicializar el estado con el valor de localStorage (si existe)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(key)
        if (item) {
          setStoredValue(JSON.parse(item))
        }
      }
    } catch (error) {
      console.error(`Error al cargar ${key} desde localStorage:`, error)
    }
  }, [key])

  // Función para actualizar el valor en localStorage y en el estado
  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error(`Error al guardar ${key} en localStorage:`, error)
    }
  }

  return [storedValue, setValue]
}


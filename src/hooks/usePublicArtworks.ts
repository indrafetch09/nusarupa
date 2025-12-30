import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'

export const usePublicArtworks = () => {
  type Artwork = Database["public"]["Tables"]["artworks"]["Row"]
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchArtworks = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error: fetchError } = await (supabase as any)
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setArtworks(data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat karya'
      setError(errorMessage)
      console.error('Error fetching artworks:', err)
    } finally {
      setLoading(false)
    }
  }

  const getArtworkById = async (id: string) => {
    try {
      const { data, error } = await (supabase as any)
        .from('artworks')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Karya tidak ditemukan'
      console.error('Error fetching artwork:', err)
      throw new Error(errorMessage)
    }
  }

  const getArtworksByCategory = async (category: string) => {
    try {
      let query = (supabase as any).from('artworks').select('*')
      
      if (category !== 'semua') {
        query = query.eq('category', category)
      }
      
      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat karya'
      console.error('Error fetching artworks by category:', err)
      throw new Error(errorMessage)
    }
  }

  const searchArtworks = async (searchTerm: string, category?: string) => {
    try {
      let query = (supabase as any)
        .from('artworks')
        .select('*')
        .or(`title.ilike.%${searchTerm}%,author.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      
      if (category && category !== 'semua') {
        query = query.eq('category', category)
      }
      
      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal mencari karya'
      console.error('Error searching artworks:', err)
      throw new Error(errorMessage)
    }
  }

  useEffect(() => {
    fetchArtworks()
  }, [])

  return {
    artworks,
    loading,
    error,
    fetchArtworks,
    getArtworkById,
    getArtworksByCategory,
    searchArtworks
  }
}

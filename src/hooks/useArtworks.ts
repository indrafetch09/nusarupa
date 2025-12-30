import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'
import { useToast } from './use-toast'

type Artwork = Database["public"]["Tables"]["artworks"]["Row"]
type ArtworkInsert = Database["public"]["Tables"]["artworks"]["Insert"]
type ArtworkUpdate = Database["public"]["Tables"]["artworks"]["Update"]

export const useArtworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

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
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat data karya'
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const createArtwork = async (artwork: ArtworkInsert) => {
    try {
      const { data, error: createError } = await (supabase as any)
        .from('artworks')
        .insert([artwork])
        .select()
        .single()

      if (createError) throw createError

      setArtworks(prev => [data, ...prev])
      toast({
        title: "Berhasil",
        description: "Karya berhasil ditambahkan"
      })

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menambahkan karya'
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
      throw err
    }
  }

  const updateArtwork = async (id: string, updates: ArtworkUpdate) => {
    try {
      const { data, error: updateError } = await (supabase as any)
        .from('artworks')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setArtworks(prev => prev.map(artwork => 
        artwork.id === id ? data : artwork
      ))
      toast({
        title: "Berhasil",
        description: "Karya berhasil diperbarui"
      })

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memperbarui karya'
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
      throw err
    }
  }

  const deleteArtwork = async (id: string) => {
    try {
      const { error: deleteError } = await (supabase as any)
        .from('artworks')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setArtworks(prev => prev.filter(artwork => artwork.id !== id))
      toast({
        title: "Berhasil",
        description: "Karya berhasil dihapus"
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menghapus karya'
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
      throw err
    }
  }

  const uploadImage = async (file: File, path: string) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${path}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal mengupload gambar'
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
      throw err
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
    createArtwork,
    updateArtwork,
    deleteArtwork,
    uploadImage
  }
}

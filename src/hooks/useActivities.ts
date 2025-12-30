import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'
import { useToast } from './use-toast'

export const useActivities = () => {
  type Activity = Database["public"]["Tables"]["activities"]["Row"]
  type ActivityInsert = Database["public"]["Tables"]["activities"]["Insert"]
  type ActivityUpdate = Database["public"]["Tables"]["activities"]["Update"]
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchActivities = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error: fetchError } = await (supabase as any)
        .from('activities')
        .select('*')
        .order('date', { ascending: true })

      if (fetchError) throw fetchError

      setActivities(data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat data aktivitas'
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

  const createActivity = async (activity: ActivityInsert) => {
    try {
      const { data, error: createError } = await (supabase as any)
        .from('activities')
        .insert([activity])
        .select()
        .single()

      if (createError) throw createError

      setActivities(prev => [data, ...prev])
      toast({
        title: "Berhasil",
        description: "Aktivitas berhasil ditambahkan"
      })

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menambahkan aktivitas'
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
      throw err
    }
  }

  const updateActivity = async (id: string, updates: ActivityUpdate) => {
    try {
      const { data, error: updateError } = await (supabase as any)
        .from('activities')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setActivities(prev => prev.map(activity => 
        activity.id === id ? data : activity
      ))
      toast({
        title: "Berhasil",
        description: "Aktivitas berhasil diperbarui"
      })

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memperbarui aktivitas'
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
      throw err
    }
  }

  const deleteActivity = async (id: string) => {
    try {
      const { error: deleteError } = await (supabase as any)
        .from('activities')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setActivities(prev => prev.filter(activity => activity.id !== id))
      toast({
        title: "Berhasil",
        description: "Aktivitas berhasil dihapus"
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menghapus aktivitas'
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
    fetchActivities()
  }, [])

  return {
    activities,
    loading,
    error,
    fetchActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    uploadImage
  }
}

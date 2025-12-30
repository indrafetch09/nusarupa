import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'

export const usePublicActivities = () => {
  type Activity = Database["public"]["Tables"]["activities"]["Row"]
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat aktivitas'
      setError(errorMessage)
      console.error('Error fetching activities:', err)
    } finally {
      setLoading(false)
    }
  }

  const getActivityById = async (id: string) => {
    try {
      const { data, error } = await (supabase as any)
        .from('activities')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Aktivitas tidak ditemukan'
      console.error('Error fetching activity:', err)
      throw new Error(errorMessage)
    }
  }

  const getUpcomingActivities = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const { data, error } = await (supabase as any)
        .from('activities')
        .select('*')
        .gte('date', today)
        .order('date', { ascending: true })

      if (error) throw error
      return data || []
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat aktivitas'
      console.error('Error fetching upcoming activities:', err)
      throw new Error(errorMessage)
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
    getActivityById,
    getUpcomingActivities
  }
}

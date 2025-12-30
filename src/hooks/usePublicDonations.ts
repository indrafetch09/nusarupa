import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'

export const usePublicDonations = () => {
  type Donation = Database["public"]["Tables"]["donations"]["Row"]
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDonations = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error: fetchError } = await (supabase as any)
        .from('donations')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setDonations(data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat donasi'
      setError(errorMessage)
      console.error('Error fetching donations:', err)
    } finally {
      setLoading(false)
    }
  }

  const getDonationById = async (id: string) => {
    try {
      const { data, error } = await (supabase as any)
        .from('donations')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Donasi tidak ditemukan'
      console.error('Error fetching donation:', err)
      throw new Error(errorMessage)
    }
  }

  const getActiveDonations = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('donations')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat donasi'
      console.error('Error fetching active donations:', err)
      throw new Error(errorMessage)
    }
  }

  useEffect(() => {
    fetchDonations()
  }, [])

  return {
    donations,
    loading,
    error,
    fetchDonations,
    getDonationById,
    getActiveDonations
  }
}

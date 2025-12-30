import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'
import { useToast } from './use-toast'

export const useDonations = () => {
  type Donation = Database["public"]["Tables"]["donations"]["Row"]
  type DonationInsert = Database["public"]["Tables"]["donations"]["Insert"]
  type DonationUpdate = Database["public"]["Tables"]["donations"]["Update"]
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchDonations = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error: fetchError } = await (supabase as any)
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setDonations(data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat data donasi'
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

  const createDonation = async (donation: DonationInsert) => {
    try {
      const { data, error: createError } = await (supabase as any)
        .from('donations')
        .insert([donation])
        .select()
        .single()

      if (createError) throw createError

      setDonations(prev => [data, ...prev])
      toast({
        title: "Berhasil",
        description: "Donasi berhasil ditambahkan"
      })

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menambahkan donasi'
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
      throw err
    }
  }

  const updateDonation = async (id: string, updates: DonationUpdate) => {
    try {
      const { data, error: updateError } = await (supabase as any)
        .from('donations')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      setDonations(prev => prev.map(donation => 
        donation.id === id ? data : donation
      ))
      toast({
        title: "Berhasil",
        description: "Donasi berhasil diperbarui"
      })

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memperbarui donasi'
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
      throw err
    }
  }

  const deleteDonation = async (id: string) => {
    try {
      const { error: deleteError } = await (supabase as any)
        .from('donations')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setDonations(prev => prev.filter(donation => donation.id !== id))
      toast({
        title: "Berhasil",
        description: "Donasi berhasil dihapus"
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menghapus donasi'
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
    fetchDonations()
  }, [])

  return {
    donations,
    loading,
    error,
    fetchDonations,
    createDonation,
    updateDonation,
    deleteDonation,
    uploadImage
  }
}

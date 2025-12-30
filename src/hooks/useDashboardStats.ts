import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface DashboardStats {
  totalArtworks: number
  totalActivities: number
  totalDonations: number
  totalUsers: number
  activeDonations: number
  upcomingActivities: number
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalArtworks: 0,
    totalActivities: 0,
    totalDonations: 0,
    totalUsers: 0,
    activeDonations: 0,
    upcomingActivities: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch counts from all tables
      const [
        artworksResult,
        activitiesResult,
        donationsResult,
        usersResult,
        activeDonationsResult,
        upcomingActivitiesResult,
      ] = await Promise.all([
        supabase
          .from('artworks')
          .select('*', { count: 'exact', head: true }),
        supabase
          .from('activities')
          .select('*', { count: 'exact', head: true }),
        supabase
          .from('donations')
          .select('*', { count: 'exact', head: true }),
        supabase
          .from('user_profiles')
          .select('*', { count: 'exact', head: true }),
        supabase
          .from('donations')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true),
        supabase
          .from('activities')
          .select('*', { count: 'exact', head: true })
          .gte('date', new Date().toISOString().split('T')[0]),
      ])

      setStats({
        totalArtworks: artworksResult.count || 0,
        totalActivities: activitiesResult.count || 0,
        totalDonations: donationsResult.count || 0,
        totalUsers: usersResult.count || 0,
        activeDonations: activeDonationsResult.count || 0,
        upcomingActivities: upcomingActivitiesResult.count || 0,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat statistik'
      setError(errorMessage)
      console.error('Error fetching dashboard stats:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}

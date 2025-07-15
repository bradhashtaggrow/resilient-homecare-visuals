import { supabase } from '@/integrations/supabase/client';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class QueryCache {
  public cache = new Map<string, CacheEntry<any>>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl = this.defaultTTL): void {
    const timestamp = Date.now();
    this.cache.set(key, {
      data,
      timestamp,
      expiresAt: timestamp + ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  // Auto-cleanup expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

export const queryCache = new QueryCache();

// Auto-cleanup every 5 minutes
setInterval(() => queryCache.cleanup(), 5 * 60 * 1000);

// Optimized database queries with caching and pagination
export const optimizedQueries = {
  // Get website content with caching
  async getWebsiteContent(sectionKey: string) {
    const cacheKey = `website_content_${sectionKey}`;
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
      .from('website_content')
      .select('*')
      .eq('section_key', sectionKey)
      .eq('is_active', true)
      .single();

    if (!error && data) {
      queryCache.set(cacheKey, data);
    }
    return { data, error };
  },

  // Get services with benefits efficiently
  async getServicesWithBenefits() {
    const cacheKey = 'services_with_benefits';
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        service_benefits(*)
      `)
      .order('display_order');

    if (!error && data) {
      queryCache.set(cacheKey, data);
    }
    return { data, error };
  },

  // Get analytics with pagination and caching
  async getAnalytics(page = 1, limit = 50) {
    const cacheKey = `analytics_${page}_${limit}`;
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;

    const offset = (page - 1) * limit;
    
    const { data, error } = await supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (!error && data) {
      queryCache.set(cacheKey, data, 2 * 60 * 1000); // 2 minutes for analytics
    }
    return { data, error };
  },

  // Get leads with optimized pagination
  async getLeads(page = 1, limit = 20, status?: string) {
    const cacheKey = `leads_${page}_${limit}_${status || 'all'}`;
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;

    const offset = (page - 1) * limit;
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (!error && data) {
      queryCache.set(cacheKey, data, 1 * 60 * 1000); // 1 minute for leads
    }
    return { data, error };
  },

  // Batch operations for better performance
  async batchUpdateLeads(updates: Array<{ id: string; status: string }>) {
    const promises = updates.map(({ id, status }) =>
      supabase
        .from('leads')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
    );

    const results = await Promise.all(promises);
    
    // Clear related cache entries
    for (let i = 1; i <= 10; i++) {
      for (const status of ['all', 'new', 'contacted', 'qualified']) {
        queryCache.cache.delete(`leads_${i}_20_${status}`);
      }
    }

    return results;
  },

  // Preload critical data
  async preloadCriticalData() {
    const promises = [
      this.getWebsiteContent('hero'),
      this.getWebsiteContent('services'),
      this.getServicesWithBenefits(),
    ];

    try {
      await Promise.all(promises);
    } catch (error) {
      console.warn('Failed to preload some data:', error);
    }
  }
};

// Initialize preloading on app start
if (typeof window !== 'undefined') {
  // Preload after a short delay to not block initial render
  setTimeout(() => {
    optimizedQueries.preloadCriticalData();
  }, 1000);
}
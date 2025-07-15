import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3'

Deno.serve(async (req) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    // Create admin client with service role key
    const supabaseAdmin = createClient(
      'https://iwgtwzpygoyohocbgqgm.supabase.co',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { email, password } = await req.json()

    // Validate required fields
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create the user in auth.users
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        full_name: 'Resilient Healthcare Admin'
      }
    })

    if (authError) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ error: authError.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!authData.user) {
      return new Response(
        JSON.stringify({ error: 'Failed to create user' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Clean up any existing admin users first
    await supabaseAdmin.from('user_roles').delete().eq('role', 'admin')
    await supabaseAdmin.from('user_permissions').delete().in('permission', [
      'dashboard_view', 'analytics_view', 'leads_view', 'leads_manage',
      'content_view', 'content_edit', 'blog_view', 'blog_edit', 
      'preview_view', 'user_management_view', 'user_management_edit',
      'system_settings_view', 'system_settings_edit'
    ])

    // Assign admin role
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: authData.user.id,
        role: 'admin'
      })

    if (roleError) {
      console.error('Role error:', roleError)
    }

    // Grant all admin permissions
    const permissions = [
      'dashboard_view', 'analytics_view', 'leads_view', 'leads_manage',
      'content_view', 'content_edit', 'blog_view', 'blog_edit', 
      'preview_view', 'user_management_view', 'user_management_edit',
      'system_settings_view', 'system_settings_edit'
    ]

    const permissionInserts = permissions.map(permission => ({
      user_id: authData.user.id,
      permission
    }))

    const { error: permError } = await supabaseAdmin
      .from('user_permissions')
      .insert(permissionInserts)

    if (permError) {
      console.error('Permission error:', permError)
    }

    return new Response(
      JSON.stringify({ 
        message: 'Admin user created successfully',
        user: {
          id: authData.user.id,
          email: authData.user.email
        }
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
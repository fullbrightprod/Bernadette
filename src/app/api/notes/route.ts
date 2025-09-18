import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  // Vérifier que l'utilisateur est connecté
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json([], { status: 401 })

  // Récupérer uniquement les notes de l'utilisateur (RLS s'en charge automatiquement)
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { content } = body

  // On n’envoie plus user_id → Supabase le remplit automatiquement avec auth.uid()
  const { data, error } = await supabase
    .from('notes')
    .insert([{ content }])

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

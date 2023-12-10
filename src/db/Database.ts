"use server"

import { JSONPreset } from 'lowdb/node'
import { squads as defaultSquads } from '@/constants/squads'
import { Data } from '@/types'

export async function getDB() {
  const defaultData: Data = { squads: defaultSquads, winners: [] }
  const db = await JSONPreset('./db.json', defaultData)
  
  return db
}

export async function getData() {
  const db = await getDB()
  
  return db.data
}

export async function getTeamsFromSquad(squad: string) {
  const { squads } = await getData()
  const teams = squads.find(s => s.name === squad)?.teams

  return teams
}

export async function getWinnersFromSquad(squad: string) {
  const { winners } = await getData()
  const teams = winners.filter(s => s.squad === squad)

  return teams
}

export async function addWinnerFromSquad(person: string, squad: string, date?: string | null) {
  const db = await getDB()
  db.data.winners.push({ name: person, date: date || Date(), squad: squad })

  await db.write()
}

export async function deleteWinnerFromSquad(person: string, squad: string) {
  const db = await getDB()
  const newWinners = db.data.winners.filter(winner => winner.name !== person || winner.squad !== squad)
  db.data.winners = newWinners

  await db.write()
}

export async function resetWinnersFromSquad(squad: string) {
  const db = await getDB()
  const newWinners = db.data.winners.filter(winner => winner.squad !== squad)
  db.data.winners = newWinners

  await db.write()
}
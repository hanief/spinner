export interface Winner {
  name: string
  squad: string
  date: string
}

export interface Squad {
  name: string
  teams: string[]
}

export interface Data {
  squads: Squad[]
  winners: Winner[]
}

export interface User {
  name?: string | null
  email?: string | null
  image?: string | null
}
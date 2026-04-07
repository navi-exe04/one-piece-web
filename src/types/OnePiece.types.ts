export interface Fruit {
  id: number
  name: string
  description: string
}

export interface Character {
  id: number
  name: string
  size: string
  bounty: string
  fruit?: Fruit
}

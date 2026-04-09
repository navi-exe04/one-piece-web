export interface Fruit {
  id: number
  name: string
  description: string
  type: string
  filename: string
}

export interface Crew {
  id: number
  name: string
  description: string
  status: string
  number: string
  total_prime: string
  is_yonko: string
}

export interface Character {
  id: number
  name: string
  size: string
  age: string
  job: string
  bounty: string
  status: string
  birthday: string
  crew?: Crew
  fruit?: Fruit
}

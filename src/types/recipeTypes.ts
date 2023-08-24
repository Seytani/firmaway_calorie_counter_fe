interface Ingredient {
  name: string
}

interface Recipe {
  title: string
  image?: string
  collection: string
  prepTime: number
  cookTime: number
  totalTime: number
  servings: number
  calories: number
  tags: string[]
  ingredients: Ingredient[]
  description: string
}

export type { Ingredient, Recipe }

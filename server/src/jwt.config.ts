import { jwt } from '@elysiajs/jwt'

export const jwtConfig = jwt({
  name: 'thinknote', 
  secret: Bun.env.JWT_SECRET || "",
})
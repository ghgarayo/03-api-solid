import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface RegisterUserRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUserRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already registered')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}

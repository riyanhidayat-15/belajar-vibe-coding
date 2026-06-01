import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Cek apakah email sudah terdaftar
 * @param email Email yang dicek
 * @returns User jika ditemukan, null jika tidak ada
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await db.select().from(users).where(eq(users.email, email));

    return result.length > 0 ? (result[0] as User) : null;
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw new Error("Gagal mengecek email");
  }
}

/**
 * Buat user baru dengan hashing password
 * @param input CreateUserInput dengan name, email, password
 * @returns Hasil insert dengan ID user baru
 * @throws Error jika email sudah terdaftar atau ada error database
 */
export async function createUser(input: CreateUserInput): Promise<number> {
  // Validasi input
  if (!input.name || input.name.trim() === "") {
    throw new Error("Nama tidak boleh kosong");
  }

  if (!input.email || input.email.trim() === "") {
    throw new Error("Email tidak boleh kosong");
  }

  if (!input.password || input.password.trim() === "") {
    throw new Error("Password tidak boleh kosong");
  }

  // Validasi format email sederhana
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.email)) {
    throw new Error("Format email tidak valid");
  }

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await getUserByEmail(input.email);
    if (existingUser) {
      throw new Error("email sudah terdaftar");
    }

    // Hash password dengan bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(input.password, saltRounds);

    // Insert user ke database
    const result = await db.insert(users).values({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    // Return ID dari user yang baru dibuat
    return result[0].insertId as number;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    console.error("Error creating user:", error);
    throw new Error("Gagal membuat user");
  }
}

/**
 * Verify password user dengan hash yang tersimpan
 * @param plainPassword Password yang di-input user
 * @param hashedPassword Hash password dari database
 * @returns true jika password valid, false jika tidak
 */
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    return await bcryptjs.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
}

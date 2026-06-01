import { Elysia, t } from "elysia";
import { createUser } from "../services/users-service";

export function usersRoute(app: Elysia) {
  return app.post(
    "/api/users",
    async (context) => {
      try {
        // Ekstrak body dari request
        const body = context.body as {
          name?: string;
          email?: string;
          password?: string;
        };

        // Validasi input - cek field kosong
        if (!body.name || body.name.trim() === "") {
          return {
            error: "validasi gagal: name tidak boleh kosong",
          };
        }

        if (!body.email || body.email.trim() === "") {
          return {
            error: "validasi gagal: email tidak boleh kosong",
          };
        }

        if (!body.password || body.password.trim() === "") {
          return {
            error: "validasi gagal: password tidak boleh kosong",
          };
        }

        // Panggil service untuk create user
        await createUser({
          name: body.name.trim(),
          email: body.email.trim(),
          password: body.password,
        });

        // Return success response
        return {
          data: "OK",
        };
      } catch (error) {
        // Handle error
        if (error instanceof Error) {
          const errorMessage = error.message;

          // Cek apakah error adalah email sudah terdaftar
          if (errorMessage === "email sudah terdaftar") {
            return {
              error: "email sudah terdaftar",
            };
          }

          // Return error message lainnya
          return {
            error: errorMessage,
          };
        }

        // Generic error
        return {
          error: "Gagal membuat user",
        };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  );
}

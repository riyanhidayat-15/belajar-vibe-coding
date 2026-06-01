Migrations placeholder

- Use your preferred migration tool or Drizzle's migration helpers.
- Place SQL migration files here, named with an incremental prefix (e.g. 001_create_users.sql).

Example `001_create_users.sql`:

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

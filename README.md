# Blog API Project

A full-stack blog application with a RESTful API backend (Node.js/Express/PostgreSQL) and a frontend rendered with EJS. Users can create, edit, delete, and search blog posts.

#Preview

[Download Demo Video](./demo.gif)


## Features
- RESTful API for blog posts (CRUD)
- PostgreSQL database integration
- EJS-based frontend with modern UI
- Search posts by title
- Filter posts by author
- Dark mode toggle (persistent)

## Project Structure
```
index.js           # API server (Express, PostgreSQL)
server.js          # Frontend server (Express, EJS)
package.json       # Project dependencies
public/
  styles/
    main.css       # Main stylesheet
    front.js       # Dark mode toggle JS
views/
  index.ejs        # Main blog page
  modify.ejs       # Create/Edit post page
```

## Setup Instructions
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure PostgreSQL:**
   - Create a database named `Blog`.
   - Create a table named `blog` with columns:
     - `id` (serial PRIMARY KEY)
     - `title` (text)
     - `content` (text)
     - `author` (text)
     - `date` (text)
   - Update the credentials in `index.js` if needed.
3. **Run the API server:**
   ```bash
   node index.js
   ```
4. **Run the frontend server:**
   ```bash
   node server.js
   ```
5. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000) for the frontend.
   - The API runs at [http://localhost:4000](http://localhost:4000).

## API Endpoints
- `GET /posts` — Get all posts
- `GET /posts/:id` — Get a post by ID
- `POST /posts` — Create a new post
- `PATCH /posts/:id` — Update a post
- `DELETE /posts/:id` — Delete a post
- `GET /search?title=...` — Search posts by title
- `GET /blogger?author=...` — Filter posts by author

## Frontend Usage
- Create/Edit/Delete posts from the UI
- Search by title or filter by author
- Toggle dark mode (persists across sessions)

## License
ISC



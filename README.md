<div align='center'>
<img src='Kitagawachan.jpg' alt='kitagawachan'/>

<br />
</div>

_Welcome to the Kitagawachan Api documentation. This API provides a collection of quotes from various anime series and characters. You can retrieve random quotes, quotes by anime title, quotes by anime character, create new quotes, and more. The API is built using Express.js and MongoDB._

**Base URL**: `http://localhost:8000` (Update the URL if your server is running on a different host/port)

## Endpoints

### 1. Get Random Quote

Retrieve a random anime quote.

- **URL**: `/quotes/random`
- **Method**: GET
- **Response**:

```
{
  "_id": "quote_id",
  "anime": "Anime Title",
  "character": "Character Name",
  "quote": "Quote text..."
}
```

### 2. Get Random Quote by Anime Title

Retrieve a random anime quote based on the provided anime title.

- **URL**: `/quotes/random/:animeTitle`
- **Method**: GET
- **Parameters**:
  - `animeTitle`: The title of the anime.
- **Response**:

```
{
  "_id": "quote_id",
  "anime": "Anime Title",
  "character": "Character Name",
  "quote": "Quote text..."
}
```

### 3. Get Random Quote by Anime Character

Retrieve a random anime quote based on the provided anime character.

- **URL**: `/quotes/random/character/:animeCharacter`
- **Method**: GET
- **Parameters**:
  - `animeCharacter`: The name of the anime character.
- **Response**:

```
{
  "_id": "quote_id",
  "anime": "Anime Title",
  "character": "Character Name",
  "quote": "Quote text..."
}
```

### 4. Get Five Random Quotes

Retrieve a list of five random anime quotes.

- **URL**: `/quotes/random/5`
- **Method**: GET
- **Response**:

```
[
  {
    "_id": "quote_id_1",
    "anime": "Anime Title",
    "character": "Character Name",
    "quote": "Quote text..."
  },
  {
    "_id": "quote_id_2",
    "anime": "Anime Title",
    "character": "Character Name",
    "quote": "Quote text..."
  },
  // ...
]
```

### 5. Get Five Random Quotes by Anime Title

Retrieve a list of five random anime quotes based on the provided anime title.

- **URL**: `/quotes/random/5/:animeTitle`
- **Method**: GET
- **Parameters**:
  - `animeTitle`: The title of the anime.
- **Response**:

```
[
  {
    "_id": "quote_id_1",
    "anime": "Anime Title",
    "character": "Character Name",
    "quote": "Quote text..."
  },
  {
    "_id": "quote_id_2",
    "anime": "Anime Title",
    "character": "Character Name",
    "quote": "Quote text..."
  },
  // ...
]
```

### 6. Get Five Quotes by Anime Character

Retrieve a list of five anime quotes based on the provided anime character.

- **URL**: `/quotes/character/:animeCharacter`
- **Method**: GET
- **Parameters**:
  - `animeCharacter`: The name of the anime character.
- **Response**:

```
[
  {
    "_id": "quote_id_1",
    "anime": "Anime Title",
    "character": "Character Name",
    "quote": "Quote text..."
  },
  {
    "_id": "quote_id_2",
    "anime": "Anime Title",
    "character": "Character Name",
    "quote": "Quote text..."
  },
  // ...
]
```

### 7. Create a New Quote

Create a new anime quote.

- **URL**: `/quotes`
- **Method**: POST
- **Request Body**:

```
{
  "anime": "Anime Title",
  "character": "Character Name",
  "quote": "Quote text..."
}
```

- **Response** (on successful creation):

```
{
  "_id": "new_quote_id",
  "anime": "Anime Title",
  "character": "Character Name",
  "quote": "Quote text..."
}
```

### 8. Get Quotes with Pagination

Retrieve a paginated list of anime quotes.

- **URL**: `/quotes`
- **Method**: GET
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Number of quotes per page (default: 10)
- **Response**:

```
{
  "docs": [
    {
      "_id": "quote_id_1",
      "anime": "Anime Title",
      "character": "Character Name",
      "quote": "Quote text..."
    },
    {
      "_id": "quote_id_2",
      "anime": "Anime Title",
      "character": "Character Name",
      "quote": "Quote text..."
    },
    // ...
  ],
  "totalPages": 3,
  "currentPage": 1
  // ...
}
```

## Error Responses

- **Status Code**: 404 Not Found
  - **Response**:

```
{
  "message": "Quote not found"
}
```

- **Status Code**: 500 Internal Server Error
  - **Response**:

```
{
  "error": "Error message..."
}
```

**Note**: Replace `localhost:8000` with the appropriate base URL if your server is running on a different host or port. Make sure you have MongoDB properly configured and running.

That concludes the updated documentation for the Anime Quote API. Feel free to use these endpoints to fetch and create quotes from various anime series and characters. If you encounter any issues or have questions, please refer to the provided code or seek further assistance.

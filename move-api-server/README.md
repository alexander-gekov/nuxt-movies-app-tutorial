# Run server

```sh
npm start
```

# Edit `.env` file

```
PORT=4000
```

# Examples

```rest
GET http://localhost:4000 HTTP/1.1
```

Get movie by `id`
```rest
GET http://localhost:4000/movie/1 HTTP/1.1
```

Get movie by `query`
```rest
GET http://localhost:4000/search/movie?query=good HTTP/1.1
```

## Run

`docker-compose up --build`

## Stop

`docker-compose stop`

### Start development environment

`docker-compose rm -f` <br />
`docker-compose -f dev.docker-compose.yml up --build -d` <br />
`docker exec -it YOUR_CONTAINER bash` <br />
`npm i` <br />
`npm run migration:up && npm start` <br />

To stop: `docker-compose stop`npm

Code in your local environment and container will pickup the changes.

Note: make npm installations in the container environment since some dependencies are compiled differently on different OS.

## Migrations

### Create

`npm run migration:create MIGRATION_NAME -- --sql-file`

### Run migrations that haven't been applied yet

`npm run migration:up`

### Revert last migration

`npm run migration:down`

## Testing

Run: `npm test`

## API docs

`[GET]: http://localhost:8000/api/cats`
<br /><br />
`query parameters:
{
    limit?: string
    offset?: string
    order?: ASC | DESC
}`
<br /><br />

`[GET]: http://localhost:8000/api/cats/search/:name`
<br /><br />
`query parameters:
{
    limit?: string
    offset?: string
    order?: ASC | DESC
}`
<br /><br />

`[GET]: http://localhost:8000/api/cats/:id`
<br /><br />

`[DELETE]: http://localhost:8000/api/cats/:id`

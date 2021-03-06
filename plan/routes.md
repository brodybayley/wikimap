# Routes

## CRUD
* Create
* Read
* Update
* Delete


## BREAD

PUT: used to replace an existing resource

PATCH: update part of an exisiting resource

### Users
* Create  => GET    =>  '/register' 
* Read    => GET    =>  '/login' 
* Add     => POST   =>  '/register'

### Maps
* Browse  => GET    =>  '/maps'
* Read    => GET    =>  '/maps/:map_id'
* Edit    => Patch  =>  '/maps/:map_id'
* Add     => POST   =>  '/maps'
* Delete  => DELETE =>  '/maps/:map_id'

### Points
* Browse  => GET    =>  '/maps/:map_id/points'
* Read    => GET    =>  '/maps/:map_id/points/:point_id'
* Edit    => Patch  =>  '/maps/:map_id/points/:point_id'
* Add     => POST   =>  '/maps/:map_id/points'
* Delete  => DELETE =>  '/maps/:map_id/points/:point_id'


## Whiteboarding Session

* Welcome Page
  * List of Maps available
    * Map
  * Log in
    * Profile dashboard
      * Favourite Maps (list)
        ```sql
        -- something like this? Non-functioning code
        SELECT name count(*)
        FROM favourites
        JOIN users ON users_id = users.id
        ````
        * Map 
      * Created Maps
        * Map

* Guest link => Map
  * If want to favourite, then log in

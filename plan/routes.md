# Routes

## CRUD
* Create
* Read
* Update
* Delete

### Users
* Read    => GET    =>  '/register' 
* Create  => POST   =>  '/register'
* Read    => GET    =>  '/login' 
* Create  => POST   =>  '/login' 
* Read    => GET    =>  '/users/:user_id'
* Create  => POST   =>  '/users/:user_id'
* Read    => GET    =>  '/users/:user_id/favourites'
* Create  => POST   =>  '/users/:user_id/favourites'

### Maps
* Browse  => GET    =>  '/maps'
* Read    => GET    =>  '/maps/:map_id'
* Edit    => POST   =>  '/maps/:map_id'
* Add     => POST   =>  '/maps'
* Delete  => DELETE =>  '/maps/:map_id'

### Points
* Browse  => GET    =>  '/maps/:map_id/points'
* Read    => GET    =>  '/maps/:map_id/points/:point_id'
* Edit    => POST   =>  '/maps/:map_id/points/:point_id'
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
        ```
        * Map 
    * Created Maps
      * Map

* Guest link => Map
  * If want to favourite, then log in

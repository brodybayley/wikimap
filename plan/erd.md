## ERD
* user
  * id
  * email
  * password

* map
  * id
  * user_id
  * title
  * description
  * created_on

* points 
  * id
  * map_id
  * user_id
  * point_title
  * point_description
  * image
  * longitude
  * latitude

* favourites
  * id
  * user_id
  * map_id

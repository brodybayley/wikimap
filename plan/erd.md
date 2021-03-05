## ERD
* user
  * id
  * email
  * password
  * contribution_map_id

* map
  * id
  * creator_id (1 to 1)
  * contributor_id (1 to many)

* pins 
  * id
  * map_id
  * title
  * description
  * image
  * google_map_url (nice to have)

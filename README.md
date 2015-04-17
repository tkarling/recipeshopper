# Recipeshopper
===
by Tuija Karling

With Recipeshopper user/ family can create and use a shopping list on which
he/ she can easily add items from his/ her favorites and favorite recipes. 
Each username has his/her respective shopping, favorites & recipes lists and 
settings, which are stored in cloud. With this app user can:

* Login/ logout/ register. 
* List/ filter/ sort items on shopping and favorites lists
* Add/ edit/ remove items on shopping list
     * Adding adds the item on favorites too
     * Removing keeps the item on favorites or recipe it came from
* Mark items bought/ not bought
* Add/ edit/ delete items on favorites
* Add items on favorites to shopping list
* List/ filter/ sort recipes
* Add/ edit/ delete recipes
* List/ Add/ edit/ delete ingredients for recipes
* Add/ remove all items of recipe to shopping list

All updates are synched with all clients logged in with the same user name 
immediately. This is why e.g. family members could:

* have one member add/ remove items from shopping list at home, while another 
member is on the way to/ already in store
* follow each others shopping progress on app (even without talking to each 
other :)) when shopping together

## Tools & Frameworks used:
* AngularJs, UX: Angular Material,  Database: Firebase
* Unit testing: Karma/ Jasmin
* E2E testing: Protractor
* Yeoman, Grunt
* AngularJs concepts used:
     * Modules
     * Controllers: also inherited controller
     * Filters: also custom filter
     * Directives: using e.g.  inherited or isolated scope, 
     template or template-url, transclusion 
     * Services: Factories, factories created with new


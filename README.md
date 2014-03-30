IzzyWebSQL
==========

A little and easy library to develop applications that need connection with web sql. 

1. [Open or create](#open-or-create)
2. [Create database schema](#create-db-schema)
3. [Connection](#connection)
4. [Get All](#get-all)
5. [Get](#get)
6. [Insert](#insert)
7. [Update](#update)
8. [Remove](#remove)

##Open or create

To create or open a database simply just set your version, the name and display name.

```javascript
// DB properties  		
	var version = 1.0,
	    name = 'example',
	    displayName = 'exampleDB';
	    
  var db = new DB(name, version, displayName);
```

##Create DB Schema

It's very easy. Just set the tables and fields for each one and add in database.

```javascript
// DB Schema
var taskTable = new Table('tasks',[
  ['id', 'INTEGER PRIMARY KEY AUTOINCREMENT'],
  ['name', 'TEXT'],
  ['owner', 'VARCHAR(255)']
]);

// Add table
db.addTable(taskTable);
```

##Connection

To make the DB execute the SQL statements you need to start a connection.

```javascript
// Use DB					
db.connect();	
```

##Get All

Returns all elements of the table.

```javascript
db.getAll('tasks', function(sqlResult){

  var tasks = sqlResult.rows;
  
  for(var i = 0; i < tasks.length; i++){
		console.log(tasks.item(i).name);
	}
  
});
```

##Get

Returns a table element by ID.

```javascript
db.get('tasks', 1, function(sqlResult){
  
  var task = sqlResult.rows.item(0);
  console.log(task);
  
});
```

##Insert

Inserts an element in the table.

```javascript
db.insert('tasks', [
  ['name', 'Someone task'],
  ['owner', 'Developer']
]);
```

##Update

Updates a table element by ID.

```javascript
db.update('tasks', 1, [
  ['name', 'Other task'],
  ['owner', 'Developer of Steel']
]);
```

##Remove

Removes a table element by ID.

```javascript
db.remove('tasks', 1);
```
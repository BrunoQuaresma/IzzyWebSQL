/* DB object */
function DB(name, version, displayName){
	
	var size = 2 * 1024 * 1024,
		tables = [],
		instance = null;
	
	/* Construct */
	function construct(){
		instance = openDatabase(name, version, displayName, size);	
	};
	
	/* Connect */
	this.connect = function(){		
		try{
			instance.transaction(function(stmt){
				for(var i = 0; i < tables.length; i++){
					
					var fields = tables[i].getAllFields(),
						sql = "CREATE TABLE " + tables[i].getName() + " (";
						
					for(j = 0; j < fields.length; j++){
						sql += fields[j][0] + " " + fields[j][1] + ", ";
					}
					
					sql = sql.substring(0, sql.length - 2);
					sql += ")";
					
					stmt.executeSql(sql, [], function(){}, function(sqlTransaction, sqlError){
						console.error();
					});
				}
			});
		}catch(error){
			console.error(error.message);
		}	
	}
	
	/* Get All*/
	this.getAll = function(table, callback){
		instance.transaction(function(stmt){
						
			var sql = "SELECT * FROM " + table;			
			
			stmt.executeSql(sql, [], function(sqlTransaction, sqlResultSet){				
				callback(sqlResultSet);				
			}, function(sqlTransaction, sqlError){
				console.error(sqlError.message);				
			});			
		});
	}
	
	/* Get */
	this.get = function(table, id, callback){
		instance.transaction(function(stmt){
						
			var sqlValues = [id],
				sql = "SELECT * FROM " + table + " WHERE id = ?";			
			
			stmt.executeSql(sql, sqlValues, function(sqlTransaction, sqlResultSet){				
				callback(sqlResultSet);				
			}, function(sqlTransaction, sqlError){
				console.error(sqlError.message);				
			});			
		});
	}
	
	/* Remove */	
	this.remove = function(table, id){
		instance.transaction(function(stmt){
			
			var sql = "DELETE FROM " + table + " WHERE id = " + id;			
			
			stmt.executeSql(sql, [], function(sqlTransaction, sqlResultSet){				
				return sqlResultSet;
			}, function(sqlTransaction, sqlError){
				console.error(sqlError.message);
			});
		});
	}
		
	/* Insert */
	this.insert = function(table, values){
		
		instance.transaction(function(stmt){
			
			var sqlValues = [],
				sql = "INSERT INTO " + table + "(";
			
			for(var i = 0; i < values.length; i++){
				sql += values[i][0] + ", ";
			}
			
			sql = sql.substring(0, sql.length - 2);
			sql += ") VALUES(";
			
			for(var i = 0; i < values.length; i++){
				sql += "?, ";
				sqlValues.push(values[i][1]);
			}
			
			sql = sql.substring(0, sql.length - 2);
			sql += ")";
			
			stmt.executeSql(sql, sqlValues, function(sqlTransaction, sqlResultSet){
				return sqlResultSet;
			}, function(sqlTransaction, sqlError){
				console.error();
			});
		});
	}
	
	/* Update */
	this.update = function(table, id, values){
		
		instance.transaction(function(stmt){
			
			var sqlValues = [],
				sql = "UPDATE " + table + " SET ";
			
			for(var i = 0; i < values.length; i++){
				sql += values[i][0] + "=?, ";
				sqlValues.push(values[i][1]);
			}		
			
			sql = sql.substring(0, sql.length - 2);
			sql += " WHERE id=" + id;
						
			stmt.executeSql(sql, sqlValues, function(sqlTransaction, sqlResultSet){
				return sqlResultSet;
			}, function(sqlTransaction, sqlError){
				console.error();
			});
		});
	}
	
	/* Add Table */
	this.addTable = function(table){
		tables.push(table);
	};
	
	this.getAllTables = function(){
		return tables;
	}
	
	this.findTable = function(index){
		return tables[index];
	}
	
	construct();
	
};

/* Table Object */
function Table(name, fields){
	
	this.getName = function(){
		return name;
	}
	
	this.getAllFields = function(){
		return fields;
	}
	
	this.findField = function(index){
		return fields[index];
	}
		
	this.addField = function(field){
		this.fields.push(field);
	}

}

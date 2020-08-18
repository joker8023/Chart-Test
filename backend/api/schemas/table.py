from voluptuous import Schema, Required, In

table_name_schema = Schema({
    Required('table'): In(["table1", "table2"]),
})

table_data_schema = Schema({
    Required('data'): list,
})

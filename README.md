# Adapter Service Layer

## Description

This is the lowest layer of our structure. It is responsible of managing the data and the connection to the database and to external apis.

## Responsibilities

-   Manage the connection to the database
-   Manage the connection to external apis

## API

The data returned by this layer is a JSON object with the following structure:

```json
{
    "data": {
        // The data requested
    }
}
```

In case of error:

```json
{
    "error": {
        "message": "Error message",
        "code": "ErrorCode"
    }
}
```

The data is not modified in this layer, it is just returned as it is.

# Thunder Client Collection for VS Code

This folder contains Thunder Client test requests for the Backend Example API.

## Available Requests:

### 1. Create Message (POST)
- **URL**: `http://localhost:3000/api/messages`
- **Method**: POST
- **Body**: 
```json
{
  "author": "John Doe",
  "text": "This is a test message created via API",
  "isRead": false
}
```

### 2. Get All Messages (GET)
- **URL**: `http://localhost:3000/api/messages`
- **Method**: GET

### 3. Get Message by ID (GET)
- **URL**: `http://localhost:3000/api/messages/msg-001`
- **Method**: GET

### 4. Update Message (PUT)
- **URL**: `http://localhost:3000/api/messages/msg-001`
- **Method**: PUT
- **Body**:
```json
{
  "author": "Jane Doe",
  "text": "This message has been updated!",
  "isRead": true
}
```

### 5. Delete Message (DELETE)
- **URL**: `http://localhost:3000/api/messages/msg-001`
- **Method**: DELETE

### 6. Health Check (GET)
- **URL**: `http://localhost:3000/`
- **Method**: GET

## Expected Response Format:

### Success Response:
```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Error Response:
```json
{
  "success": false,
  "error": "Descriptive error message"
}
```

## How to Use:

1. Install Thunder Client extension in VS Code
2. Start the server: `npm run dev`
3. Import the collection or create requests manually using the URLs above
4. Test each endpoint and verify the response format
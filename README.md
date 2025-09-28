# Backend Example - Express.js & Mongoose

A RESTful API backend built with Express.js and Mongoose for managing messages with full CRUD operations.

## Features

- ✅ Complete CRUD operations for messages
- ✅ Standardized JSON response format
- ✅ MongoDB integration with Mongoose
- ✅ Error handling middleware
- ✅ Environment configuration
- ✅ Postman/Thunder Client collection for testing
- ✅ Controller-based architecture

## Project Structure

```
Backend Example/
├── controllers/
│   └── messageController.js    # Business logic for message operations
├── models/
│   └── Message.js             # Mongoose schema for messages
├── routes/
│   └── messageRoutes.js       # API route definitions
├── tests/
│   ├── Backend_Example_API.postman_collection.json
│   └── README.md              # Testing instructions
├── .env                       # Environment variables
├── package.json              # Dependencies and scripts
└── server.js                 # Main server file
```

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
Make sure MongoDB is running locally, or update the `.env` file with your MongoDB connection string.

### 3. Start the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

All responses follow the standardized format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Descriptive error message"
}
```

### Message Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/messages` | Create a new message |
| GET | `/api/messages` | Get all messages |
| GET | `/api/messages/:id` | Get a specific message by ID |
| PUT | `/api/messages/:id` | Update a message by ID |
| DELETE | `/api/messages/:id` | Delete a message by ID |

### Message Schema

```json
{
  "author": "string (required, max 100 chars)",
  "text": "string (required, max 1000 chars)",
  "timestamp": "Date (auto-generated)",
  "isRead": "boolean (default: false)"
}
```

## Testing

### Option 1: Postman
1. Import the collection: `tests/Backend_Example_API.postman_collection.json`
2. Test each endpoint with the provided sample data

### Option 2: Thunder Client (VS Code)
1. Install Thunder Client extension
2. Follow the instructions in `tests/README.md`

### Option 3: cURL Examples

**Create a message:**
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "author": "John Doe",
    "text": "Hello, this is a test message!",
    "isRead": false
  }'
```

**Get all messages:**
```bash
curl http://localhost:3000/api/messages
```

**Get message by ID:**
```bash
curl http://localhost:3000/api/messages/msg-001
```

**Update a message:**
```bash
curl -X PUT http://localhost:3000/api/messages/msg-001 \
  -H "Content-Type: application/json" \
  -d '{
    "author": "Jane Doe",
    "text": "Updated message text",
    "isRead": true
  }'
```

**Delete a message:**
```bash
curl -X DELETE http://localhost:3000/api/messages/msg-001
```

## Current Status

**Phase 1: ✅ Complete**
- [x] Routes & Endpoints (all 5 CRUD operations)
- [x] Controller placeholders with standardized responses
- [x] Shared response format implementation
- [x] Testing setup (Postman & Thunder Client collections)

**Phase 2: 🔄 Ready for Implementation**
- [ ] Replace placeholder responses with actual database operations
- [ ] Add data validation
- [ ] Implement error handling for edge cases
- [ ] Add authentication (optional)

## Next Steps

The current implementation uses placeholder responses. To connect to the database:

1. Uncomment the database logic in `controllers/messageController.js`
2. Replace placeholder responses with actual Mongoose operations
3. Test with real data

## Environment Variables

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/backend-example
```

For production, replace `MONGODB_URI` with your actual MongoDB connection string.

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **nodemon**: Development auto-restart (dev dependency)